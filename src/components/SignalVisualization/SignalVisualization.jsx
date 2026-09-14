import { useEffect, useRef } from 'react';
import styles from './SignalVisualization.module.css';

/**
 * SignalVisualization — animated ECG canvas.
 *
 * Variants:
 *   'hero'    — multi-line + grid (landing page background)
 *   'loading' — single bright centered line (analysis loading state)
 *   'result'  — full-screen scrolling ECG, color driven by `color` prop
 *
 * @param {'hero'|'loading'|'result'} variant
 * @param {string} [color]  — explicit hex color for the 'result' variant
 */
export default function SignalVisualization({ variant = 'hero', color }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let time    = 0;
    let mounted = true;

    // Resolve which color to use
    function resolveColor() {
      if (color) return color;
      return (
        getComputedStyle(document.documentElement)
          .getPropertyValue('--accent').trim() || '#0eb8c3'
      );
    }

    // Parse a hex color to [r,g,b]
    function hexToRgb(hex) {
      const h = hex.replace('#', '');
      return [
        parseInt(h.slice(0, 2), 16) || 14,
        parseInt(h.slice(2, 4), 16) || 184,
        parseInt(h.slice(4, 6), 16) || 195,
      ];
    }

    function resize() {
      const dpr  = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width        = rect.width  * dpr;
      canvas.height       = rect.height * dpr;
      canvas.style.width  = rect.width  + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
    }

    /**
     * Draw one continuous scrolling ECG trace.
     * @param {number} yCenter   – vertical midpoint of this trace
     * @param {number} amplitude – vertical scale of QRS spike
     * @param {number} offset    – time offset for phase-shifting
     * @param {number} alpha     – stroke opacity
     * @param {number[]} rgb     – [r,g,b]
     * @param {number} speed     – pixels per frame
     * @param {number} lineWidth
     */
    function drawECGLine(yCenter, amplitude, offset, alpha, rgb, speed = 0.8, lineWidth = 1.5) {
      const w      = canvas.width  / (window.devicePixelRatio || 1);
      const segLen = 140;
      const segs   = Math.ceil(w / segLen) + 2;

      ctx.beginPath();
      ctx.lineWidth   = lineWidth;
      ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'round';

      const scrollX = (time * speed) % segLen;

      for (let s = 0; s < segs; s++) {
        const sx = s * segLen - scrollX + offset;
        const cy = yCenter;
        const A  = amplitude;

        ctx.moveTo(sx, cy);
        ctx.lineTo(sx + 22, cy);
        // P wave
        ctx.quadraticCurveTo(sx + 27, cy - A * 0.14, sx + 33, cy);
        // PR segment
        ctx.lineTo(sx + 40, cy);
        // Q dip
        ctx.lineTo(sx + 44, cy + A * 0.10);
        // R spike (the tall one)
        ctx.lineTo(sx + 50, cy - A);
        // S dip
        ctx.lineTo(sx + 56, cy + A * 0.18);
        // ST segment
        ctx.lineTo(sx + 66, cy);
        // T wave
        ctx.quadraticCurveTo(sx + 80, cy - A * 0.28, sx + 94, cy);
        // Rest
        ctx.lineTo(sx + segLen, cy);
      }
      ctx.stroke();
    }

    function drawGrid(rgb, w, h) {
      ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.04)`;
      ctx.lineWidth   = 0.5;
      const gx = 30, gy = 20;
      for (let x = 0; x < w; x += gx) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += gy) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
    }

    function tick() {
      if (!mounted) return;
      const w   = canvas.width  / (window.devicePixelRatio || 1);
      const h   = canvas.height / (window.devicePixelRatio || 1);
      const hex = resolveColor();
      const rgb = hexToRgb(hex);

      ctx.clearRect(0, 0, w, h);

      if (variant === 'hero') {
        drawGrid(rgb, w, h);
        drawECGLine(h * 0.18, h * 0.14, 0,    0.55, rgb, 0.8, 1.5);
        drawECGLine(h * 0.50, h * 0.14, 46,   0.25, rgb, 0.8, 1.5);
        drawECGLine(h * 0.82, h * 0.14, 92,   0.15, rgb, 0.8, 1.5);

      } else if (variant === 'result') {
        // Full-screen multi-row ECG — 5 rows, staggered, very subtle
        drawGrid(rgb, w, h);
        const rows = 5;
        for (let i = 0; i < rows; i++) {
          const cy     = (h / (rows + 1)) * (i + 1);
          const amp    = h * 0.075;
          const phase  = i * (140 / rows) * 1.7;
          const alpha  = i === 2 ? 0.38 : i === 1 || i === 3 ? 0.22 : 0.12;
          const lw     = i === 2 ? 1.8 : 1.2;
          const speed  = 0.7 + i * 0.05;
          drawECGLine(cy, amp, phase, alpha, rgb, speed, lw);
        }

      } else {
        // Loading — single bright centered line
        drawECGLine(h / 2, h * 0.38, 0, 0.75, rgb, 1.2, 2);
      }

      time += 1;
      animRef.current = requestAnimationFrame(tick);
    }

    const observer = new ResizeObserver(() => resize());
    observer.observe(canvas.parentElement);
    resize();
    tick();

    return () => {
      mounted = false;
      observer.disconnect();
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [variant, color]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}