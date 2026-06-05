"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const mountEl = mount;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 120);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountEl.appendChild(renderer.domElement);

    const group = new THREE.Group();

    const purpleMat = new THREE.MeshStandardMaterial({ color: "#8b5cf6", roughness: 0.15, metalness: 0.5 });
    const indigoMat = new THREE.MeshStandardMaterial({ color: "#6366f1", roughness: 0.2, metalness: 0.4 });
    const violetMat = new THREE.MeshStandardMaterial({ color: "#7c3aed", roughness: 0.2, metalness: 0.4 });
    const pinkMat = new THREE.MeshStandardMaterial({ color: "#a78bfa", roughness: 0.15, metalness: 0.3 });

    const mats = [purpleMat, indigoMat, violetMat, pinkMat];

    const sphereGeo = new THREE.SphereGeometry(0.04, 16, 16);
    const sphereLgGeo = new THREE.SphereGeometry(0.07, 16, 16);

    const orbitingMeshes: { mesh: THREE.Mesh; radius: number; speed: number; angleOffset: number; yOffset: number }[] = [];

    for (let i = 0; i < 60; i++) {
      const ring = 0.8 + (i % 5) * 0.45;
      const angle = i * 0.72;
      const isLarge = i % 7 === 0;
      const mesh = new THREE.Mesh(isLarge ? sphereLgGeo : sphereGeo, mats[i % mats.length]);
      const yOff = Math.sin(i * 0.4) * 0.8;
      mesh.position.set(Math.cos(angle) * ring, yOff, Math.sin(angle) * ring);
      group.add(mesh);
      orbitingMeshes.push({ mesh, radius: ring, speed: 0.002 + (i % 3) * 0.001, angleOffset: angle, yOffset: yOff });
    }

    const wireGeo = new THREE.IcosahedronGeometry(1.3, 2);
    const wireMat = new THREE.MeshStandardMaterial({ color: "#8b5cf6", wireframe: true, transparent: true, opacity: 0.1 });
    const wire = new THREE.Mesh(wireGeo, wireMat);
    group.add(wire);

    const ringGeo = new THREE.TorusGeometry(1.8, 0.008, 16, 120);
    const ringMat = new THREE.MeshStandardMaterial({ color: "#8b5cf6", transparent: true, opacity: 0.25 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI * 0.45;
    group.add(ringMesh);

    const ring2Geo = new THREE.TorusGeometry(2.2, 0.006, 16, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({ color: "#6366f1", transparent: true, opacity: 0.15 });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.x = Math.PI * 0.3;
    ring2Mesh.rotation.z = Math.PI * 0.15;
    group.add(ring2Mesh);

    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: "#a78bfa", size: 0.02, transparent: true, opacity: 0.4 });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    scene.add(group);
    scene.add(new THREE.AmbientLight("#ffffff", 0.9));

    const light = new THREE.DirectionalLight("#ffffff", 1.6);
    light.position.set(4, 5, 6);
    scene.add(light);

    const backLight = new THREE.DirectionalLight("#8b5cf6", 0.4);
    backLight.position.set(-3, -2, -4);
    scene.add(backLight);

    let pointerX = 0;
    let pointerY = 0;
    let frame = 0;
    let time = 0;

    function resize() {
      const width = mountEl.clientWidth;
      const height = mountEl.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    function onPointerMove(event: PointerEvent) {
      const rect = mountEl.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    function animate() {
      frame = requestAnimationFrame(animate);
      time += 0.01;

      group.rotation.y += 0.003;
      group.rotation.x = -0.15 + pointerY * 0.06;
      group.rotation.z = pointerX * 0.04;

      wire.rotation.y -= 0.001;
      wire.rotation.x += 0.0005;

      ringMesh.rotation.z += 0.002;
      ring2Mesh.rotation.z -= 0.0015;

      for (const item of orbitingMeshes) {
        const a = item.angleOffset + time * item.speed * 40;
        item.mesh.position.x = Math.cos(a) * item.radius;
        item.mesh.position.z = Math.sin(a) * item.radius;
        item.mesh.position.y = item.yOffset + Math.sin(time * 2 + item.angleOffset) * 0.1;
      }

      const posAttr = particleGeo.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        posAttr.array[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.0005;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    }

    resize();
    animate();
    window.addEventListener("resize", resize);
    mountEl.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      mountEl.removeEventListener("pointermove", onPointerMove);
      mountEl.removeChild(renderer.domElement);
      sphereGeo.dispose();
      sphereLgGeo.dispose();
      purpleMat.dispose();
      indigoMat.dispose();
      violetMat.dispose();
      pinkMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="hero-visual" aria-label="Interactive data network visual" role="img" />
  );
}
