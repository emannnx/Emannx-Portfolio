import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const blurOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const blurOverlay = blurOverlayRef.current!;

    const W = window.innerWidth;
    const H = window.innerHeight;

    // ── Renderer ────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ──────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 8);

    // ── Mouse tracking ──────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Lights ──────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const point1 = new THREE.PointLight(0xffffff, 2.5, 20);
    point1.position.set(4, 4, 4);
    scene.add(point1);

    const point2 = new THREE.PointLight(0x8888ff, 1.5, 20);
    point2.position.set(-4, -2, 3);
    scene.add(point2);

    const rimLight = new THREE.PointLight(0xffd700, 1.0, 15);
    rimLight.position.set(0, -5, 2);
    scene.add(rimLight);

    // ── Materials ───────────────────────────────────────────────────────
    const matSolid = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 1.0,
      roughness: 0.05,
      transparent: true,
      opacity: 0.22,
    });

    const matWire = new THREE.MeshBasicMaterial({
      color: 0x1a1a2e,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });

    const matRing = new THREE.MeshStandardMaterial({
      color: 0x121216,
      metalness: 0.95,
      roughness: 0.05,
      emissive: 0x0a0a14,
      emissiveIntensity: 0.2,
    });

    const matOrb = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1.0,
      roughness: 0.0,
      emissive: 0xffffff,
      emissiveIntensity: 0.05,
    });

    // ── Central icosahedron ─────────────────────────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icoSolid = new THREE.Mesh(icoGeo, matSolid);
    const icoWire = new THREE.Mesh(icoGeo, matWire);
    const icoGroup = new THREE.Group();
    icoGroup.add(icoSolid, icoWire);
    scene.add(icoGroup);

    // ── Outer torus rings ────────────────────────────────────────────────
    const torus1 = new THREE.Mesh(
      new THREE.TorusGeometry(2.6, 0.05, 20, 100),
      matRing,
    );
    torus1.rotation.x = Math.PI / 2.5;
    scene.add(torus1);

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(2.0, 0.03, 16, 80),
      new THREE.MeshStandardMaterial({
        color: 0x222230,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.7,
      }),
    );
    torus2.rotation.x = Math.PI / 5;
    torus2.rotation.y = Math.PI / 4;
    scene.add(torus2);

    // ── Orbiting spheres ────────────────────────────────────────────────
    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const orbCount = 5;
    const orbits: {
      mesh: THREE.Mesh;
      speed: number;
      offset: number;
      radius: number;
    }[] = [];

    for (let i = 0; i < orbCount; i++) {
      const size = 0.07 + (i % 3) * 0.035;
      const radius = 2.3 + (i % 2) * 0.4;
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(size, 16, 16),
        matOrb,
      );
      orbitGroup.add(mesh);
      orbits.push({
        mesh,
        speed: 0.3 + i * 0.12,
        offset: (i / orbCount) * Math.PI * 2,
        radius,
      });
    }

    // ── Small floating tetrahedra ───────────────────────────────────────
    const floaters: { mesh: THREE.Mesh; vx: number; vy: number; vz: number }[] =
      [];
    const tetraGeo = new THREE.TetrahedronGeometry(0.12, 0);
    const tetraMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < 8; i++) {
      const mesh = new THREE.Mesh(tetraGeo, tetraMat);
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4 - 1,
      );
      scene.add(mesh);
      floaters.push({
        mesh,
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        vz: (Math.random() - 0.5) * 0.002,
      });
    }

    // ── Smart blur overlay ───────────────────────────────────────────────
    // Finds all meaningful content elements and draws blur patches behind them
    const SELECTORS = [
      "h1",
      "h2",
      "h3",
      "h4",
      "p",
      "a",
      "button",
      "img",
      "section",
      "[data-blur]",
      ".card",
      ".project",
      ".about",
    ].join(",");

    const PADDING = 24; // px padding around each element
    const BLUR_PX = 6;
    const BG_OPACITY = 0.45;

    let blurPatches: HTMLDivElement[] = [];

    const clearPatches = () => {
      blurPatches.forEach((p) => p.remove());
      blurPatches = [];
    };

    const buildBlurPatches = () => {
      clearPatches();
      const elements = document.querySelectorAll<HTMLElement>(SELECTORS);
      const seen: DOMRect[] = [];

      elements.forEach((el) => {
        // Skip the overlay/canvas themselves
        if (mount.contains(el) || blurOverlay.contains(el)) return;

        const rect = el.getBoundingClientRect();

        // Skip tiny or invisible elements
        if (rect.width < 20 || rect.height < 10) return;
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        // Merge overlapping rects to avoid stacked blur patches
        const merged = seen.find(
          (r) =>
            rect.left < r.right + PADDING &&
            rect.right > r.left - PADDING &&
            rect.top < r.bottom + PADDING &&
            rect.bottom > r.top - PADDING,
        );
        if (merged) {
          merged.x = Math.min(merged.x, rect.left);
          merged.y = Math.min(merged.y, rect.top);
          (merged as any).right = Math.max(
            (merged as any).right ?? merged.x + merged.width,
            rect.right,
          );
          (merged as any).bottom = Math.max(
            (merged as any).bottom ?? merged.y + merged.height,
            rect.bottom,
          );
          merged.width = (merged as any).right - merged.x;
          merged.height = (merged as any).bottom - merged.y;
          return;
        }

        seen.push(DOMRect.fromRect(rect));
      });

      seen.forEach((rect) => {
        const patch = document.createElement("div");
        patch.style.cssText = `
          position: fixed;
          left: ${rect.left - PADDING}px;
          top: ${rect.top - PADDING}px;
          width: ${rect.width + PADDING * 2}px;
          height: ${rect.height + PADDING * 2}px;
          backdrop-filter: blur(${BLUR_PX}px);
          -webkit-backdrop-filter: blur(${BLUR_PX}px);
          background: rgba(255,255,255,${BG_OPACITY});
          border-radius: 12px;
          pointer-events: none;
          transition: opacity 0.3s ease;
        `;
        blurOverlay.appendChild(patch);
        blurPatches.push(patch);
      });
    };

    // Rebuild on scroll (positions shift) and resize
    const onScroll = () => buildBlurPatches();
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      buildBlurPatches();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Initial build after a short delay so all sections have rendered
    const initTimer = setTimeout(buildBlurPatches, 200);

    // ── Animation loop ──────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      target.x += (mouse.x - target.x) * 0.04;
      target.y += (mouse.y - target.y) * 0.04;

      icoGroup.rotation.y = t * 0.18 + target.x * 0.3;
      icoGroup.rotation.x = t * 0.11 + target.y * 0.2;

      torus1.rotation.z = t * 0.12;
      torus1.rotation.y = target.x * 0.15;
      torus2.rotation.z = -t * 0.09;
      torus2.rotation.x = Math.PI / 5 + target.y * 0.1;

      orbitGroup.rotation.y = t * 0.22 + target.x * 0.25;
      orbitGroup.rotation.x = target.y * 0.2;

      orbits.forEach(({ mesh, speed, offset, radius }) => {
        const angle = t * speed + offset;
        mesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 0.6) * 0.8,
          Math.sin(angle) * radius,
        );
      });

      floaters.forEach(({ mesh, vx, vy, vz }) => {
        mesh.position.x += vx;
        mesh.position.y += vy;
        mesh.position.z += vz;
        mesh.rotation.x += 0.008;
        mesh.rotation.y += 0.006;

        if (Math.abs(mesh.position.x) > 5) mesh.position.x *= -0.9;
        if (Math.abs(mesh.position.y) > 4) mesh.position.y *= -0.9;
      });

      camera.position.y = Math.sin(t * 0.2) * 0.08 + target.y * 0.15;
      camera.position.x = Math.cos(t * 0.15) * 0.05 + target.x * 0.2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(initTimer);
      clearPatches();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      {/* Three.js canvas layer */}
      <div
        ref={mountRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Blur patch overlay — sits just above canvas, below page content */}
      <div
        ref={blurOverlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </>
  );
}
