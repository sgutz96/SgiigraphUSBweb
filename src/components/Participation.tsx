import type { Navigate, Page } from '../data/content';
import Entrance from './Entrance';
import SectionHeading from './SectionHeading';
import Section from './ui/Section';
import Icon from './Icon';

const steps: { title: string; text: string; target: Page; action: string }[] = [
  { title: 'Conoce el capítulo', text: 'Descubre qué nos mueve y cómo se encuentran aquí el arte, la ciencia y la tecnología.', target: 'Nosotros', action: 'Quiénes somos' },
  { title: 'Encuentra un encuentro', text: 'Explora los formatos de nuestras actividades. Consulta la confirmación antes de planear tu visita.', target: 'Eventos', action: 'Explorar la agenda' },
  { title: 'Encuentra dónde aportar', text: 'Creación, investigación o voluntariado: conoce las formas de involucrarte en la comunidad.', target: 'Comunidad', action: 'Cómo participar' },
];

export default function Participation({ navigate }: { navigate: Navigate }) {
  return <Section background="alt" labelledBy="pasos-title">
    <SectionHeading id="pasos-title" label="06 / Tu próximo paso" title="No tienes que crear en solitario." />
    <p className="-mt-4 mb-12 max-w-2xl leading-7 text-muted">Estudiantes, docentes y personas curiosas: distintas perspectivas para imaginar lo que sigue. Empieza por conocer el capítulo, sin necesidad de tener una idea terminada.</p>
    <ol className="grid gap-10 md:grid-cols-3">{steps.map((step, index) => <Entrance as="li" key={step.title} delay={index * 0.1}>
        <div className="mb-6 flex items-center gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-teal font-mono text-sm text-teal">0{index + 1}</span><span aria-hidden="true" className="h-px flex-1 bg-line" /></div>
        <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
        <p className="mb-4 text-sm leading-7 text-muted">{step.text}</p>
        <button type="button" onClick={() => navigate(step.target)} className="focus-ring group flex min-h-11 items-center gap-3 rounded-tag text-sm font-semibold text-orange hover:text-fg">{step.action}<Icon className="transition-transform motion-safe:group-hover:translate-x-1" /></button>
    </Entrance>)}</ol>
  </Section>;
}
