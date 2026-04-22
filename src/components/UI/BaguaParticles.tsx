import React, { useEffect, useRef } from 'react';

const BaguaParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let clouds: Cloud[] = [];
    const cloudCount = 8;
    const symbols = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷', '🥕', '🥚', '🪶'];

    class Cloud {
      x: number;
      y: number;
      baseRadius: number;
      blobs: { ox: number, oy: number, r: number, o: number }[];
      speedX: number;

      constructor() {
        this.baseRadius = Math.random() * 120 + 100;
        this.speedX = Math.random() * 0.08 + 0.02;
        this.blobs = Array.from({ length: 12 }).map(() => ({
          ox: Math.random() * 200 - 100,
          oy: Math.random() * 80 - 40,
          r: Math.random() * 0.9 + 0.6,
          o: Math.random() * 0.05 + 0.02 // 顏色深一點
        }));
        this.x = 0; this.y = 0;
        this.resetPosition();
      }

      resetPosition() {
        const centerX = canvas!.width / 2;
        const centerY = canvas!.height / 2;
        let valid = false;
        while (!valid) {
          this.x = Math.random() * canvas!.width;
          this.y = Math.random() * canvas!.height;
          const dist = Math.hypot(this.x - centerX, this.y - centerY);
          if (dist > 350) valid = true; // 避開中心
        }
      }

      update() {
        this.x += this.speedX;
        if (this.x - 400 > canvas!.width) {
          this.x = -400;
          this.resetPosition();
        }
        const centerX = canvas!.width / 2;
        const centerY = canvas!.height / 2;
        const dist = Math.hypot(this.x - centerX, this.y - centerY);
        if (dist < 300) this.y += (this.y > centerY ? 1 : -1);
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        this.blobs.forEach(b => {
          const r = this.baseRadius * b.r;
          const gx = this.x + b.ox;
          const gy = this.y + b.oy;
          const gradient = ctx.createRadialGradient(gx, gy, 0, gx, gy, r);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${b.o})`);
          gradient.addColorStop(0.6, `rgba(200, 200, 200, ${b.o * 0.5})`);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(gx, gy, r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      symbol: string;
      opacity: number;
      rotation: number;
      rotationSpeed: number;

      constructor(symbol: string) {
        this.symbol = symbol;
        this.size = Math.random() * 20 + 30;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.2 + 0.1;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01;
        this.x = 0; this.y = 0;
        this.resetPosition();
      }

      resetPosition() {
        const centerX = canvas!.width / 2;
        const centerY = canvas!.height / 2;
        let valid = false;
        while (!valid) {
          this.x = Math.random() * canvas!.width;
          this.y = Math.random() * canvas!.height;
          const dist = Math.hypot(this.x - centerX, this.y - centerY);
          if (dist > 250) valid = true;
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        if (this.x > canvas!.width) this.x = 0;
        if (this.x < 0) this.x = canvas!.width;
        if (this.y > canvas!.height) this.y = 0;
        if (this.y < 0) this.y = canvas!.height;

        const centerX = canvas!.width / 2;
        const centerY = canvas!.height / 2;
        const dist = Math.hypot(this.x - centerX, this.y - centerY);
        if (dist < 220) {
          this.x += (this.x > centerX ? 2 : -2);
          this.y += (this.y > centerY ? 2 : -2);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#d4af37';
        ctx.font = `${this.size}px serif`;
        ctx.fillText(this.symbol, 0, 0);
        ctx.restore();
      }
    }

    const init = () => {
      particles = [];
      clouds = [];
      symbols.forEach(s => particles.push(new Particle(s)));
      for (let i = 0; i < cloudCount; i++) clouds.push(new Cloud());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const half = Math.floor(particles.length / 2);
      particles.slice(0, half).forEach(p => { p.update(); p.draw(); });
      clouds.forEach(c => { c.update(); c.draw(); });
      particles.slice(half).forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -2,
          opacity: 0.6
        }}
      />
      {/* 背景中央太極基座 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -3,
        pointerEvents: 'none'
      }}>
        <div style={{
          width: 'min(80vw, 80vh)',
          height: 'min(80vw, 80vh)',
          opacity: 0.03,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '2px solid var(--primary-gold)',
          animation: 'taijiRotate 60s linear infinite',
          position: 'relative'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, #fff 50%, #000 50%)',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: '25%', width: '50%', height: '50%',
              background: '#fff', borderRadius: '50%',
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <div style={{ width: '20%', height: '20%', background: '#000', borderRadius: '50%' }}></div>
            </div>
            <div style={{
              position: 'absolute', bottom: 0, left: '25%', width: '50%', height: '50%',
              background: '#000', borderRadius: '50%',
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
              <div style={{ width: '20%', height: '20%', background: '#fff', borderRadius: '50%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaguaParticles;
