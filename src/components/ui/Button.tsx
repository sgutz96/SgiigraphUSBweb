import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';
import { useTone } from './tone';

type Variant = 'solid' | 'outline' | 'quiet';
type Size = 'md' | 'sm';

const base = 'focus-ring inline-flex items-center justify-center gap-3 rounded-control font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60';
const sizes: Record<Size, string> = { md: 'min-h-12 px-6 text-sm', sm: 'min-h-11 px-4 text-sm' };
const variants = {
  dark: {
    solid: 'bg-orange text-ink-950 hover:bg-orange-hover',
    outline: 'border border-orange text-orange hover:bg-orange/10',
    quiet: 'px-2 text-fg hover:text-orange',
  },
  paper: {
    solid: 'bg-ink-850 text-fg hover:bg-ink-700',
    outline: 'border border-ink-850 text-ink-850 hover:bg-ink-850/5',
    quiet: 'px-2 text-ink-850 hover:text-orange-ink',
  },
} as const;

export const buttonClass = (variant: Variant = 'solid', size: Size = 'md', tone: 'dark' | 'paper' = 'dark') =>
  `${base} ${sizes[size]} ${variants[tone][variant]}`;

type Common = { variant?: Variant; size?: Size; className?: string };

/** Botón de acción. Usa `href` para que se renderice como enlace. */
export default function Button({ variant = 'solid', size = 'md', className = '', href, ...props }:
  Common & (({ href?: undefined } & HTMLMotionProps<'button'>) | ({ href: string } & HTMLMotionProps<'a'>))) {
  const reducedMotion = useReducedMotion();
  const tone = useTone();
  const motionProps = {
    whileHover: reducedMotion || variant === 'quiet' ? undefined : { y: -2 },
    whileTap: reducedMotion ? undefined : { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
    className: `group ${buttonClass(variant, size, tone)} ${className}`,
  };
  if (href) {
    const external = /^https?:/.test(href);
    return <motion.a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})} {...motionProps} {...(props as HTMLMotionProps<'a'>)} />;
  }
  return <motion.button type="button" {...motionProps} {...(props as HTMLMotionProps<'button'>)} />;
}
