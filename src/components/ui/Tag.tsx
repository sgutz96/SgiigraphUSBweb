import type { ReactNode } from 'react';

/** Etiqueta pequeña para estados y categorías ("Evento de muestra", "Taller"). */
export default function Tag({ children, tone = 'teal' }: { children: ReactNode; tone?: 'teal' | 'orange' | 'pink' }) {
  const color = { teal: 'border-teal/60 text-teal-soft', orange: 'border-orange/60 text-orange', pink: 'border-pink/60 text-pink' }[tone];
  return <span className={`inline-flex items-center rounded-tag border px-2 py-0.5 font-mono text-xs ${color}`}>{children}</span>;
}
