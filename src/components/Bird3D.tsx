import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import Bird from "./Bird";
import { asset } from "../lib/asset";

// Fracción del lado más corto del contenedor que ocupa el modelo.
const FILL = 0.7;
// Giro máximo al seguir el mouse (radianes).
const TILT_Y = 0.6;
const TILT_X = 0.35;
// Suavizado del movimiento (0 = no se mueve, 1 = instantáneo).
const SMOOTH = 0.08;

export default function Bird3D() {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = host.current;
    if (!container || failed) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    const canvas = renderer.domElement;
    canvas.className =
      "block h-full w-full cursor-grab touch-pan-y focus-visible:outline-2 focus-visible:outline-teal rounded-full active:cursor-grabbing";
    canvas.tabIndex = 0;
    canvas.setAttribute("role", "img");
    canvas.setAttribute(
      "aria-label",
      "Modelo 3D de SIGGRAPH. Se mueve con el mouse; arrastra o usa las flechas para girarlo.",
    );
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 8);
    scene.add(new THREE.HemisphereLight(0xd2f8ff, 0x3d1835, 2.6));
    const key = new THREE.DirectionalLight(0xffead5, 4);
    key.position.set(-3, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x2bb5a8, 3);
    rim.position.set(4, 2, -4);
    scene.add(rim);

    // El modelo se normaliza a una esfera de radio 1 centrada en el origen.
    const model = new THREE.Group();
    scene.add(model);
    const RADIUS = 1;

    let disposed = false;
    let needsRender = true;
    const abort = new AbortController();

    // Estado de la interacción con el mouse.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let hoverX = 0; // posición del cursor, -1..1
    let hoverY = 0;
    let dragX = 0; // giro acumulado por arrastre
    let dragY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const disposeModel = (root: THREE.Object3D) => {
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      const textures = new Set<THREE.Texture>();
      root.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        geometries.add(object.geometry);
        const list = Array.isArray(object.material) ? object.material : [object.material];
        list.forEach((material) => {
          materials.add(material);
          Object.values(material).forEach((value) => {
            if (value instanceof THREE.Texture) textures.add(value);
          });
        });
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (width < 1 || height < 1) return;
      camera.aspect = width / height;
      const verticalFov = THREE.MathUtils.degToRad(camera.fov);
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
      const distance = RADIUS / Math.sin(Math.min(verticalFov, horizontalFov) / 2) / FILL;
      camera.position.set(0, 0, distance);
      camera.lookAt(0, 0, 0);
      camera.near = Math.max(0.01, distance - RADIUS * 2);
      camera.far = distance + RADIUS * 4;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      needsRender = true;
    };

    fetch(asset("models/logo-siggraph.glb"), { signal: abort.signal })
      .then((response) => {
        if (!response.ok) throw new Error("No se pudo cargar el modelo");
        return response.arrayBuffer();
      })
      .then((buffer) => new GLTFLoader().parseAsync(buffer, asset("models/")))
      .then((gltf) => {
        if (disposed) {
          disposeModel(gltf.scene);
          return;
        }
        const bounds = new THREE.Box3().setFromObject(gltf.scene);
        if (bounds.isEmpty()) throw new Error("Modelo vacío");
        const sphere = bounds.getBoundingSphere(new THREE.Sphere());
        gltf.scene.position.sub(sphere.center);
        model.add(gltf.scene);
        model.scale.setScalar(RADIUS / Math.max(sphere.radius, 0.001));
        resize();
        setLoading(false);
      })
      .catch(() => {
        if (!disposed) setFailed(true);
      });

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    // --- Mouse ---
    const onPointerMove = (event: PointerEvent) => {
      if (dragging) {
        dragY += (event.clientX - lastX) * 0.01;
        dragX = THREE.MathUtils.clamp(dragX + (event.clientY - lastY) * 0.01, -1, 1);
        lastX = event.clientX;
        lastY = event.clientY;
        return;
      }
      if (event.pointerType !== "mouse" || reduceMotion) return;
      hoverX = (event.clientX / window.innerWidth) * 2 - 1;
      hoverY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const onPointerUp = () => {
      dragging = false;
    };
    const onMouseLeaveWindow = () => {
      hoverX = 0;
      hoverY = 0;
    };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    document.documentElement.addEventListener("pointerleave", onMouseLeaveWindow);
    canvas.addEventListener("pointerdown", onPointerDown);

    // --- Teclado (accesibilidad) ---
    const keyboard = (event: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "ArrowLeft") dragY -= 0.15;
      if (event.key === "ArrowRight") dragY += 0.15;
      if (event.key === "ArrowUp") dragX = Math.max(-1, dragX - 0.1);
      if (event.key === "ArrowDown") dragX = Math.min(1, dragX + 0.1);
    };
    const contextLost = (event: Event) => {
      event.preventDefault();
      setFailed(true);
    };
    canvas.addEventListener("keydown", keyboard);
    canvas.addEventListener("webglcontextlost", contextLost);

    renderer.setAnimationLoop(() => {
      if (document.hidden) return;
      const targetY = dragY + hoverX * TILT_Y;
      const targetX = dragX + hoverY * TILT_X;
      const diffY = targetY - model.rotation.y;
      const diffX = targetX - model.rotation.x;
      const moving = Math.abs(diffY) > 0.0005 || Math.abs(diffX) > 0.0005;
      if (moving) {
        model.rotation.y += diffY * SMOOTH;
        model.rotation.x += diffX * SMOOTH;
      }
      if (moving || needsRender) {
        renderer.render(scene, camera);
        needsRender = false;
      }
    });

    return () => {
      disposed = true;
      abort.abort();
      renderer.setAnimationLoop(null);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.documentElement.removeEventListener("pointerleave", onMouseLeaveWindow);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("keydown", keyboard);
      canvas.removeEventListener("webglcontextlost", contextLost);
      disposeModel(model);
      renderer.dispose();
      canvas.remove();
    };
  }, [failed]);

  return (
    <div className="relative z-10 h-full w-full">
      {failed ? (
        <>
          <Bird />
          <span
            role="status"
            className="absolute bottom-14 left-4 rounded-tag bg-ink-850 px-2 text-xs text-muted"
          >
            No se pudo mostrar el modelo 3D. Vista alternativa.
          </span>
        </>
      ) : (
        <>
          <div ref={host} className="h-full w-full" />
          <span
            role="status"
            className="pointer-events-none absolute bottom-12 left-4 rounded-tag bg-ink-850 px-2 py-1 font-mono text-xs text-muted"
          >
            {loading ? "CARGANDO MODELO 3D…" : "MUEVE EL MOUSE"}
          </span>
        </>
      )}
    </div>
  );
}
