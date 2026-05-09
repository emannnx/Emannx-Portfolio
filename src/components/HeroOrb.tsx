import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroOrb() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on mobile and reduced-motion
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mount = mountRef.current!;
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 100);
    camera.position.set(0, 0, 6);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.PointLight(0xffffff, 3, 20);
    key.position.set(4, 4, 4);
    scene.add(key);
    const fill = new THREE.PointLight(0x8888ff, 1, 15);
    fill.position.set(-3, -2, 2);
    scene.add(fill);

    // Icosahedron — dual solid+wireframe for depth
    const geo = new THREE.IcosahedronGeometry(1.5, 1);
    const matSolid = new THREE.MeshStandardMaterial({
      color: 0x0a0a12,
      metalness: 0.92,
      roughness: 0.04,
      transparent: true,
      opacity: 0.15,
    });
    const matWire = new THREE.MeshBasicMaterial({
      color: 0x1a1a2e,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });

    const group = new THREE.Group();
    group.add(new THREE.Mesh(geo, matSolid));
    group.add(new THREE.Mesh(geo, matWire));
    // Position it in the upper-right of the hero, behind the avatar
    group.position.set(2.2, 0.2, -0.5);
    scene.add(group);

    // Decorative torus ring
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.2, 0.035, 16, 100),
      new THREE.MeshStandardMaterial({
        color: 0x121216,
        metalness: 0.95,
        roughness: 0.04,
        transparent: true,
        opacity: 0.42,
      }),
    );
    ring.rotation.x = Math.PI / 2.6;
    ring.position.set(2.2, 0.2, -0.5);
    scene.add(ring);

    // Small orbiting dots
    const dotGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const dotMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1,
      roughness: 0,
    });
    const dots: { mesh: THREE.Mesh; speed: number; offset: number; r: number }[] =
      [];
    for (let i = 0; i < 4; i++) {
      const m = new THREE.Mesh(dotGeo, dotMat);
      scene.add(m);
      dots.push({
        mesh: m,
        speed: 0.35 + i * 0.1,
        offset: (i / 4) * Math.PI * 2,
        r: 2.0 + (i % 2) * 0.35,
      });
    }

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      target.x += (mouse.x - target.x) * 0.035;
      target.y += (mouse.y - target.y) * 0.035;

      group.rotation.y = t * 0.16 + target.x * 0.25;
      group.rotation.x = t * 0.09 + target.y * 0.18;

      ring.rotation.z = t * 0.1;
      ring.rotation.y = target.x * 0.1;

      dots.forEach(({ mesh, speed, offset, r }) => {
        const angle = t * speed + offset;
        mesh.position.set(
          2.2 + Math.cos(angle) * r,
          0.2 + Math.sin(angle * 0.7) * 0.6,
          -0.5 + Math.sin(angle) * r * 0.3,
        );
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      geo.dispose();
      matSolid.dispose();
      matWire.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
