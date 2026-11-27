import { useReducedMotion } from 'motion/react';
import { interests } from '../data/content';

/* Cinta de áreas en movimiento continuo; estática si se pide menos movimiento. */
export default function InterestsStrip() {
  const reducedMotion = useReducedMotion();
  const items = reducedMotion ? interests : [...interests, ...interests];
  return <div className="overflow-hidden border-b border-line-soft bg-ink-900 py-5">
    <ul aria-label="Áreas del capítulo" className={`flex items-center ${reducedMotion ? 'flex-wrap justify-center gap-y-3 px-6' : 'w-max animate-marquee hover:[animation-play-state:paused]'}`}>
      {items.map((item, index) => <li key={`${item}-${index}`} aria-hidden={index >= interests.length || undefined} className="eyebrow flex shrink-0 items-center gap-4 pr-12 text-muted">
        <span className={index % 2 ? 'text-orange' : 'text-teal'}>◆</span>{item}
      </li>)}
    </ul>
  </div>;
}
