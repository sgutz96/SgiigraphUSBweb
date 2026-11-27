import { createContext, useContext } from 'react';

/*
 * Tono de la sección actual. Los componentes leen el tono para
 * elegir colores legibles: el naranja de marca no tiene contraste
 * suficiente sobre fondo claro, así que en "paper" se usa orange-ink.
 */
export type Tone = 'dark' | 'paper';
export const ToneContext = createContext<Tone>('dark');
export const useTone = () => useContext(ToneContext);

export const toneText = {
  dark: { accent: 'text-orange', accentAlt: 'text-teal', muted: 'text-muted', line: 'border-line' },
  paper: { accent: 'text-orange-ink', accentAlt: 'text-teal-ink', muted: 'text-paper-muted', line: 'border-paper-line' },
} as const;
