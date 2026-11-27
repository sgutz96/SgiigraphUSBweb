import { lazy, Suspense } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Navigate } from '../data/content';
import Entrance from './Entrance';
import Button from './ui/Button';
import Icon from './Icon';
import Bird from './Bird';

// three.js pesa ~600 kB: se carga aparte para que el texto del hero aparezca de inmediato.
const Bird3D = lazy(() => import('./Bird3D'));

export default function Hero({ navigate }: { navigate: Navigate }) {
  const reducedMotion = useReducedMotion();
  return <section className="relative overflow-hidden border-b border-line-soft" aria-labelledby="hero-title">
    {/* Halo de color detrás del colibrí */}
    <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgb(43_181_168/0.16),transparent_65%)]" />
    <div aria-hidden="true" className="absolute bottom-16 left-0 top-14 w-1.5 rounded-r-full bg-magenta" />

    <div className="container-site relative grid items-center pb-14 pt-12 md:grid-cols-[1.05fr_1fr] lg:pb-20 lg:pt-16">
      <div className="relative z-20 min-w-0">
        <Entrance><p className="eyebrow mb-6 inline-flex items-center gap-2 rounded-control border border-line px-3 py-1 text-teal-soft"><span className="h-1.5 w-1.5 rounded-full bg-teal motion-safe:animate-pulse" />Capítulo estudiantil ACM SIGGRAPH</p></Entrance>
        <h1 id="hero-title" className="font-display text-[46px] font-bold uppercase leading-[1.02] tracking-[-.01em] sm:text-[64px] lg:text-[80px]">
          {['Donde las', 'ideas cobran', 'otra dimensión.'].map((line, index) => <motion.span
            key={line}
            initial={{ x: reducedMotion ? 0 : -24 }}
            animate={{ x: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.7, delay: reducedMotion ? 0 : 0.12 + index * 0.13, ease: [0.22, 1, 0.36, 1] }}
            className={`block ${index === 2 ? 'text-orange [text-shadow:3px_3px_0_var(--color-ink-850),5px_5px_0_var(--color-magenta)]' : ''}`}
          >{line}</motion.span>)}
        </h1>
        <Entrance delay={0.35}><p className="mb-9 mt-7 max-w-[520px] text-lg leading-8 text-muted">La comunidad de computación gráfica, arte digital y tecnologías interactivas de la Universidad de San Buenaventura Bogotá. <span className="font-semibold text-fg">Aprende, investiga y crea con nosotros.</span></p></Entrance>
        <Entrance delay={0.45} className="flex flex-wrap items-center gap-3">
          <Button onClick={() => navigate('Comunidad')}>Quiero participar <Icon name="diagonal" /></Button>
          <Button variant="quiet" onClick={() => navigate('Proyectos')}>Explorar proyectos <Icon className="transition-transform motion-safe:group-hover:translate-x-1" /></Button>
        </Entrance>
        <Entrance delay={0.55}><p className="eyebrow mt-10 flex items-center gap-2 text-muted"><Icon name="pin" className="text-teal" /> Universidad de San Buenaventura · Bogotá</p></Entrance>
      </div>

      <motion.div
        initial={{ scale: reducedMotion ? 1 : 0.9, rotate: reducedMotion ? 0 : -4 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: reducedMotion ? 0 : 1.1, delay: reducedMotion ? 0 : 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-10 h-[340px] w-full max-w-[560px] md:mt-0 md:h-[480px]"
      >
        <div aria-hidden="true" className="absolute left-[12%] top-[8%] h-[78%] w-[76%] rounded-full border border-line" />
        <div aria-hidden="true" className="absolute left-[19%] top-[16%] h-[62%] w-[62%] rounded-full border border-dashed border-line" />
        <div aria-hidden="true" className="absolute inset-x-12 top-1/2 border-t border-line" />
        <div aria-hidden="true" className="absolute inset-y-2 left-1/2 border-l border-line" />
        <div aria-hidden="true" className="absolute right-0 top-0 font-mono text-xl leading-6 tracking-[.4em] text-teal">+ + +<br />+ + +<br />+ + +</div>
        <Suspense fallback={<div className="relative z-10 h-full w-full p-10"><Bird /></div>}><Bird3D /></Suspense>
        <span className="absolute bottom-9 right-0 border-l-2 border-orange pl-3 font-mono text-xs leading-5 text-muted">CREATIVIDAD SIN LÍMITES.<br />CONEXIONES SIN FRONTERAS.</span>
        <span aria-hidden="true" className="eyebrow absolute left-4 top-12 text-teal">Fig. 001 / Colibrí</span>
      </motion.div>
    </div>
  </section>;
}
