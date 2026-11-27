import { questions } from '../data/content';
import Section from './ui/Section';
import SectionHeading from './SectionHeading';
import Icon from './Icon';

/* FAQ numerado en banda clara: el patrón "¿Tienes dudas?" de AIESEC. */
export default function FrequentlyAsked() {
  return <Section background="paper" labelledBy="faq-title" inner="grid gap-10 md:grid-cols-[.8fr_1.2fr]">
    <div>
      <SectionHeading id="faq-title" label="07 / Antes de dar el salto" title="La curiosidad empieza con una pregunta." />
      <p className="-mt-4 max-w-sm leading-7 text-paper-muted">Algunas respuestas para ubicarte y encontrar tu próximo paso dentro de la comunidad.</p>
    </div>
    <div className="space-y-3">
      {questions.map((item, index) => <details key={item.question} className="group rounded-card border border-paper-line bg-paper-raised transition-colors open:border-ink-850/40">
        <summary className="focus-ring flex min-h-20 cursor-pointer list-none items-center gap-5 rounded-card px-6 py-5 font-semibold [&::-webkit-details-marker]:hidden">
          <span className="font-display text-2xl font-extrabold text-teal-ink">0{index + 1}</span>
          <span className="flex-1">{item.question}</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-850 text-fg transition-transform motion-safe:group-open:rotate-45"><Icon name="plus" className="h-4 w-4" /></span>
        </summary>
        <p className="pb-6 pl-[4.25rem] pr-6 text-sm leading-7 text-paper-muted">{item.answer}</p>
      </details>)}
    </div>
  </Section>;
}
