import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { THEMES, type SceneProps } from '@/shared/config/themes';
import { attachDrag, runWhenVisible } from './scene-interaction';

type TankPart = [
  x: number,
  y: number,
  z: number,
  width: number,
  height: number,
  depth: number,
  color: string,
];
type Palette = typeof THEMES.default.tank;

function buildHullParts(p: Palette): TankPart[] {
  return [
    [0, 1.0, 4.7, 16.4, 2.2, 2.4, p.dark],
    [0, 1.0, -4.7, 16.4, 2.2, 2.4, p.dark],
    [8.5, 1.5, 4.7, 1.1, 1.5, 2.4, p.dark],
    [-8.5, 1.5, 4.7, 1.1, 1.5, 2.4, p.dark],
    [8.5, 1.5, -4.7, 1.1, 1.5, 2.4, p.dark],
    [-8.5, 1.5, -4.7, 1.1, 1.5, 2.4, p.dark],
    [0, 2.1, 5.95, 14.8, 1.2, 0.35, p.armor],
    [0, 2.1, -5.95, 14.8, 1.2, 0.35, p.armor],
    [0, 2.9, 0, 15.2, 1.9, 11.4, p.hull],
    [6.8, 2.5, 0, 3.2, 1.2, 9.2, p.armor],
    [-0.8, 4.1, 0, 12.2, 0.65, 8.2, p.armor],
    [-6.8, 4.45, 0, 2.4, 0.35, 6.2, p.dark],
  ];
}

// Turret geometry is relative to the pivot at (-1, 0, 0).
function buildTurretParts(p: Palette): TankPart[] {
  return [
    [0, 5.5, 0, 7.6, 2.3, 6.8, p.hull],
    [4.0, 5.3, 0, 1.6, 1.7, 4.0, p.armor],
    [0, 6.8, 0, 5.4, 0.45, 4.8, p.armor],
    [-1.6, 7.2, 1.4, 2.0, 0.6, 2.0, p.trim],
    [4.85, 5.7, 1.1, 0.25, 0.45, 1.1, p.optic],
    [9.8, 5.35, 0, 10.6, 0.82, 0.82, p.armor],
    [6.2, 5.35, 0, 2.2, 1.1, 1.1, p.trim],
    [15.3, 5.35, 0, 1.4, 1.15, 1.15, p.dark],
    [-3.2, 9.6, -2.4, 0.22, 6.2, 0.22, p.dark],
  ];
}

export default function Tank({ theme = 'default', motion = true }: SceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;

    if (!wrap || !canvas) return;

    const pal = (THEMES[theme] || THEMES.default).tank;
    const paused = !motion;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      });
    } catch {
      wrap.classList.add('is-fallback');

      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.22;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(25, 1, 1, 400);
    camera.position.set(34, 27, 48);
    camera.lookAt(0, 2.5, 0);

    scene.add(new THREE.HemisphereLight(pal.hemiSky, 0x0b0816, 0.92));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(28, 44, 30);
    scene.add(key);
    const rim = new THREE.DirectionalLight(pal.rim, 3.1);
    rim.position.set(-34, 18, -26);
    scene.add(rim);

    const tiles: TankPart[] = [];
    const S = 10;
    for (let x = -S; x < S; x++) {
      for (let z = -S; z < S; z++) {
        const d = Math.hypot(x + 0.5, z + 0.5);

        if (d > S) continue;

        const n = Math.sin(x * 0.65) * Math.cos(z * 0.5) + Math.sin((x + z) * 0.3);
        const road = Math.abs(z) < 3.0;
        const h = road ? 1 : 1 + Math.max(0, Math.round(n * 0.7));
        const c = road ? pal.road : n > 0.75 ? pal.groundA : pal.groundB;
        tiles.push([x * 2 + 1, -h, z * 2 + 1, 1.96, h * 2, 1.96, c]);
      }
    }

    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.55,
      metalness: 0.28,
    });
    const dummy = new THREE.Object3D();
    const col = new THREE.Color();

    const makeInstanced = (parts: TankPart[]) => {
      const m = new THREE.InstancedMesh(geo, mat, parts.length);
      parts.forEach((p, i) => {
        dummy.position.set(p[0], p[1], p[2]);
        dummy.scale.set(p[3], p[4], p[5]);
        dummy.updateMatrix();
        m.setMatrixAt(i, dummy.matrix);
        m.setColorAt(i, col.set(p[6]));
      });

      return m;
    };

    const baseMesh = makeInstanced([
      ...tiles,
      ...buildHullParts(pal).map((hullPart): TankPart => [
        hullPart[0],
        hullPart[1] + 0.05,
        hullPart[2],
        hullPart[3],
        hullPart[4],
        hullPart[5],
        hullPart[6],
      ]),
    ]);

    const turretPivot = new THREE.Group();
    turretPivot.position.set(-1.0, 0.05, 0);
    const turretMesh = makeInstanced(buildTurretParts(pal));
    turretPivot.add(turretMesh);

    const flagMat = new THREE.MeshStandardMaterial({
      color: pal.war,
      roughness: 0.45,
      metalness: 0.1,
    });
    const flagGeo = new THREE.BoxGeometry(2.3, 1.25, 0.16);
    flagGeo.translate(1.15, 0, 0);
    const flag = new THREE.Mesh(flagGeo, flagMat);
    flag.position.set(-3.2, 11.8, -2.4);
    turretPivot.add(flag);

    const group = new THREE.Group();
    group.add(baseMesh);
    group.add(turretPivot);
    scene.add(group);

    const state = { ry: -0.58, rx: 0, vy: 0, dragging: false };
    const detach = attachDrag(canvas, state);
    let hovering = false;
    const onEnter = () => {
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
    };
    canvas.addEventListener('pointerenter', onEnter);
    canvas.addEventListener('pointerleave', onLeave);

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;

      if (!w || !h) return;

      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const fit = w / h < 1 ? 1.38 : 1.02;
      camera.position.set(34 * fit, 27 * fit, 48 * fit);
      camera.lookAt(0, 2.5, 0);
      camera.updateProjectionMatrix();
      group.rotation.y = state.ry;
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    let autoSpeed = 0.46;
    let elapsed = 0;

    const stop = runWhenVisible(canvas, (dt) => {
      elapsed += dt;
      const targetSpeed = paused || hovering || state.dragging ? 0 : 0.46;
      autoSpeed += (targetSpeed - autoSpeed) * Math.min(1, dt * 6);

      if (!state.dragging) {
        state.vy *= 0.93;
        state.ry += state.vy + dt * autoSpeed;
      }
      group.rotation.y = state.ry;
      if (!paused) {
        turretPivot.rotation.y = Math.sin(elapsed * 0.95) * 0.36;
        flag.rotation.y = Math.sin(elapsed * 5.2) * 0.22;
      }
      renderer.render(scene, camera);
    });

    return () => {
      stop();
      detach();
      ro.disconnect();
      canvas.removeEventListener('pointerenter', onEnter);
      canvas.removeEventListener('pointerleave', onLeave);
      geo.dispose();
      mat.dispose();
      flagGeo.dispose();
      flagMat.dispose();
      renderer.dispose();
    };
  }, [theme, motion]);

  return (
    <div className="tank" ref={wrapRef}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interaktywny czołg z bloków 3D na ciemnym terenie; przeciągnij, aby obrócić"
      />
    </div>
  );
}
