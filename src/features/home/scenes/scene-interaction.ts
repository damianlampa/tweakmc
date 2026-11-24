export function attachDrag(
  el: HTMLCanvasElement,
  state: { dragging: boolean; rx: number; ry: number; vy: number },
) {
  let down = false;
  let lastX = 0;
  let lastY = 0;
  const onDown = (e: PointerEvent) => {
    down = true;
    lastX = e.clientX;
    lastY = e.clientY;
    state.dragging = true;
    el.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    if (!down) return;

    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    state.vy = dx * 0.006;
    state.ry += state.vy;
    if (e.pointerType === 'mouse') state.rx = Math.max(-0.6, Math.min(1.1, state.rx + dy * 0.004));
  };
  const onUp = () => {
    down = false;
    state.dragging = false;
  };
  el.addEventListener('pointerdown', onDown);
  el.addEventListener('pointermove', onMove);
  el.addEventListener('pointerup', onUp);
  el.addEventListener('pointercancel', onUp);

  return () => {
    el.removeEventListener('pointerdown', onDown);
    el.removeEventListener('pointermove', onMove);
    el.removeEventListener('pointerup', onUp);
    el.removeEventListener('pointercancel', onUp);
  };
}

// Suspend rendering while the canvas is outside the viewport.
export function runWhenVisible(el: HTMLElement, tick: (delta: number) => void) {
  let visible = true;
  let raf = 0;
  let last = performance.now();
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) {
      last = performance.now();
      loop(last);
    }
  });
  io.observe(el);
  function loop(t: number) {
    cancelAnimationFrame(raf);

    if (!visible) return;

    const dt = Math.min(0.05, (t - last) / 1000);
    last = t;
    tick(dt);
    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);

  return () => {
    io.disconnect();
    cancelAnimationFrame(raf);
  };
}
