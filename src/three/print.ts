import * as THREE from 'three';

// „Druk trzema farbami”: płaski kolor + raster półtonowy tuszu w cieniu,
// raster w przestrzeni ekranu (jak siatka drukarska), obrócony o 45°.
export function createPrintMaterial({ dot = 6 } = {}) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uLight: { value: new THREE.Vector3(-0.55, 0.75, 0.6).normalize() },
      uInk: { value: new THREE.Color('#141210') },
      uDot: { value: dot },
      uBase: { value: new THREE.Color('#ffffff') },
    },
    vertexShader: /* glsl */ `
      varying vec3 vN;
      varying vec3 vColor;
      uniform vec3 uBase;
      void main() {
        mat4 im = mat4(1.0);
        vColor = uBase;
        #ifdef USE_INSTANCING
          im = instanceMatrix;
        #endif
        #ifdef USE_INSTANCING_COLOR
          vColor = instanceColor;
        #endif
        vN = normalize(mat3(modelMatrix) * mat3(im) * normal);
        gl_Position = projectionMatrix * viewMatrix * modelMatrix * im * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uLight;
      uniform vec3 uInk;
      uniform float uDot;
      varying vec3 vN;
      varying vec3 vColor;
      void main() {
        float d = max(dot(normalize(vN), uLight), 0.0);
        float shade = 1.0 - d;
        vec2 p = gl_FragCoord.xy / uDot;
        p = mat2(0.7071, -0.7071, 0.7071, 0.7071) * p;
        float r = length(fract(p) - 0.5);
        float radius = smoothstep(0.3, 1.0, shade) * 0.66;
        float m = 1.0 - smoothstep(radius - 0.07, radius + 0.07, r);
        vec3 col = mix(vColor, uInk, m * 0.9);
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }
    `,
  });
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Obrót przeciąganiem w poziomie (pion przewija stronę), z bezwładnością.
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

// Wspólna pętla: renderuje tylko, gdy płótno jest widoczne.
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
