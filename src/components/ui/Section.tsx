import type { ReactNode } from 'react';
import { ToneContext, type Tone } from './tone';

type Background = 'base' | 'alt' | 'paper';

const backgrounds: Record<Background, string> = {
  base: 'bg-ink-850 text-fg',
  alt: 'border-y border-line-soft bg-ink-900 text-fg',
  paper: 'bg-paper text-ink-850',
};

/**
 * Bloque de página con su contenedor y su ritmo vertical.
 * `background="paper"` crea una banda clara (ritmo claro/oscuro) y
 * avisa a los hijos para que usen colores legibles sobre claro.
 */
export default function Section({ background = 'base', id, className = '', inner = '', children, labelledBy }: {
  background?: Background;
  id?: string;
  className?: string;
  inner?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  const tone: Tone = background === 'paper' ? 'paper' : 'dark';
  return <ToneContext.Provider value={tone}>
    <section id={id} aria-labelledby={labelledBy} className={`${backgrounds[background]} ${className}`}>
      <div className={`container-site py-16 lg:py-20 ${inner}`}>{children}</div>
    </section>
  </ToneContext.Provider>;
}
