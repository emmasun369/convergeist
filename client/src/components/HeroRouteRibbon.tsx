/**
 * Arrival Notebook motion: a deliberately small Three.js route ribbon maps departure to a warm arrival point without becoming a visual spectacle.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroRouteRibbon() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!mount || reducedMotion || window.innerWidth < 900) return;

    let frame = 0;
    let visible = true;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 5.1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.4));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.9, -0.65, 0),
      new THREE.Vector3(-0.95, 0.45, 0.32),
      new THREE.Vector3(0.1, -0.12, -0.18),
      new THREE.Vector3(1.36, 0.62, 0.12),
    ]);
    const group = new THREE.Group();
    group.rotation.set(-0.17, -0.17, 0.06);
    scene.add(group);

    const ribbon = new THREE.Mesh(
      new THREE.TubeGeometry(path, 78, 0.033, 7, false),
      new THREE.MeshStandardMaterial({ color: 0x7ec6af, roughness: 0.48, metalness: 0.08, transparent: true, opacity: 0.84 }),
    );
    group.add(ribbon);

    const station = new THREE.Mesh(
      new THREE.SphereGeometry(0.105, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0xb94e32, emissive: 0x5c1f13, emissiveIntensity: 0.46, roughness: 0.28 }),
    );
    station.position.copy(path.getPoint(1));
    group.add(station);

    const origin = new THREE.Mesh(
      new THREE.SphereGeometry(0.043, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xf9f4ea, emissive: 0x446f62, emissiveIntensity: 0.35 }),
    );
    origin.position.copy(path.getPoint(0));
    group.add(origin);

    const ambience = new THREE.HemisphereLight(0xd0eee3, 0x06443a, 1.5);
    const keyLight = new THREE.PointLight(0xf5d2bd, 2.1, 8);
    keyLight.position.set(1.4, 1.5, 3.4);
    scene.add(ambience, keyLight);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.02 });
    observer.observe(mount);

    const render = (time: number) => {
      if (visible) {
        const drift = time * 0.00042;
        group.rotation.y = Math.sin(drift) * 0.15 - 0.17;
        group.position.y = Math.sin(drift * 1.5) * 0.05;
        station.scale.setScalar(1 + Math.sin(time * 0.003) * 0.07);
        renderer.render(scene, camera);
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      ribbon.geometry.dispose();
      (ribbon.material as THREE.Material).dispose();
      station.geometry.dispose();
      (station.material as THREE.Material).dispose();
      origin.geometry.dispose();
      (origin.material as THREE.Material).dispose();
      renderer.dispose();
      mount.replaceChildren();
    };
  }, []);

  return <div ref={mountRef} className="hero-ribbon" aria-hidden="true" />;
}
