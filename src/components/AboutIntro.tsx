import { stats, type Navigate } from '../data/content';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';
import Entrance from './Entrance';
import Icon from './Icon';

/*
 * "Somos USBBOG" + banda de cifras, inspirada en la franja de
 * números grandes de AIESEC. Las cifras salen de content.ts
 * (no son inventadas): cambian solas si cambia el contenido.
 */
export default function AboutIntro({ navigate }: { navigate: Navigate }) {
  const colors = ['text-orange', 'text-teal', 'text-pink', 'text-peach'];
  return <Section background="alt" labelledBy="somos-title">
    <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr]">
      <div>
        <Eyebrow className="mb-3">02 / Somos USBBOG</Eyebrow>
        <h2 id="somos-title" className="font-display text-3xl font-bold uppercase leading-[1.05] md:text-[2.75rem]">Conectamos<br />mentes creativas<span className="text-teal">.</span></h2>
      </div>
      <div>
        <p className="max-w-2xl text-lg leading-8 text-muted">Somos el capítulo estudiantil ACM SIGGRAPH de la Universidad de San Buenaventura Bogotá. Un punto de encuentro para quienes ven en la tecnología una herramienta para crear, investigar y transformar.</p>
        <button type="button" onClick={() => navigate('Nosotros')} className="focus-ring group mt-5 inline-flex min-h-11 items-center gap-3 rounded-tag text-sm font-semibold text-orange">Esta es nuestra historia <Icon className="transition-transform motion-safe:group-hover:translate-x-1" /></button>
      </div>
    </div>
    <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-line bg-line lg:grid-cols-4">
      {stats.map((stat, index) => <Entrance key={stat.label} delay={index * 0.08} className="flex flex-col-reverse justify-end bg-ink-900 p-6 lg:p-8">
        <dt className="mt-3 text-sm leading-6 text-muted">{stat.label}</dt>
        <dd className={`font-display text-6xl font-extrabold leading-none lg:text-7xl ${colors[index]}`}>{String(stat.value).padStart(2, '0')}</dd>
      </Entrance>)}
    </dl>
  </Section>;
}
