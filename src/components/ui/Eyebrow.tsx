import type { ReactNode } from 'react';
import { toneText, useTone } from './tone';

/** Etiqueta mono que encabeza secciones. `alt` usa el color secundario (teal). */
export default function Eyebrow({ children, alt = false, className = '' }: { children: ReactNode; alt?: boolean; className?: string }) {
  const t = toneText[useTone()];
  return <p className={`eyebrow ${alt ? t.accentAlt : t.accent} ${className}`}>{children}</p>;
}
