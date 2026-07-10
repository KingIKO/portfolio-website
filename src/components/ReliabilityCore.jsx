import { useEffect, useRef } from 'react';

const COLORS = ['#72f6d1', '#69a7ff', '#d7ff5f', '#ffffff'];

function seeded(index) {
  const value = Math.sin(index * 999.17) * 43758.5453;
  return value - Math.floor(value);
}

export default function ReliabilityCore({ active }) {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext?.('2d');
    if (!canvas || !context) return undefined;

    let frame = 0;
    let animationFrame;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const particles = Array.from({ length: 92 }, (_, index) => ({
      orbit: 0.17 + seeded(index + 1) * 0.38,
      angle: seeded(index + 9) * Math.PI * 2,
      speed: 0.00008 + seeded(index + 17) * 0.00018,
      size: 0.7 + seeded(index + 31) * 2.3,
      lift: (seeded(index + 43) - 0.5) * 0.32,
      color: COLORS[index % COLORS.length],
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const cx = width * (0.5 + pointerRef.current.x * 0.035);
      const cy = height * (0.49 + pointerRef.current.y * 0.035);
      const radius = Math.min(width, height);

      const aura = context.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.48);
      aura.addColorStop(0, 'rgba(114, 246, 209, 0.19)');
      aura.addColorStop(0.25, 'rgba(105, 167, 255, 0.08)');
      aura.addColorStop(1, 'rgba(2, 6, 15, 0)');
      context.fillStyle = aura;
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(cx, cy);
      context.rotate(-0.16);
      for (let ring = 0; ring < 5; ring += 1) {
        context.beginPath();
        context.ellipse(0, 0, radius * (0.12 + ring * 0.06), radius * (0.04 + ring * 0.025), 0, 0, Math.PI * 2);
        context.strokeStyle = ring === 2 ? 'rgba(114, 246, 209, 0.38)' : 'rgba(162, 191, 222, 0.15)';
        context.lineWidth = ring === 2 ? 1.3 : 0.7;
        context.setLineDash(ring % 2 ? [5, 9] : []);
        context.stroke();
      }
      context.restore();
      context.setLineDash([]);

      const positions = particles.map((particle, index) => {
        const drift = active ? time * particle.speed : frame * 0.00001;
        const angle = particle.angle + drift;
        const orbitRadius = radius * particle.orbit;
        const x = cx + Math.cos(angle) * orbitRadius;
        const y = cy + Math.sin(angle) * orbitRadius * 0.34 + particle.lift * radius;
        return { ...particle, x, y, index };
      });

      positions.forEach((particle) => {
        const nearest = positions[(particle.index + 11) % positions.length];
        const distance = Math.hypot(nearest.x - particle.x, nearest.y - particle.y);
        if (distance < radius * 0.29) {
          context.beginPath();
          context.moveTo(particle.x, particle.y);
          context.lineTo(nearest.x, nearest.y);
          context.strokeStyle = 'rgba(105, 167, 255, 0.08)';
          context.lineWidth = 0.6;
          context.stroke();
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.globalAlpha = 0.4 + (particle.index % 5) * 0.1;
        context.fill();
      });
      context.globalAlpha = 1;

      const pulse = active ? 1 + Math.sin(time * 0.0024) * 0.055 : 1;
      const coreRadius = radius * 0.075 * pulse;
      const core = context.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
      core.addColorStop(0, 'rgba(255,255,255,0.98)');
      core.addColorStop(0.13, 'rgba(215,255,95,0.92)');
      core.addColorStop(0.4, 'rgba(114,246,209,0.34)');
      core.addColorStop(1, 'rgba(114,246,209,0)');
      context.fillStyle = core;
      context.beginPath();
      context.arc(cx, cy, coreRadius, 0, Math.PI * 2);
      context.fill();

      frame += 1;
      if (active) animationFrame = window.requestAnimationFrame(draw);
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointerRef.current.y = (event.clientY - rect.top) / rect.height - 0.5;
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    canvas.addEventListener('pointermove', onPointerMove);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onPointerMove);
    };
  }, [active]);

  return (
    <div className="reliability-core" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="core-reticle core-reticle--outer" />
      <div className="core-reticle core-reticle--inner" />
      <span className="core-node core-node--evidence">Evidence</span>
      <span className="core-node core-node--guardrails">Guardrails</span>
      <span className="core-node core-node--memory">Memory</span>
      <span className="core-node core-node--verification">Verification</span>
      <div className="core-status"><span /> Reliability core online</div>
    </div>
  );
}
