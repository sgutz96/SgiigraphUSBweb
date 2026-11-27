import type { ReactNode } from 'react';
import { useTone } from './tone';

/*
 * Superficie básica. Se exporta también la clase para aplicarla a
 * <button> o <a> cuando la tarjeta entera es clicable.
 */
export const cardClass = (tone: 'dark' | 'paper' = 'dark', interactive = false) =>
  `rounded-card border ${tone === 'paper' ? 'border-paper-line bg-paper-raised text-ink-850' : 'border-line bg-ink-800'} ${
    interactive ? `focus-ring transition-colors ${tone === 'paper' ? 'hover:border-ink-850' : 'hover:border-teal hover:bg-ink-700'}` : ''
  }`;

export default function Card({ as: Tag = 'div', className = '', children }: { as?: 'div' | 'article' | 'li'; className?: string; children: ReactNode }) {
  return <Tag className={`${cardClass(useTone())} ${className}`}>{children}</Tag>;
}
