import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/*
 * Aparición suave al entrar en pantalla. No usa opacity: 0 a propósito,
 * para que el contenido nunca quede invisible si falla la animación.
 * `as="li"` permite usarlo directamente dentro de <ul>/<ol>.
 */
export default function Entrance({ delay = 0, className, children, as = 'div' }: { delay?: number; className?: string; children: ReactNode; as?: 'div' | 'li' }) {
  const reducedMotion = useReducedMotion();
  const Tag = as === 'li' ? motion.li : motion.div;
  return <Tag
    initial={{ y: reducedMotion ? 0 : 28 }}
    whileInView={{ y: 0 }}
    viewport={{ once: true, amount: 0.12 }}
    transition={{ duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >{children}</Tag>;
}
