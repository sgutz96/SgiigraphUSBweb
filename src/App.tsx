import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type HTMLMotionProps } from 'motion/react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { BackToTop, ScrollFX, ScrollMarquee, ScrollProgress, ScrollWords, SectionRail, useScrollHeader } from './fx';

const sections = ['Inicio', 'Nosotros', 'Eventos', 'Investigación', 'Proyectos', 'Recursos', 'Comunidad'];
const projects = [
  { title: 'Mundos que aún no existen', category: 'Arte digital', tag: 'EXPLORACIÓN CREATIVA', kind: 'world', description: 'Paisajes especulativos donde la arquitectura, la naturaleza y la imaginación se encuentran.' },
  { title: 'Más allá de la pantalla', category: 'Realidad virtual', tag: 'INVESTIGACIÓN + XR', kind: 'xr', description: 'Una exploración de nuevas formas de habitar e interactuar con espacios virtuales.' },
  { title: 'El código también crea', category: 'Inteligencia artificial', tag: 'ARTE GENERATIVO', kind: 'code', description: 'Sistemas creativos que convierten datos y algoritmos en nuevas expresiones visuales.' },
];
const events = [
  { title: 'Del concepto al mundo: creación de entornos 3D', type: 'Masterclass', date: '24', month: 'OCT', time: '4:00 p. m.', place: 'Auditorio Fray Diego Barroso', description: 'Explora el proceso de creación de un entorno digital: desde las primeras ideas hasta la iluminación y el render final.' },
  { title: 'Inteligencia artificial y nuevas narrativas', type: 'Conversatorio', date: '30', month: 'OCT', time: '2:00 p. m.', place: 'Laboratorio de medios digitales', description: 'Una conversación abierta sobre autoría, herramientas generativas y el futuro de las narrativas digitales.' },
  { title: 'Primeros pasos en creative coding', type: 'Taller', date: '07', month: 'NOV', time: '3:00 p. m.', place: 'Sala de cómputo', description: 'Experimenta con formas, movimiento e interacción a través del código. No necesitas experiencia previa.' },
];
function Icon({ name = 'arrow', className = '' }: { name?: string; className?: string }) {
  const paths: Record<string, string> = { arrow: 'M5 12h14M13 6l6 6-6 6', diagonal: 'M6 18 18 6M6 6h12v12', calendar: 'M8 3v4M16 3v4M4 10h16M5 5h14v15H5z', pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM12 8v4', plus: 'M12 5v14M5 12h14', globe: 'M3 12h18M12 3c6 5 6 13 0 18-6-5-6-13 0-18ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', menu: 'M4 6h16M4 12h16M4 18h16' };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={`h-5 w-5 shrink-0 ${className}`} aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg>;
}
function Bird({ small = false }: { small?: boolean }) {
  return <svg viewBox="0 0 600 500" className={small ? 'h-14 w-16 shrink-0' : 'relative z-10 h-full w-full'} role="img" aria-label="Colibrí geométrico multicolor de SIGGRAPH San Buena">
    {small && <circle cx="300" cy="250" r="240" fill="#0F1A4A" />}
    <g stroke="#151517" strokeWidth={small ? '0' : '2'}>
      <path d="m312 239-98-88-92-109 24 140 102 127Z" fill="#F47B20" />
      <path d="m312 239-98-88 34 158Z" fill="#FBC9A8" />
      <path d="m214 151-92-109 88 47 116 143Z" fill="#F9A244" />
      <path d="m248 309-102-127 40 119 92 50Z" fill="#C41E5A" />
      <path d="m312 239 22-68 80-67-19 99-53 80Z" fill="#2BB5A8" />
      <path d="m334 171 80-67-45 110-27 69Z" fill="#77D1BC" />
      <path d="m342 283 53-80-14 102-73 53Z" fill="#198E8F" />
      <path d="m312 239 30 44-34 75-60-49Z" fill="#FBC9A8" />
      <path d="m308 358-30-7-88 111 99-62Z" fill="#C41E5A" />
      <path d="m278 351-30-42-25 117Z" fill="#F47B20" />
      <path d="m334 171 9-45 28-25 37 8-13 28-44 21Z" fill="#2BB5A8" />
      <path d="m371 101 37 8 93-28-106 56Z" fill="#F47B20" />
      <path d="m343 126 28-25-20 57-17 13Z" fill="#C41E5A" />
      <circle cx="379" cy="119" r="4" fill="#151517" stroke="none" />
    </g>
  </svg>;
}
function Bird3D() {
  const host = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [isPaused, setIsPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [failed, setFailed] = useState(false);
  paused.current = isPaused;

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
    renderer.toneMappingExposure = 1.5;
    const canvas = renderer.domElement;
    canvas.className = 'block h-full w-full cursor-grab touch-pan-y focus-visible:outline-2 focus-visible:outline-[#2BB5A8] active:cursor-grabbing';
    canvas.tabIndex = 0;
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Colibrí 3D multicolor. Arrastra o usa las flechas izquierda y derecha para rotarlo.');
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
    camera.position.set(0.6, 0.35, 8.8);
    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.75;
    controls.target.set(0, 0.1, 0);
    scene.add(new THREE.HemisphereLight(0xd2f8ff, 0x3d1835, 2.6));
    const key = new THREE.DirectionalLight(0xffead5, 4);
    key.position.set(-3, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x2bb5a8, 3);
    rim.position.set(4, 2, -4);
    scene.add(rim);
    const bird = new THREE.Group();
    bird.rotation.set(0.05, -0.35, -0.22);
    const pivot = new THREE.Group();
    scene.add(pivot);
    pivot.add(bird);
    const materials = {
      teal: new THREE.MeshStandardMaterial({ color: '#2BB5A8', roughness: 0.4, metalness: 0.25, flatShading: true }),
      orange: new THREE.MeshStandardMaterial({ color: '#F47B20', roughness: 0.5, metalness: 0.15, flatShading: true }),
      peach: new THREE.MeshStandardMaterial({ color: '#FBC9A8', roughness: 0.55, flatShading: true }),
      magenta: new THREE.MeshStandardMaterial({ color: '#C41E5A', roughness: 0.4, metalness: 0.2, flatShading: true }),
      mint: new THREE.MeshStandardMaterial({ color: '#78D6BE', roughness: 0.45, metalness: 0.15, flatShading: true }),
      dark: new THREE.MeshStandardMaterial({ color: '#10131c', roughness: 0.18 }),
    };
    const solid = (parent: THREE.Group, material: THREE.Material, position: number[], scale: number[]) => {
      const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 1), material);
      mesh.position.set(position[0], position[1], position[2]);
      mesh.scale.set(scale[0], scale[1], scale[2]);
      parent.add(mesh);
      return mesh;
    };
    const body = solid(bird, materials.teal, [0, -0.12, 0], [0.46, 0.83, 0.39]);
    body.rotation.z = -0.35;
    solid(bird, materials.peach, [0.18, -0.22, 0.25], [0.32, 0.56, 0.2]).rotation.z = -0.4;
    solid(bird, materials.magenta, [0.22, 0.38, 0.1], [0.25, 0.3, 0.28]);
    solid(bird, materials.teal, [0.4, 0.62, 0], [0.35, 0.34, 0.3]);
    solid(bird, materials.dark, [0.55, 0.7, 0.25], [0.048, 0.048, 0.035]);
    solid(bird, materials.dark, [0.55, 0.7, -0.25], [0.048, 0.048, 0.035]);
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.08, 1.05, 5), materials.orange);
    const direction = new THREE.Vector3(1, 0.22, 0).normalize();
    beak.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    beak.position.set(1.16, 0.76, 0);
    bird.add(beak);

    const feather = (parent: THREE.Group, length: number, width: number, material: THREE.Material) => {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.lineTo(-width * 0.6, length * 0.42);
      shape.lineTo(-width * 0.25, length);
      shape.lineTo(width * 0.5, length * 0.68);
      shape.lineTo(width * 0.55, length * 0.18);
      shape.closePath();
      const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.07, bevelEnabled: true, bevelSize: 0.025, bevelThickness: 0.025, bevelSegments: 1, steps: 1 });
      const mesh = new THREE.Mesh(geometry, material);
      parent.add(mesh);
      return mesh;
    };
    const wings = [-1, 1].map(side => {
      const wing = new THREE.Group();
      wing.position.set(-0.18, 0.17, side * 0.2);
      wing.rotation.set(side * 0.8, side * 0.15, 0.45);
      bird.add(wing);
      for (let i = 0; i < 7; i++) {
        const plume = feather(wing, 1.95 - i * 0.14, 0.38, [materials.orange, materials.orange, materials.peach, materials.magenta, materials.teal, materials.mint, materials.teal][i]);
        plume.rotation.z = 0.12 + i * 0.14;
        plume.position.set(-i * 0.055, 0, side * i * 0.035);
      }
      return wing;
    });
    const tail = new THREE.Group();
    tail.position.set(-0.23, -0.66, 0);
    tail.rotation.z = 2.75;
    bird.add(tail);
    for (let i = 0; i < 4; i++) {
      const plume = feather(tail, 1.15 - i * 0.08, 0.22, i % 2 ? materials.orange : materials.magenta);
      plume.rotation.z = (i - 1.5) * 0.19;
      plume.position.z = (i - 1.5) * 0.07;
    }
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      camera.aspect = width / Math.max(height, 1);
      camera.position.z = camera.aspect < 1 ? 10.3 : 8.8;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();
    const keyboard = (event: KeyboardEvent) => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'ArrowLeft') bird.rotation.y -= 0.15;
      if (event.key === 'ArrowRight') bird.rotation.y += 0.15;
      if (event.key === 'ArrowUp') bird.rotation.x -= 0.1;
      if (event.key === 'ArrowDown') bird.rotation.x += 0.1;
    };
    const contextLost = (event: Event) => { event.preventDefault(); setFailed(true); };
    canvas.addEventListener('keydown', keyboard);
    canvas.addEventListener('webglcontextlost', contextLost);
    let time = 0;
    let last = performance.now();
    let lastScroll = window.scrollY;
    let scrollSpeed = 0;
    renderer.setAnimationLoop(now => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const scrollNow = window.scrollY;
      const speed = Math.min(Math.abs(scrollNow - lastScroll) / Math.max(dt * 1000, 1), 4);
      lastScroll = scrollNow;
      scrollSpeed += (speed - scrollSpeed) * 0.08;
      if (!paused.current && !document.hidden) {
        time += dt * (1 + scrollSpeed * 1.2);
        pivot.rotation.y += (scrollNow * 0.0032 - pivot.rotation.y) * 0.07;
        bird.position.y = Math.sin(time * 1.7) * 0.09;
        wings.forEach((wing, i) => { wing.rotation.x = (i === 0 ? -1 : 1) * (0.8 + Math.sin(time * 6) * 0.16); });
      }
      controls.update();
      renderer.render(scene, camera);
    });
    return () => {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      controls.dispose();
      canvas.removeEventListener('keydown', keyboard);
      canvas.removeEventListener('webglcontextlost', contextLost);
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
      });
      Object.values(materials).forEach(material => material.dispose());
      renderer.dispose();
      canvas.remove();
    };
  }, [failed]);

  return <div className="relative z-10 h-full w-full">
    {failed ? <><Bird /><span className="absolute bottom-14 left-4 bg-[#151517] px-2 text-xs text-slate-300">Vista estática: 3D no disponible en este dispositivo.</span></> : <>
      <div ref={host} className="h-full w-full" />
      <button onClick={() => setIsPaused(value => !value)} aria-pressed={isPaused} aria-label={isPaused ? 'Activar animación del colibrí' : 'Pausar animación del colibrí'} className="absolute bottom-12 left-4 min-h-11 border border-[#3A3A3C] bg-[#151517] px-3 font-mono text-xs text-[#78D6BE] hover:border-[#2BB5A8] focus-visible:ring-2 focus-visible:ring-[#2BB5A8]">{isPaused ? '▶ ANIMAR 3D' : 'Ⅱ PAUSAR 3D'}</button>
    </>}
  </div>;
}
function Art({ kind }: { kind: string }) {
  return <div className={`relative h-56 overflow-hidden ${kind === 'world' ? 'bg-[#263e40]' : kind === 'xr' ? 'bg-[#362a49]' : 'bg-[#183634]'}`}>
    <svg viewBox="0 0 500 280" className="h-full w-full transition-transform duration-700 ease-out motion-safe:group-hover:scale-110" aria-hidden="true">
      {kind === 'world' ? <><circle cx="355" cy="80" r="43" fill="#FBC9A8" /><path d="M0 220 130 100l80 99 78-55 212 136H0" fill="#73928A" /><path d="m0 250 170-94 120 124H0M240 280l115-138 145 98v40" fill="#112E30" />{[0,1,2,3,4].map(i => <g key={i} transform={`translate(${180 + i * 19},${60 + i * 15})`}><path d="M0 145V0h67v145" fill="none" stroke="#F1D9B4" strokeWidth="5" /><path d="M12 145V15h43v130" fill="none" stroke="#A9B9A7" strokeWidth="2" /></g>)}</> : kind === 'xr' ? <><circle cx="250" cy="140" r="96" fill="none" stroke="#BA8CC4" strokeWidth="2" /><circle cx="250" cy="140" r="72" fill="none" stroke="#BA8CC4" /><path d="M0 245 250 170l250 75M0 270l250-100 250 100M250 170v110M80 280l170-110 170 110M0 215h500M0 244h500M0 275h500" stroke="#8E659D" fill="none" /><g transform="rotate(-15 250 140)"><rect x="171" y="89" width="158" height="95" rx="25" fill="#A59AB8" /><rect x="181" y="100" width="138" height="65" rx="19" fill="#252531" /><path d="M199 136h40m22 0h40" stroke="#53D3C1" strokeWidth="4" /></g></> : <>{Array.from({length: 24}, (_, i) => <ellipse key={i} cx="250" cy="142" rx={35 + i * 6} ry={25 + i * 3.6} transform={`rotate(${i * 8} 250 142)`} fill="none" stroke={i % 3 === 0 ? '#F4A768' : '#64BEA4'} strokeWidth="1.4" />)}</>}
    </svg>
    <span className="absolute bottom-4 left-5 flex items-center gap-2 font-mono text-xs text-white"><span className="h-1.5 w-1.5 bg-[#2BB5A8]" /> USBBOG / EXPLORACIONES</span>
  </div>;
}
function Entrance({ delay = 0, from = 'up', className, children }: { delay?: number; from?: 'up' | 'left' | 'right' | 'scale'; className?: string; children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const offset = { up: { y: 32 }, left: { x: -44 }, right: { x: 44 }, scale: { scale: 0.92, y: 16 } }[from];
  return <motion.div
    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, ...offset }}
    whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.12, margin: '0px 0px -6% 0px' }}
    transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >{children}</motion.div>;
}
function SectionHeading({ label, title, action, onClick }: { label: string; title: string; action?: string; onClick?: () => void }) {
  const reducedMotion = useReducedMotion();
  return <Entrance className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-3 font-mono text-xs tracking-[.2em] text-[#F47B20]">{label}</p><h2 className="font-display text-2xl tracking-tight md:text-3xl">{title}</h2><motion.span aria-hidden="true" initial={{ scaleX: reducedMotion ? 1 : 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="mt-4 block h-0.5 w-20 origin-left bg-[#F47B20]" /></div>{action && <button onClick={onClick} className="group flex min-h-11 items-center gap-3 border-b border-[#555] text-sm transition-colors hover:border-[#F47B20] hover:text-[#F47B20]">{action}<Icon className="transition-transform motion-safe:group-hover:translate-x-1" /></button>}</Entrance>;
}
function ActionButton({ className = '', variant = 'solid', ...props }: HTMLMotionProps<'button'> & { variant?: 'solid' | 'outline' }) {
  const reducedMotion = useReducedMotion();
  return <motion.button
    type="button"
    whileHover={reducedMotion ? undefined : { y: -2 }}
    whileTap={reducedMotion ? undefined : { scale: 0.97 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    className={`inline-flex min-h-12 items-center justify-center gap-4 px-6 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-4 focus-visible:ring-offset-[#151517] disabled:cursor-not-allowed ${variant === 'solid' ? 'border border-orange bg-orange text-black hover:bg-[#ffa056]' : 'border border-orange text-orange hover:bg-orange/10'} ${className}`}
    {...props}
  />;
}
function ProjectCard({ project, onSelect, index = 0 }: { project: (typeof projects)[number]; onSelect: () => void; index?: number }) {
  const reducedMotion = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const tiltX = useSpring(rx, { stiffness: 220, damping: 20 });
  const tiltY = useSpring(ry, { stiffness: 220, damping: 20 });
  const glow = useRef<HTMLSpanElement>(null);
  const onMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const box = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width;
    const py = (event.clientY - box.top) / box.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
    glow.current?.style.setProperty('--mx', `${px * 100}%`);
    glow.current?.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };
  return <motion.button
    layout={!reducedMotion}
    onClick={onSelect}
    onPointerMove={onMove}
    onPointerLeave={onLeave}
    initial={reducedMotion ? { opacity: 1 } : { y: 40, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1, transition: { duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] } }}
    viewport={{ once: true, amount: 0.12 }}
    whileHover={reducedMotion ? undefined : { y: -6 }}
    whileTap={reducedMotion ? undefined : { scale: 0.99 }}
    style={reducedMotion ? undefined : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
    transition={{ type: 'spring', stiffness: 280, damping: 26 }}
    className="group relative min-w-0 overflow-hidden border border-[#373739] bg-[#19191c] text-left transition-colors hover:border-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal"
  >
    <Art kind={project.kind} />
    <span ref={glow} aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(43,181,168,.16), transparent 65%)' }} />
    <div className="p-6">
      <p className="mb-3 font-mono text-xs tracking-wider text-[#62CDBE]">{project.tag}</p>
      <h3 className="mb-3 text-lg font-semibold transition-colors group-hover:text-orange">{project.title}</h3>
      <div className="flex items-center justify-between text-sm text-slate-300">
        <span>{project.category}</span><Icon name="diagonal" className="transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" />
      </div>
    </div>
  </motion.button>;
}
function Hero({ navigate }: { navigate: (page: string) => void }) {
  const reducedMotion = useReducedMotion();
  const live = !reducedMotion;
  const ref = useRef<HTMLElement>(null);
  const spot = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const textFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 18 });
  const sy = useSpring(py, { stiffness: 70, damping: 18 });
  const ringAx = useTransform(sx, [-0.5, 0.5], [-18, 18]);
  const ringAy = useTransform(sy, [-0.5, 0.5], [-18, 18]);
  const ringBx = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const ringBy = useTransform(sy, [-0.5, 0.5], [14, -14]);
  const plusX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const plusY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!live || event.pointerType === 'touch') return;
    const box = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
    spot.current?.style.setProperty('--mx', `${event.clientX - box.left}px`);
    spot.current?.style.setProperty('--my', `${event.clientY - box.top}px`);
  };
  return <section id="hero" ref={ref} onPointerMove={onMove} className="relative scroll-mt-24 border-b border-white/10">
    <div ref={spot} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ background: 'radial-gradient(520px circle at var(--mx, 72%) var(--my, 40%), rgba(43,181,168,.10), transparent 70%)' }} />
    <motion.div initial={{ scaleY: live ? 0 : 1 }} animate={{ scaleY: 1 }} transition={{ duration: live ? 1 : 0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} className="absolute bottom-16 left-0 top-14 w-1.5 origin-top bg-[#C41E5A]" />
    <div className="relative mx-auto grid max-w-[1320px] items-center px-6 pb-12 pt-14 md:grid-cols-[1.05fr_1fr] lg:px-12 lg:pb-16 lg:pt-16">
      <motion.div style={live ? { y: textY, opacity: textFade } : undefined} className="relative z-20 min-w-0">
        <Entrance delay={0.05} className="mb-7 flex items-center gap-3 font-mono text-xs tracking-[.16em] text-slate-300"><span className="h-2 w-2 bg-[#2BB5A8]" /> ACM SIGGRAPH STUDENT CHAPTER</Entrance>
        <h1 className="font-display text-[42px] leading-[1.18] tracking-[-.035em] sm:text-[56px] lg:text-[66px]">
          {['DONDE LAS', 'IDEAS COBRAN', 'OTRA DIMENSIÓN.'].map((line, index) => <motion.span key={line} initial={{ x: live ? -24 : 0, opacity: live ? 0 : 1 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: live ? 0.7 : 0, delay: live ? 0.12 + index * 0.13 : 0, ease: [0.22, 1, 0.36, 1] }} className={`block ${index === 2 ? 'text-[#F47B20] [text-shadow:3px_3px_0_#151517,4px_4px_0_#F47B20]' : ''}`}>{line}</motion.span>)}
        </h1>
        <Entrance delay={0.35}><p className="mb-8 mt-7 max-w-[470px] text-base leading-7 text-slate-300">Arte, ciencia y tecnología en un mismo lugar.<br className="hidden lg:block" /> Somos la comunidad que imagina, investiga y crea el futuro de los medios digitales.</p></Entrance>
        <Entrance delay={0.45} className="flex flex-wrap gap-4"><ActionButton onClick={() => navigate('Proyectos')}>Explora lo que hacemos <Icon name="diagonal" /></ActionButton><button onClick={() => navigate('Nosotros')} className="group flex min-h-12 items-center gap-3 px-2 text-sm font-medium transition-colors hover:text-orange focus-visible:ring-2 focus-visible:ring-teal">Conoce el capítulo <Icon className="transition-transform motion-safe:group-hover:translate-x-1" /></button></Entrance>
        <Entrance delay={0.55}><p className="mt-10 flex items-center gap-2 font-mono text-xs text-slate-300"><Icon name="pin" className="text-[#2BB5A8]" /> UNIVERSIDAD DE SAN BUENAVENTURA · BOGOTÁ</p></Entrance>
      </motion.div>
      <motion.div initial={{ scale: live ? 0.9 : 1, rotate: live ? -4 : 0, opacity: 1 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} style={live ? { y: artY } : undefined} transition={{ duration: live ? 1.1 : 0, delay: live ? 0.15 : 0, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto h-[360px] w-full max-w-[560px] md:h-[460px]">
        <motion.div style={live ? { x: ringAx, y: ringAy } : undefined} className="absolute left-[12%] top-[8%] h-[78%] w-[76%] rounded-full border border-[#3A3A3C]" /><motion.div style={live ? { x: ringBx, y: ringBy } : undefined} className="absolute left-[19%] top-[16%] h-[62%] w-[62%] rounded-full border border-dashed border-[#3A3A3C]" />
        <div className="absolute inset-x-12 top-1/2 border-t border-[#3A3A3C]" /><div className="absolute inset-y-2 left-1/2 border-l border-[#3A3A3C]" />
        <motion.div style={live ? { x: plusX, y: plusY } : undefined} className="absolute right-0 top-0 font-mono text-xl leading-6 tracking-[.4em] text-[#2BB5A8]">+ + +<br />+ + +<br />+ + +</motion.div>
        <Bird3D />
        <span className="absolute bottom-9 right-0 border-l-2 border-[#F47B20] pl-3 font-mono text-xs leading-5 text-slate-300">CREATIVIDAD SIN LÍMITES.<br />CONEXIONES SIN FRONTERAS.</span>
        <span className="absolute left-4 top-12 font-mono text-xs text-[#2BB5A8]">FIG. 001 / COLIBRÍ</span>
        <div className="absolute bottom-2 left-14 flex gap-1">{[0,1,2,3,4,5,6].map(i => <motion.span key={i} initial={{ opacity: live ? 0 : 1, x: live ? -8 : 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: live ? 0.9 + i * 0.06 : 0 }} className="h-1 w-4 -skew-x-[35deg] bg-[#2BB5A8]" />)}</div>
      </motion.div>
    </div>
  </section>;
}
export default function App() {
  const reducedMotion = useReducedMotion();
  const [page, setPage] = useState('Inicio');
  const [menu, setMenu] = useState(false);
  const { compact, hidden, reveal } = useScrollHeader(menu);
  const [filter, setFilter] = useState('Todos');
  const [selected, setSelected] = useState<(typeof events)[number] | null>(null);
  const [project, setProject] = useState<(typeof projects)[number] | null>(null);
  const [interest, setInterest] = useState(false);
  const navigate = (next: string) => { setPage(next); setMenu(false); setFilter('Todos'); setSelected(null); setProject(null); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const button = 'inline-flex min-h-12 items-center justify-center gap-4 bg-[#F47B20] px-6 text-sm font-semibold text-black transition hover:bg-[#ffa056] focus-visible:ring-2 focus-visible:ring-white';
  const showProjects = () => <div className="grid gap-6 md:grid-cols-3">{projects.filter(p => filter === 'Todos' || p.category === filter).map((p, index) => <ProjectCard key={p.title} index={index} project={p} onSelect={() => { if (page !== 'Proyectos') navigate('Proyectos'); setProject(p); }} />)}</div>;
  return <div className="min-h-screen overflow-x-clip bg-[#151517] font-body text-white selection:bg-[#C41E5A]">
    <div className="h-1 bg-[#C41E5A]" />
    <ScrollProgress />
    {page === 'Inicio' && <SectionRail />}
    <BackToTop />
    <motion.header animate={{ y: hidden ? '-100%' : 0 }} transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }} onFocusCapture={reveal} className={`sticky top-0 z-40 border-b border-white/10 transition-colors duration-300 ${compact ? 'bg-[#151517]/85 backdrop-blur-md' : 'bg-[#151517]'}`}>
      <div className={`mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-6 transition-[min-height] duration-300 lg:px-12 ${compact ? 'min-h-16' : 'min-h-24'}`}>
        <button onClick={() => navigate('Inicio')} aria-label="SIGGRAPH San Buena, inicio" className="flex min-h-11 items-center gap-2"><Bird small /><span className="text-left"><strong className="block text-xl font-black tracking-[.06em]">SIGGRAPH<span className="text-[#F47B20]">.</span></strong><span className="block font-mono text-xs tracking-[.24em] text-slate-300">SAN BUENA / BOGOTÁ</span></span></button>
        <nav aria-label="Navegación principal" className="hidden items-center gap-6 lg:flex">{sections.map(s => <button key={s} onClick={() => navigate(s)} aria-current={page === s ? 'page' : undefined} className={`relative text-sm transition-[color,min-height] duration-300 hover:text-[#F47B20] ${compact ? 'min-h-16' : 'min-h-24'} ${page === s ? 'text-[#F47B20]' : 'text-slate-300'}`}>{s}{page === s && <motion.span layoutId="nav-underline" transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 38 }} className="absolute inset-x-0 bottom-0 h-0.5 bg-[#F47B20]" />}</button>)}</nav>
        <ActionButton variant="outline" onClick={() => navigate('Comunidad')} className="hidden gap-3 px-4 xl:flex">Únete al capítulo <Icon name="diagonal" /></ActionButton>
        <button aria-label="Abrir navegación" aria-expanded={menu} onClick={() => setMenu(!menu)} className="flex min-h-11 min-w-11 items-center justify-center lg:hidden"><Icon name="menu" /></button>
      </div>
      {menu && <motion.nav initial={{ y: reducedMotion ? 0 : -8, opacity: 1 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.2 }} aria-label="Navegación móvil" className="grid border-t border-white/10 px-6 pb-4 lg:hidden">{sections.map(s => <button onClick={() => navigate(s)} key={s} className="min-h-11 text-left text-sm transition-colors hover:text-orange focus-visible:ring-2 focus-visible:ring-teal">{s}</button>)}</motion.nav>}
    </motion.header>
    <motion.main key={page} initial={{ y: reducedMotion ? 0 : 14, opacity: 1 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}>
      {page === 'Inicio' ? <>
        <Hero navigate={navigate} />
        <div className="border-b border-white/10 bg-[#101012]"><ScrollMarquee items={['COMPUTACIÓN GRÁFICA', 'ANIMACIÓN & VFX', 'ARTE DIGITAL', 'VIDEOJUEGOS', 'REALIDADES EXTENDIDAS']} /></div>
        <section id="radar" className="mx-auto max-w-[1320px] scroll-mt-24 px-6 py-16 lg:px-12">
          <SectionHeading label="01 / ENCUÉNTRATE CON NUEVAS IDEAS" title="LO PRÓXIMO EN EL RADAR" action="Todos los eventos" onClick={() => navigate('Eventos')} />
          <Entrance delay={0.1} className="grid border border-[#3A3A3C] bg-[#1b1b1e] md:grid-cols-[.9fr_1.1fr]">
            <div className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-[#202725] p-8">
              <ScrollFX className="absolute -right-8 -top-12 h-80 w-80 rotate-[25deg] border-[35px] border-[#2BB5A8]/20" rotate={[-30, 30]} y={[30, -30]} /><ScrollFX className="absolute -right-4 top-3 h-72 w-72 rotate-[25deg] border border-[#2BB5A8]" rotate={[30, -30]} y={[-20, 20]} />
              <span className="relative font-mono text-xs tracking-widest text-[#86D9CB]">APRENDE. EXPERIMENTA. CREA.</span>
              <div className="relative border-l-[5px] border-[#F47B20] pl-5"><p className="mb-1 font-display text-[35px] leading-tight lg:text-[44px]">MASTER<br /><span className="text-[#F47B20]">CLASS_</span></p><p className="mt-3 font-mono text-xs tracking-[.22em]">DEL CONCEPTO AL MUNDO 3D</p></div>
            </div>
            <div className="p-7 lg:p-9"><span className="border border-[#2BB5A8] px-2 py-1 font-mono text-xs text-[#72D6C7]">PRÓXIMO EVENTO</span><h3 className="mb-5 mt-5 text-2xl font-semibold leading-snug">{events[0].title}</h3><div className="mb-6 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300"><span className="flex items-center gap-2"><Icon name="calendar" className="text-[#F47B20]" />24 de octubre · 4:00 p. m.</span><span className="flex items-center gap-2"><Icon name="pin" className="text-[#F47B20]" />Campus Bogotá</span></div><button onClick={() => { navigate('Eventos'); setSelected(events[0]); }} className="flex min-h-11 items-center gap-6 text-sm font-semibold text-[#F47B20]">Conoce el evento <Icon /></button></div>
          </Entrance>
        </section>
        <section id="somos" className="scroll-mt-24 border-y border-white/10 bg-[#111113]"><div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-14 md:grid-cols-[.7fr_1.3fr] lg:px-12"><Entrance from="left"><p className="mb-3 font-mono text-xs tracking-widest text-[#F47B20]">02 / SOMOS USBBOG</p><h2 className="font-display text-3xl leading-snug">CONECTAMOS<br />MENTES CREATIVAS<span className="text-[#2BB5A8]">.</span></h2></Entrance><div><ScrollWords className="max-w-2xl text-lg leading-8" text="Somos el capítulo estudiantil ACM SIGGRAPH de la Universidad de San Buenaventura Bogotá. Un punto de encuentro para quienes ven en la tecnología una herramienta para crear, investigar y transformar." /><button onClick={() => navigate('Nosotros')} className="group mt-5 flex min-h-11 items-center gap-4 text-sm text-[#F47B20]">Esta es nuestra historia <Icon className="transition-transform motion-safe:group-hover:translate-x-1" /></button></div></div></section>
        <section id="proyectos" className="mx-auto max-w-[1320px] scroll-mt-24 px-6 py-16 lg:px-12"><SectionHeading label="03 / HECHO EN NUESTRA COMUNIDAD" title="IDEAS QUE YA SON REALIDAD" action="Explorar proyectos" onClick={() => navigate('Proyectos')} />{showProjects()}</section>
        <section id="investigar" className="mx-auto grid max-w-[1320px] scroll-mt-24 gap-12 px-6 pb-16 md:grid-cols-2 lg:px-12">
          <div><SectionHeading label="04 / CURIOSIDAD EN MOVIMIENTO" title="INVESTIGAR ES CREAR" /><p className="mb-5 leading-7 text-slate-300">Exploramos la intersección entre computación, diseño y experiencias humanas. Descubre nuestras líneas y semilleros de investigación.</p>{['Interacción humano–computador', 'Computación gráfica y medios inmersivos'].map((s,i) => <Entrance key={s} delay={i * 0.1}><button onClick={() => navigate('Investigación')} className="group flex min-h-16 w-full items-center justify-between gap-4 border-t border-white/15 text-left text-sm transition-all duration-300 hover:bg-white/[.04] hover:px-3 hover:text-[#F47B20]"><span><span className="mr-4 font-mono text-[#2BB5A8]">0{i+1}</span>{s}</span><Icon name="diagonal" className="transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" /></button></Entrance>)}</div>
          <div><SectionHeading label="05 / CONOCIMIENTO QUE SE COMPARTE" title="DESDE EL CAPÍTULO" />{['Del boceto al render: un proceso creativo', 'Lo que nos inspira de ACM SIGGRAPH 2025'].map((s,i) => <Entrance key={s} delay={i * 0.1}><button onClick={() => navigate('Recursos')} className="group flex min-h-24 w-full items-center justify-between gap-4 border-t border-white/15 text-left transition-all duration-300 hover:bg-white/[.04] hover:px-3"><div><span className="font-mono text-xs text-[#F47B20]">{i ? 'RESEÑA / COMUNIDAD' : 'ARTÍCULO / PROCESOS'}</span><h3 className="mt-2 font-semibold transition-colors group-hover:text-[#F47B20]">{s}</h3></div><Icon name="diagonal" className="transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" /></button></Entrance>)}</div>
        </section>
      </> : <section className="mx-auto min-h-[65vh] max-w-[1320px] px-6 py-14 lg:px-12">
        <p className="mb-5 font-mono text-xs tracking-widest text-[#2BB5A8]">SIGGRAPH SAN BUENA / {page.toUpperCase()}</p>
        <h1 className="mb-5 font-display text-4xl text-[#F47B20] md:text-5xl">{page === 'Comunidad' ? 'EL FUTURO SE CREA EN COMUNIDAD.' : page.toUpperCase()}</h1>
        <p className="mb-10 max-w-2xl leading-7 text-slate-300">{({ Nosotros: 'Un espacio para aprender juntos, hacer preguntas y llevar las ideas más lejos.', Eventos: 'Encuentros para compartir conocimiento, experimentar y conectar.', Investigación: 'Nuevas preguntas. Nuevas herramientas. Otras formas de entender el mundo.', Proyectos: 'Una selección de exploraciones creativas de nuestra comunidad.', Recursos: 'Conocimiento abierto para acompañar tu siguiente idea.', Comunidad: 'No importa si estás empezando o ya tienes un recorrido: aquí hay un lugar para tu curiosidad.' } as Record<string,string>)[page]}</p>
        {page === 'Eventos' && (selected ? <div className="max-w-3xl border border-[#3A3A3C] p-7 md:p-10"><button className="mb-7 min-h-11 text-sm text-[#64D4C4]" onClick={() => setSelected(null)}>← Volver a eventos</button><p className="font-mono text-sm text-[#F47B20]">{selected.type.toUpperCase()}</p><h2 className="my-5 text-3xl font-semibold">{selected.title}</h2><p className="mb-6 leading-7 text-slate-300">{selected.description}</p><p className="mb-3 flex gap-3"><Icon name="calendar" />{selected.date} {selected.month} · {selected.time}</p><p className="mb-8 flex gap-3"><Icon name="pin" />{selected.place}</p><h3 className="mb-3 text-lg font-semibold">Agenda propuesta</h3><p className="mb-6 leading-7 text-slate-300">Bienvenida al capítulo · Sesión principal · Preguntas y conversación abierta.</p><p className="border-l-2 border-[#F47B20] pl-4 text-sm leading-6 text-slate-300">Evento de muestra. La fecha, los invitados y las inscripciones están pendientes de confirmación oficial.</p></div> : <><div role="tablist" aria-label="Tipo de evento" className="mb-8 flex flex-wrap gap-3">{['Todos', 'Masterclass', 'Conversatorio', 'Taller'].map(f => <button key={f} role="tab" aria-selected={filter === f} onClick={() => setFilter(f)} className={`min-h-11 border px-5 text-sm ${filter === f ? 'border-[#F47B20] bg-[#F47B20] text-black' : 'border-[#444] text-slate-300'}`}>{f}</button>)}</div>{events.filter(e => filter === 'Todos' || e.type === filter).map((e, i) => <Entrance key={e.title} delay={i * 0.08}><button onClick={() => setSelected(e)} className="group mb-4 flex min-h-32 w-full items-center gap-6 border border-[#3A3A3C] p-5 text-left transition-colors duration-300 hover:border-[#2BB5A8] hover:bg-white/[.03]"><span className="border-r border-[#444] pr-5 text-center font-mono"><strong className="block text-3xl text-[#F47B20]">{e.date}</strong><span className="text-sm">{e.month}</span></span><span className="flex-1"><span className="text-xs text-[#65CEBF]">{e.type}</span><strong className="my-2 block text-lg">{e.title}</strong><span className="text-sm text-slate-300">{e.time} · {e.place}</span></span><Icon name="diagonal" className="transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" /></button></Entrance>)}<p className="mt-5 text-sm text-slate-300">Programación ilustrativa, pendiente de confirmación por el capítulo.</p></>)}
        {page === 'Proyectos' && <>{project ? <div className="max-w-3xl"><button onClick={() => setProject(null)} className="mb-5 min-h-11 text-sm text-[#64D4C4]">← Volver a proyectos</button><Art kind={project.kind} /><h2 className="my-6 text-3xl font-semibold">{project.title}</h2><p className="leading-7 text-slate-300">{project.description}</p><p className="mt-5 text-sm text-[#F47B20]">Concepto de muestra · {project.category}</p></div> : <><div className="mb-8 flex flex-wrap gap-3">{['Todos', ...projects.map(p => p.category)].map(f => <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)} className={`min-h-11 border px-4 text-sm ${filter === f ? 'border-[#F47B20] text-[#F47B20]' : 'border-[#444] text-slate-300'}`}>{f}</button>)}</div>{showProjects()}</>}</>}
        {page === 'Nosotros' && <div className="grid gap-6 md:grid-cols-2">{[{title:'¿Qué es SIGGRAPH USBBOG?',text:'Un capítulo estudiantil que conecta el arte y la ciencia de la computación gráfica dentro de la Universidad de San Buenaventura Bogotá.'},{title:'Nuestra misión',text:'Impulsar el aprendizaje colaborativo, la investigación y la creación de experiencias digitales con sentido.'},{title:'Nuestra visión',text:'Construir una comunidad interdisciplinar que conecte el talento local con la conversación global sobre medios digitales.'},{title:'Las personas detrás de las ideas',text:'Estudiantes, docentes, asesores y voluntarios hacen posible este espacio. El directorio del equipo y la historia del capítulo se publicarán con información oficial.'}].map((item, i) => <Entrance key={item.title} delay={i * 0.08} className="h-full"><article className="h-full border border-[#3A3A3C] p-8 transition-colors duration-300 hover:border-[#2BB5A8]"><h2 className="mb-4 text-xl font-semibold text-[#F47B20]">{item.title}</h2><p className="leading-7 text-slate-300">{item.text}</p></article></Entrance>)}</div>}
        {page === 'Investigación' && <div className="grid gap-6 md:grid-cols-2">{['Computación gráfica y visualización', 'Interacción humano–computador', 'Medios inmersivos y realidades extendidas', 'IA aplicada a procesos creativos'].map((s,i) => <Entrance key={s} delay={i * 0.08} className="h-full"><article className="h-full border border-[#3A3A3C] p-8 transition-colors duration-300 hover:border-[#2BB5A8]"><span className="font-mono text-sm text-[#2BB5A8]">LÍNEA / 0{i+1}</span><h2 className="my-5 text-xl font-semibold">{s}</h2><p className="leading-7 text-slate-300">Un espacio de exploración interdisciplinar para desarrollar prototipos, compartir hallazgos y conectar nuevas perspectivas.</p><p className="mt-5 text-sm text-[#F47B20]">Propuesta de línea · Información por confirmar</p></article></Entrance>)}</div>}
        {page === 'Recursos' && <div className="grid gap-5 md:grid-cols-2">{[{title:'ACM SIGGRAPH',type:'COMUNIDAD GLOBAL',url:'https://www.siggraph.org/'},{title:'Red de capítulos',type:'CAPÍTULOS Y CONEXIONES',url:'https://www.siggraph.org/chapters/'},{title:'SIGGRAPH Conferences',type:'CONFERENCIAS E INVESTIGACIÓN',url:'https://www.siggraph.org/conferences/'},{title:'Blender: documentación',type:'HERRAMIENTAS / 3D',url:'https://docs.blender.org/'}].map((r, i) => <Entrance key={r.title} delay={i * 0.08} className="h-full"><a href={r.url} target="_blank" rel="noreferrer" className="group flex h-full items-center justify-between gap-5 border border-[#444] p-8 transition-colors duration-300 hover:border-[#2BB5A8] hover:bg-white/[.03]"><div><span className="font-mono text-xs text-[#2BB5A8]">{r.type}</span><h2 className="mt-3 text-xl font-semibold">{r.title}</h2></div><Icon name="diagonal" className="transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" /></a></Entrance>)}</div>}
        {page === 'Comunidad' && <div className="grid gap-10 md:grid-cols-2"><div className="space-y-6">{['Participa en nuestros encuentros', 'Comparte tu proyecto o investigación', 'Haz parte del voluntariado'].map((s,i) => <Entrance key={s} delay={i * 0.1} from="left" className="flex gap-4 border-b border-[#444] pb-6"><span className="font-mono text-[#2BB5A8]">0{i+1}</span><div><h2 className="text-lg font-semibold">{s}</h2><p className="mt-2 text-sm leading-6 text-slate-300">Conecta con personas que comparten tu interés por el arte, la ciencia y la tecnología.</p></div></Entrance>)}</div><Entrance from="right" className="border border-[#444] bg-[#1c1c1f] p-8"><h2 className="mb-4 text-2xl font-semibold">Tu próxima idea empieza aquí.</h2><p className="mb-6 leading-7 text-slate-300">Los canales de membresía y contacto se habilitarán cuando el capítulo publique su convocatoria oficial.</p><button aria-pressed={interest} onClick={() => setInterest(!interest)} className={button}>{interest ? 'Interés marcado ✓' : 'Me interesa participar'}<Icon name="plus" /></button><p aria-live="polite" className="mt-5 text-sm leading-6 text-slate-300">{interest ? 'Has marcado tu interés en esta vista previa. No se han enviado ni guardado datos.' : 'Vista previa local. Este botón no realiza una inscripción.'}</p></Entrance></div>}
      </section>}
      <section className="border-y border-[#3A3A3C] bg-[#202022]"><div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-8 px-6 py-12 lg:px-12"><Entrance from="left"><p className="mb-3 font-mono text-xs tracking-widest text-[#2BB5A8]">TU CURIOSIDAD TIENE UN LUGAR AQUÍ.</p><h2 className="font-display text-2xl md:text-3xl">CREEMOS LO QUE SIGUE<span className="text-[#F47B20]">.</span></h2></Entrance><Entrance from="right" delay={0.1}><button onClick={() => navigate(page === 'Comunidad' ? 'Eventos' : 'Comunidad')} className={button}>{page === 'Comunidad' ? 'Explora los encuentros' : 'Sé parte de la comunidad'}<Icon name="diagonal" /></button></Entrance></div></section>
    </motion.main>
    <footer className="bg-[#101012]"><div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-8 px-6 py-10 lg:px-12"><div className="flex items-center gap-3"><Bird small /><div><strong className="text-lg tracking-wider">SIGGRAPH <span className="text-[#F47B20]">SAN BUENA</span></strong><p className="mt-1 text-xs text-slate-300">Arte + Ciencia + Tecnología. Desde Bogotá.</p></div></div><a href="https://www.siggraph.org/" target="_blank" rel="noreferrer" className="flex min-h-11 items-center gap-3 text-sm text-slate-300"><Icon name="globe" />Conectados con ACM SIGGRAPH<Icon name="diagonal" /></a></div><div className="mx-auto flex max-w-[1224px] flex-wrap justify-between gap-3 border-t border-white/10 px-6 py-5 font-mono text-xs text-slate-300"><span>© {new Date().getFullYear()} SIGGRAPH USBBOG · Universidad de San Buenaventura</span><span>DISEÑADO PARA IMAGINAR.</span></div></footer>
  </div>;
}
