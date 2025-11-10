// Minimal fog/particle overlay for the homepage hero
(function () {
  const TAU = Math.PI * 2;
  function rand(a, b) { return a + Math.random() * (b - a); }

  function Fog(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.running = true;
    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);
    window.addEventListener('resize', this.resize);
    document.addEventListener('visibilitychange', () => {
      this.running = document.visibilityState !== 'hidden';
    });
    this.resize();
    const isMobile = window.matchMedia('(max-width: 780px)').matches;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = prefersReduce ? 0 : (isMobile ? 16 : 36);
    for (let i=0;i<count;i++) {
      this.particles.push({
        x: rand(0, this.w), y: rand(0, this.h), r: rand(30, 120),
        vx: rand(-0.06, 0.06), vy: rand(-0.03, 0.03),
        a: rand(0.03, 0.07)
      });
    }
    requestAnimationFrame(this.tick);
  }
  Fog.prototype.resize = function () {
    const isMobile = window.matchMedia('(max-width: 780px)').matches;
    const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dprRaw = window.devicePixelRatio || 1;
    const dpr = prefersReduce ? 1 : Math.min(2, isMobile ? Math.min(1.25, dprRaw) : dprRaw);
    this.w = this.canvas.clientWidth; this.h = this.canvas.clientHeight;
    this.canvas.width = this.w * dpr; this.canvas.height = this.h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  Fog.prototype.tick = function () {
    if (!this.running) { requestAnimationFrame(this.tick); return; }
    const c = this.ctx; c.clearRect(0, 0, this.w, this.h);
    for (const p of this.particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -p.r) p.x = this.w + p.r;
      if (p.x > this.w + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = this.h + p.r;
      if (p.y > this.h + p.r) p.y = -p.r;
      const grd = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grd.addColorStop(0, `rgba(180,108,255,${p.a})`);
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      c.fillStyle = grd; c.beginPath(); c.arc(p.x, p.y, p.r, 0, TAU); c.fill();
    }
    requestAnimationFrame(this.tick);
  };

  window.addEventListener('DOMContentLoaded', function () {
    const el = document.getElementById('fog-canvas');
    if (el) new Fog(el);
  });
})();
