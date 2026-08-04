'use client';

import { useTheme } from '@repo/ui/components/theme-provider';
import { useEffect, useRef } from 'react';

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** phase offset so radii pulse independently */
  phase: number;
  baseR: number;
};

type MetaballCanvasProps = {
  /**
   * Fill color of the blobs. If omitted, the component auto-derives it from the
   * active theme (dark blobs in light mode, light blobs in dark mode).
   */
  color?: string;
  /**
   * Solid backdrop painted behind the blobs. The metaball contrast trick needs
   * an opaque background so the blurred alpha snaps into crisp edges. If omitted,
   * it is auto-derived from the active theme.
   */
  background?: string;
  /** How many blobs to float around. */
  count?: number;
  /** Movement speed multiplier. */
  speed?: number;
  /** Max distance (px) at which two blobs form a gooey link. */
  linkDistance?: number;
  className?: string;
};

/**
 * A smooth, gooey "metaball" animation rendered on <canvas>.
 *
 * Technique: blobs (and capsule links between nearby blobs) are drawn as solid
 * shapes, then a CSS `blur() + contrast()` filter is applied to the canvas.
 * The blur spreads the edges and the high contrast snaps them back to a hard
 * threshold — where two blurred edges overlap they merge into one organic
 * surface, giving the liquid "molecule" look from the reference image.
 */
export function MetaballCanvas({
  color,
  background,
  count = 9,
  speed = 1,
  linkDistance = 240,
  className,
}: MetaballCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  // Live colors, recomputed whenever the theme changes.
  const colorsRef = useRef({ blob: '#0a0a0a', bg: '#ffffff' });
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resolveColors = () => {
      colorsRef.current = {
        blob: color ?? (isDark ? '#fafafa' : '#0a0a0a'),
        bg: background ?? (isDark ? '#0a0a0a' : '#ffffff'),
      };
    };
    resolveColors();

    // React to theme changes: both the `.dark`/`.light` class and the OS setting.
    const themeObserver = new MutationObserver(resolveColors);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    const colorSchemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeMq.addEventListener('change', resolveColors);

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    const onMq = () => (reducedMotionRef.current = mq.matches);
    mq.addEventListener('change', onMq);

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const seed = () => {
      const nodes: Node[] = [];
      const min = Math.min(width, height);
      for (let i = 0; i < count; i++) {
        const baseR = min * (0.06 + Math.random() * 0.07);
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: baseR,
          baseR,
          phase: Math.random() * Math.PI * 2,
        });
      }
      nodesRef.current = nodes;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (nodesRef.current.length === 0) seed();
    };

    // Draw a capsule (thick rounded line) between two points.
    const capsule = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      w1: number,
      w2: number,
    ) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const angle = Math.atan2(dy, dx);
      const perp = angle + Math.PI / 2;
      const cos = Math.cos(perp);
      const sin = Math.sin(perp);
      ctx.beginPath();
      ctx.moveTo(x1 + cos * w1, y1 + sin * w1);
      ctx.lineTo(x2 + cos * w2, y2 + sin * w2);
      ctx.lineTo(x2 - cos * w2, y2 - sin * w2);
      ctx.lineTo(x1 - cos * w1, y1 - sin * w1);
      ctx.closePath();
      ctx.fill();
    };

    let t = 0;
    const render = () => {
      const nodes = nodesRef.current;
      const dt = reducedMotionRef.current ? 0 : speed;
      t += 0.008 * (reducedMotionRef.current ? 0.15 : speed);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = colorsRef.current.bg;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = colorsRef.current.blob;

      // Update motion + pulse.
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        n.r = n.baseR * (0.9 + Math.sin(t * 1.6 + n.phase) * 0.12);

        const pad = n.baseR;
        if (n.x < -pad) n.x = width + pad;
        if (n.x > width + pad) n.x = -pad;
        if (n.y < -pad) n.y = height + pad;
        if (n.y > height + pad) n.y = -pad;
      }

      // Gooey links between nearby blobs.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          const max = linkDistance + a.r + b.r;
          if (dist < max) {
            const k = 1 - dist / max;
            capsule(a.x, a.y, b.x, b.y, a.r * 0.55 * k, b.r * 0.55 * k);
          }
        }
      }

      // Blobs on top.
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      mq.removeEventListener('change', onMq);
      themeObserver.disconnect();
      colorSchemeMq.removeEventListener('change', resolveColors);
    };
  }, [color, background, count, speed, linkDistance, isDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        // The magic that fuses overlapping shapes into liquid metaballs.
        filter: 'blur(14px) contrast(24)',
      }}
    />
  );
}
