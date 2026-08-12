import { useEffect, useRef } from "react";

type Camera = {
  x: number;
  y: number;
  r: number;
  /** ms into the sequence when this camera comes online */
  onlineAt: number;
  phase: number;
  /** heading of the viewing cone, in radians */
  angle: number;
};

const CONE_LENGTH = 26;
const CONE_HALF_ANGLE = 0.3;

/** Sky blue (oklch 75% .1 236) as rgb, so canvas parses it everywhere. */
const SKY = "134, 191, 232";

const CAMERA_COUNT = 46;
const LINK_DISTANCE = 168;
const BOOT_MS = 620;
/** Spread over which cameras come online, one by one. */
const BOOT_WINDOW_MS = 4200;

/**
 * The signature motif: a sparse field of cameras that blink online one by one
 * and stitch themselves into a mesh — Hyderabad's five lakh CCTV network
 * coming up. Sits behind the hero content, purely decorative.
 */
export function CctvMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const context = canvasEl.getContext("2d");
    if (!context) return;

    // Declared non-nullable so the nested draw functions don't re-narrow.
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = context;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let cameras: Camera[] = [];
    let frame = 0;
    let startedAt = performance.now();
    let onScreen = true;

    function build() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Jittered grid, so cameras spread out instead of clumping.
      const cols = Math.max(4, Math.round(Math.sqrt((CAMERA_COUNT * width) / height)));
      const rows = Math.ceil(CAMERA_COUNT / cols);
      const cellW = width / cols;
      const cellH = height / rows;

      // A resize repositions the cameras but must not replay the boot sequence,
      // so keep startedAt and bring them straight online once it has finished.
      const settled = performance.now() - startedAt > BOOT_WINDOW_MS + BOOT_MS;

      cameras = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (cameras.length >= CAMERA_COUNT) break;
          cameras.push({
            x: (col + 0.15 + Math.random() * 0.7) * cellW,
            y: (row + 0.15 + Math.random() * 0.7) * cellH,
            r: 1.5 + Math.random() * 1.7,
            onlineAt: reduced || settled ? 0 : 300 + Math.random() * BOOT_WINDOW_MS,
            phase: Math.random() * Math.PI * 2,
            angle: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function draw(now: number) {
      const elapsed = now - startedAt;
      ctx.clearRect(0, 0, width, height);

      // How far each camera is through its boot-up, 0 → 1.
      const boot = cameras.map((cam) =>
        easeOut(Math.min(1, Math.max(0, (elapsed - cam.onlineAt) / BOOT_MS))),
      );

      // Links first, so nodes sit on top.
      ctx.lineWidth = 1;
      for (let i = 0; i < cameras.length; i++) {
        if (boot[i] === 0) continue;
        for (let j = i + 1; j < cameras.length; j++) {
          if (boot[j] === 0) continue;
          const dx = cameras[i].x - cameras[j].x;
          const dy = cameras[i].y - cameras[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DISTANCE) continue;

          const strength = (1 - dist / LINK_DISTANCE) * boot[i] * boot[j];
          ctx.strokeStyle = `rgba(${SKY}, ${strength * 0.22})`;
          ctx.beginPath();
          ctx.moveTo(cameras[i].x, cameras[i].y);
          ctx.lineTo(cameras[j].x, cameras[j].y);
          ctx.stroke();
        }
      }

      for (let i = 0; i < cameras.length; i++) {
        const cam = cameras[i];
        const b = boot[i];
        if (b === 0) continue;

        // Slow breathing once online.
        const breathe = reduced ? 1 : 0.75 + 0.25 * Math.sin(now / 900 + cam.phase);

        // Viewing cone, panning slowly like a PTZ unit. This is what makes the
        // field read as cameras rather than a generic particle network.
        const heading = reduced ? cam.angle : cam.angle + Math.sin(now / 4200 + cam.phase) * 0.55;
        ctx.fillStyle = `rgba(${SKY}, ${b * 0.1})`;
        ctx.beginPath();
        ctx.moveTo(cam.x, cam.y);
        ctx.arc(
          cam.x,
          cam.y,
          CONE_LENGTH,
          heading - CONE_HALF_ANGLE,
          heading + CONE_HALF_ANGLE,
        );
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = `rgba(${SKY}, ${b * 0.75 * breathe})`;
        ctx.beginPath();
        ctx.arc(cam.x, cam.y, cam.r, 0, Math.PI * 2);
        ctx.fill();

        // A ring that expands once, as the camera comes online.
        if (b > 0 && b < 1) {
          ctx.strokeStyle = `rgba(${SKY}, ${(1 - b) * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(cam.x, cam.y, cam.r + b * 16, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }

    function loop(now: number) {
      draw(now);
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (frame || reduced) return;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    }

    build();
    if (reduced) {
      // Settle straight to the finished mesh, no animation.
      draw(startedAt + 10000);
    } else {
      start();
    }

    const resizeObserver = new ResizeObserver(() => {
      build();
      if (reduced) draw(startedAt + 10000);
    });
    resizeObserver.observe(canvas);

    // Don't burn frames when the hero is scrolled away or the tab is hidden.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    const onVisibility = () => {
      if (document.hidden || !onScreen) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
