import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { getWorld } from './world';
import { THEMES, type SceneProps } from '../themes';
import { attachDrag, runWhenVisible } from './print';

function formatCoord(lat: number, lon: number) {
  const ns = lat >= 0 ? 'N' : 'S';
  const ew = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(Math.round(lat))}°${ns} ${Math.abs(Math.round(lon))}°${ew}`;
}

export default function Globe({ theme = 'default', motion = true }: SceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tip, setTip] = useState<{ r: number; front: boolean; coord: string } | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const world = getWorld();
    const pal = (THEMES[theme] || THEMES.default).globe;
    const paused = !motion;
    const small = window.innerWidth < 900;

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
    renderer.toneMappingExposure = 1.18;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(27, 1, 0.1, 50);
    camera.position.set(0, 0, 5.85);

    const hemi = new THREE.HemisphereLight(pal.hemiSky, pal.hemiGround, 0.9);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(pal.key, 2.2);
    key.position.set(-4, 3.5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(pal.rim, 3.0);
    rim.position.set(4.5, -2.2, -2.5);
    scene.add(rim);

    const N = small ? 5200 : 9200;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const spacing = Math.sqrt((4 * Math.PI) / N);
    const geo = new THREE.BoxGeometry(1, 1, 1);
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.62,
      metalness: 0.2,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, N);
    const region = new Int16Array(N);
    const base: THREE.Color[] = [];
    const dummy = new THREE.Object3D();
    const n = new THREE.Vector3();
    const col = new THREE.Color();
    const ocean = new THREE.Color(pal.ocean);

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      n.set(Math.cos(th) * r, y, Math.sin(th) * r);
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lon = (Math.atan2(-n.z, n.x) * 180) / Math.PI;
      const land = world.isLand(lat, lon);
      let h;
      if (land) {
        region[i] = world.regionOf(lat, lon);
        const cHex = world.fronts.has(region[i]) ? pal.war : pal.land[region[i] % pal.land.length];
        col.set(cHex);
        h = 0.055 + ((region[i] * 37) % 5) * 0.009;
      } else {
        region[i] = -1;
        col.copy(ocean);
        h = 0.015;
      }
      base.push(col.clone());
      dummy.position.copy(n).multiplyScalar(1 + h / 2);
      dummy.lookAt(n.x * 10, n.y * 10, n.z * 10);
      dummy.scale.set(spacing * 0.94, spacing * 0.94, h);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, col);
    }

    const coreGeo = new THREE.SphereGeometry(0.995, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({ color: pal.core });
    const core = new THREE.Mesh(coreGeo, coreMat);

    const group = new THREE.Group();
    group.add(core);
    group.add(mesh);
    scene.add(group);

    // Dwa pierścienie orbitalne + 3 satelity z bloków krążące wokół Ziemi
    const ringGeo1 = new THREE.TorusGeometry(1.22, 0.0045, 12, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: pal.ring,
      transparent: true,
      opacity: 0.42,
    });
    const orbit1 = new THREE.Group();
    orbit1.rotation.set(1.2, 0.3, 0.15);
    orbit1.add(new THREE.Mesh(ringGeo1, ringMat1));

    const satGeo = new THREE.BoxGeometry(0.052, 0.052, 0.052);
    const satMat = new THREE.MeshBasicMaterial({ color: pal.highlight });
    const sat1 = new THREE.Mesh(satGeo, satMat);
    sat1.position.set(1.22, 0, 0);
    const sat2 = new THREE.Mesh(satGeo, satMat);
    sat2.position.set(-1.22, 0, 0);
    orbit1.add(sat1, sat2);
    scene.add(orbit1);

    const ringGeo2 = new THREE.TorusGeometry(1.33, 0.003, 10, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: pal.ring,
      transparent: true,
      opacity: 0.22,
    });
    const orbit2 = new THREE.Group();
    orbit2.rotation.set(-1.05, -0.45, 0.3);
    orbit2.add(new THREE.Mesh(ringGeo2, ringMat2));
    const sat3 = new THREE.Mesh(satGeo, new THREE.MeshBasicMaterial({ color: pal.war }));
    sat3.position.set(0, 1.33, 0);
    orbit2.add(sat3);
    scene.add(orbit2);

    // Kosmiczne wokselki krążące powoli wokół planety
    const dustCount = 48;
    const dustMat = new THREE.MeshBasicMaterial({
      color: pal.highlight,
      transparent: true,
      opacity: 0.55,
    });
    const dust = new THREE.InstancedMesh(geo, dustMat, dustCount);
    for (let i = 0; i < dustCount; i++) {
      const a = (i / dustCount) * Math.PI * 2;
      const rad = 1.36 + ((i * 19) % 10) * 0.028;
      const yy = (((i * 29) % 20) - 10) * 0.09;
      dummy.position.set(Math.cos(a) * rad, yy, Math.sin(a) * rad);
      dummy.rotation.set(i, i * 0.5, 0);
      const s = 0.016 + (i % 3) * 0.008;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      dust.setMatrixAt(i, dummy.matrix);
    }
    scene.add(dust);

    const state = { ry: -((90 + 19) * Math.PI) / 180, rx: 0.52, vy: 0, dragging: false };
    const detach = attachDrag(canvas, state);

    const resize = () => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      group.rotation.set(state.rx, state.ry, 0, 'XYZ');
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const ray = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hovered = -1;
    let pointer: { x: number; y: number; w: number; h: number } | null = null;
    let autoSpeed = 0.42;
    let elapsed = 0;

    const highlight = new THREE.Color(pal.highlight);
    const paint = (r: number, on: boolean) => {
      for (let i = 0; i < N; i++) {
        if (region[i] === r) mesh.setColorAt(i, on ? highlight : base[i]);
      }
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        w: rect.width,
        h: rect.height,
      };
    };
    const onLeave = () => {
      pointer = null;
    };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    const stop = runWhenVisible(canvas, (dt) => {
      elapsed += dt;
      // Gdy gracz NIE najeżdża na kulę, obraca się wyraźnie i płynnie w kółko;
      // po najechaniu zwalnia płynnie do zera, żeby łatwo celować w państwa i kręcić ręcznie.
      const targetSpeed = paused || pointer || state.dragging ? 0 : 0.42;
      autoSpeed += (targetSpeed - autoSpeed) * Math.min(1, dt * 6);

      if (!state.dragging) {
        state.vy *= 0.93;
        state.ry += state.vy + dt * autoSpeed;
      }
      group.rotation.set(state.rx, state.ry, 0, 'XYZ');
      if (!paused) {
        group.position.y = Math.sin(elapsed * 1.15) * 0.032;
        orbit1.rotation.z += dt * 0.45;
        orbit2.rotation.z -= dt * 0.32;
        dust.rotation.y -= dt * 0.14;
      }

      let next = -1;
      if (pointer) {
        mouse.set((pointer.x / pointer.w) * 2 - 1, -(pointer.y / pointer.h) * 2 + 1);
        ray.setFromCamera(mouse, camera);
        const hit = ray.intersectObject(mesh, false)[0];
        if (hit?.instanceId !== undefined && region[hit.instanceId] >= 0)
          next = region[hit.instanceId];
      }
      if (next !== hovered) {
        if (hovered >= 0 && !world.fronts.has(hovered)) paint(hovered, false);
        if (next >= 0 && !world.fronts.has(next)) paint(next, true);
        hovered = next;
        if (next >= 0) {
          const s = world.seeds[next];
          setTip({
            r: next,
            front: world.fronts.has(next),
            coord: s ? formatCoord(s.lat, s.lon) : '',
          });
        } else {
          setTip(null);
        }
      }
      if (next >= 0 && pointer) {
        wrap.style.setProperty('--tx', `${pointer.x}px`);
        wrap.style.setProperty('--ty', `${pointer.y}px`);
      }
      renderer.render(scene, camera);
    });

    return () => {
      stop();
      detach();
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      geo.dispose();
      mat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      satMat.dispose();
      sat3.material.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, [theme, motion]);

  return (
    <div className="globe" ref={wrapRef}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Interaktywna kula Ziemi 3D z bloków podzielona na państwa; przeciągnij, aby obrócić"
      />
      {tip && (
        <span className={`globe-tip ${tip.front ? 'is-front' : ''}`} aria-hidden="true">
          <strong>
            {tip.front ? 'Front wojenny' : `Państwo ${String(tip.r + 1).padStart(2, '0')}`}
          </strong>
          <span>{tip.coord}</span>
        </span>
      )}
    </div>
  );
}
