import { researchLines, type Navigate } from '../data/content';
import SectionHeading from './SectionHeading';
import Section from './ui/Section';
import Icon from './Icon';

const rowClass = 'focus-ring group flex w-full items-center justify-between gap-4 rounded-tag border-t border-line-soft text-left transition-colors hover:text-orange';

export default function KnowledgeHighlights({ navigate }: { navigate: Navigate }) {
  return <Section labelledBy="investigar-title" inner="grid gap-12 md:grid-cols-2">
    <div>
      <SectionHeading id="investigar-title" label="04 / Curiosidad en movimiento" title="Investigar es crear" />
      <p className="-mt-4 mb-6 leading-7 text-muted">Exploramos la intersección entre computación, diseño y experiencias humanas. Descubre nuestras líneas y semilleros de investigación.</p>
      {researchLines.slice(0, 2).map((line, index) => <button key={line} type="button" onClick={() => navigate('Investigación')} className={`${rowClass} min-h-16 text-sm`}>
        <span><span className="mr-4 font-mono text-teal">0{index + 1}</span>{line}</span><Icon name="diagonal" className="transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
      </button>)}
    </div>
    <div>
      <SectionHeading label="05 / Conocimiento que se comparte" title="Desde el capítulo" />
      {[{ title: 'Del boceto al render: un proceso creativo', kind: 'Artículo / Procesos' }, { title: 'Lo que nos inspira de ACM SIGGRAPH 2025', kind: 'Reseña / Comunidad' }].map(post => <button key={post.title} type="button" onClick={() => navigate('Recursos')} className={`${rowClass} min-h-24`}>
        <div><span className="eyebrow text-orange">{post.kind}</span><h3 className="mt-2 font-semibold">{post.title}</h3></div><Icon name="diagonal" />
      </button>)}
    </div>
  </Section>;
}
