import { researchLines } from '../data/content';
import Card from '../components/ui/Card';
import Tag from '../components/ui/Tag';

export default function ResearchPage() {
  return <div className="grid gap-5 md:grid-cols-2">
    {researchLines.map((line, index) => <Card as="article" key={line} className="flex flex-col p-8">
      <span className="eyebrow text-teal">Línea / 0{index + 1}</span>
      <h2 className="my-5 text-xl font-semibold">{line}</h2>
      <p className="mb-6 leading-7 text-muted">Un espacio de exploración interdisciplinar para desarrollar prototipos, compartir hallazgos y conectar nuevas perspectivas.</p>
      <div className="mt-auto"><Tag tone="orange">Propuesta · por confirmar</Tag></div>
    </Card>)}
  </div>;
}
