import { useRef, useEffect, useCallback } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

interface Dot {
  x: number;
  y: number;
  r: number;
  opacity: number;
}

const GAP = 7;
const BASE_R = 1.8;
const MIN_LUM = 0.08;
// Teal #4DF0C0
const TR = 77,
  TG = 240,
  TB = 192;
const SOFT_START = 55;
const SOFT_END = 100;
// Dark bg: hsl(240 10% 6%)
const BG = "#0d0d12";

function smoothstep(e0: number, e1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

export default function DotMatrixPortrait({ src, alt, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // All mutable render state lives in a single ref so the rAF closure stays fresh
  const s = useRef({
    dots: [] as Dot[],
    img: null as HTMLImageElement | null,
    off: null as HTMLCanvasElement | null,
    mx: 0,
    my: 0,
    hovering: false,
    raf: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const state = s.current;

    const size = canvas.offsetWidth || 320;
    canvas.width = size;
    canvas.height = size;

    // Offscreen canvas reused every frame for the spotlight-masked photo
    const off = document.createElement("canvas");
    off.width = size;
    off.height = size;
    state.off = off;

    // Load image → sample luminance → build dot array
    const img = new Image();
    img.onload = () => {
      state.img = img;

      const tmp = document.createElement("canvas");
      tmp.width = size;
      tmp.height = size;
      const tc = tmp.getContext("2d")!;
      tc.drawImage(img, 0, 0, size, size);
      const { data } = tc.getImageData(0, 0, size, size);

      const dots: Dot[] = [];
      for (let y = GAP / 2; y < size; y += GAP) {
        for (let x = GAP / 2; x < size; x += GAP) {
          const i = (Math.floor(y) * size + Math.floor(x)) * 4;
          const lum =
            (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255;
          if (lum < MIN_LUM) continue;
          dots.push({
            x,
            y,
            r: BASE_R * (0.55 + lum * 0.45),
            opacity: Math.min(1, lum * 1.4),
          });
        }
      }
      state.dots = dots;
    };
    img.src = src;

    function render() {
      const ctx = canvas!.getContext("2d");
      if (!ctx) return;
      const w = canvas!.width;
      const h = canvas!.height;

      // Dark background
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, w, h);

      if (state.hovering) {
        // Reveal the actual photo under the cursor spotlight
        const rx = state.mx;
        const ry = state.my;

        if (state.img && state.off) {
          const oc = state.off.getContext("2d")!;
          oc.clearRect(0, 0, w, h);
          oc.drawImage(state.img, 0, 0, w, h);

          const grd = oc.createRadialGradient(
            rx,
            ry,
            SOFT_START * 0.4,
            rx,
            ry,
            SOFT_END,
          );
          grd.addColorStop(0, "rgba(0,0,0,1)");
          grd.addColorStop(0.6, "rgba(0,0,0,1)");
          grd.addColorStop(1, "rgba(0,0,0,0)");
          oc.globalCompositeOperation = "destination-in";
          oc.fillStyle = grd;
          oc.fillRect(0, 0, w, h);
          oc.globalCompositeOperation = "source-over";
          ctx.drawImage(state.off, 0, 0);
        }

        // Dots fade out near the spotlight, fully visible outside
        ctx.fillStyle = `rgb(${TR},${TG},${TB})`;
        for (const dot of state.dots) {
          const dx = dot.x - rx;
          const dy = dot.y - ry;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const fade = smoothstep(SOFT_START, SOFT_END, dist);
          const alpha = fade * dot.opacity;
          if (alpha < 0.015) continue;
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      } else {
        // No hover — render every dot at full opacity, photo completely hidden
        ctx.fillStyle = `rgb(${TR},${TG},${TB})`;
        for (const dot of state.dots) {
          ctx.globalAlpha = dot.opacity;
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      state.raf = requestAnimationFrame(render);
    }

    state.raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(state.raf);
  }, [src]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    s.current.mx = (e.clientX - rect.left) * scale;
    s.current.my = (e.clientY - rect.top) * scale;
    s.current.hovering = true;
  }, []);

  const onMouseLeave = useCallback(() => {
    s.current.hovering = false;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scale = canvas.width / rect.width;
    const t = e.touches[0];
    s.current.mx = (t.clientX - rect.left) * scale;
    s.current.my = (t.clientY - rect.top) * scale;
    s.current.hovering = true;
  }, []);

  const onTouchEnd = useCallback(() => {
    s.current.hovering = false;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ display: "block", touchAction: "none" }}
    />
  );
}
