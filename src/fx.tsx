import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;
const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

/** Barra de progreso de lectura fija arriba del todo. */
export function ScrollProgress() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#C41E5A] via-[#F47B20] to-[#2BB5A8]"
    />
  );
}

/** Dirección del scroll + si ya se bajó lo suficiente: para compactar/ocultar el header. */
export function useScrollHeader(menuOpen: boolean) {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, 'change', latest => {
    const previous = scrollY.getPrevious() ?? 0;
    setCompact(latest > 60);
    if (menuOpen || latest < 240) setHidden(false);
    else if (latest > previous + 4) setHidden(true);
    else if (latest < previous - 4) setHidden(false);
  });
  return { compact, hidden: hidden && !menuOpen, reveal: () => setHidden(false) };
}

/** Mueve, rota o escala un elemento según el progreso de scroll de sí mismo. Decorativo. */
export function ScrollFX({
  className,
  y = [0, 0],
  x = [0, 0],
  rotate = [0, 0],
  scale = [1, 1],
  children,
}: {
  className?: string;
  y?: [number, number];
  x?: [number, number];
  rotate?: [number, number];
  scale?: [number, number];
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yv = useTransform(scrollYProgress, [0, 1], y);
  const xv = useTransform(scrollYProgress, [0, 1], x);
  const rv = useTransform(scrollYProgress, [0, 1], rotate);
  const sv = useTransform(scrollYProgress, [0, 1], scale);
  return (
    <motion.div ref={ref} className={className} style={reduced ? undefined : { y: yv, x: xv, rotate: rv, scale: sv }}>
      {children}
    </motion.div>
  );
}

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  // El estado "apagado" sigue siendo legible (≈4.5:1 sobre el fondo #111113).
  const color = useTransform(progress, range, ['#7a8496', '#e2e8f0']);
  return <motion.span style={{ color }}>{word}</motion.span>;
}

/** Párrafo que se "enciende" palabra por palabra mientras lo recorres con el scroll. */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'end 0.55'] });
  const words = text.split(' ');
  if (reduced) return <p className={className}>{text}</p>;
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i}>
          <Word word={word} progress={scrollYProgress} range={[i / words.length, Math.min((i + 1.6) / words.length, 1)]} />{' '}
        </span>
      ))}
    </p>
  );
}

/**
 * Cinta de temas movida por el scroll: avanza al bajar, retrocede al subir y se
 * inclina un poco con la velocidad. No se mueve sola, así que no hay nada que pausar.
 */
export function ScrollMarquee({ items }: { items: string[] }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const smooth = useSpring(scrollY, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(smooth, v => `${wrap(-25, 0, -v * 0.012)}%`);
  const velocity = useSpring(useVelocity(scrollY), { stiffness: 200, damping: 40 });
  const skewX = useTransform(velocity, [-2500, 0, 2500], [7, 0, -7], { clamp: true });
  const row = (hidden: boolean, key: number) => (
    <ul key={key} aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12">
      {items.map((s, i) => (
        <li key={s} className="flex items-center gap-5 whitespace-nowrap">
          <span className={i % 2 ? 'text-[#F47B20]' : 'text-[#2BB5A8]'}>◆</span>
          {s}
        </li>
      ))}
    </ul>
  );
  if (reduced) {
    return (
      <ul className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-6 py-5 font-mono text-xs tracking-widest text-slate-300 lg:px-12">
        {items.map((s, i) => (
          <li key={s} className="flex items-center gap-5">
            <span className={i % 2 ? 'text-[#F47B20]' : 'text-[#2BB5A8]'}>◆</span>
            {s}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="overflow-hidden py-5 font-mono text-xs tracking-widest text-slate-300">
      <motion.div style={{ x, skewX }} className="flex w-max">
        {[0, 1, 2, 3].map(i => row(i > 0, i))}
      </motion.div>
    </div>
  );
}

const rail = [
  { id: 'hero', label: 'Inicio' },
  { id: 'radar', label: 'Eventos' },
  { id: 'somos', label: 'Quiénes somos' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'investigar', label: 'Investigación' },
];

/** Puntos de navegación a la derecha: marcan la sección visible y llevan a ella. */
export function SectionRail() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0));
        const best = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        if (best && best[1] > 0) setActive(best[0]);
      },
      { rootMargin: '-35% 0px -35% 0px', threshold: [0, 0.1, 0.3, 0.6, 1] },
    );
    rail.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <nav aria-label="Secciones de la página" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ul className="flex flex-col items-end gap-1">
        {rail.map(({ id, label }) => {
          const on = active === id;
          return (
            <li key={id}>
              <button
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })}
                aria-label={`Ir a ${label}`}
                aria-current={on ? 'true' : undefined}
                className="group flex min-h-8 items-center gap-3 focus-visible:outline-none"
              >
                <span className="pointer-events-none translate-x-2 bg-[#151517] px-2 py-1 font-mono text-[10px] tracking-widest text-slate-200 opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                  {label.toUpperCase()}
                </span>
                <span className={`block transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#2BB5A8] ${on ? 'h-6 w-1.5 bg-[#F47B20]' : 'h-1.5 w-1.5 bg-[#555] group-hover:bg-[#2BB5A8]'}`} />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Botón volver arriba con anillo de progreso. */
export function BackToTop() {
  const reduced = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', v => setShow(v > 700));
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="top"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
          aria-label="Volver arriba"
          initial={{ opacity: 0, scale: reduced ? 1 : 0.6, y: reduced ? 0 : 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: reduced ? 1 : 0.6, y: reduced ? 0 : 16 }}
          transition={{ duration: reduced ? 0 : 0.3, ease }}
          whileHover={reduced ? undefined : { scale: 1.08 }}
          whileTap={reduced ? undefined : { scale: 0.94 }}
          className="fixed bottom-6 right-5 z-40 grid h-12 w-12 place-items-center bg-[#151517]/90 text-[#F47B20] backdrop-blur focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2BB5A8]"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r="22" fill="none" stroke="#3A3A3C" strokeWidth="2" />
            <motion.circle cx="24" cy="24" r="22" fill="none" stroke="#F47B20" strokeWidth="2" style={{ pathLength: scrollYProgress }} />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative h-5 w-5" aria-hidden="true">
            <path d="M12 19V5M6 11l6-6 6 6" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
