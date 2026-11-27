import Entrance from './Entrance';
import Icon from './Icon';
import Eyebrow from './ui/Eyebrow';
import { useTone } from './ui/tone';

/** Encabezado de sección: eyebrow + título + acción opcional a la derecha. */
export default function SectionHeading({ label, title, action, onClick, id }: { label: string; title: string; action?: string; onClick?: () => void; id?: string }) {
  const tone = useTone();
  return <Entrance className="mb-10 flex flex-wrap items-end justify-between gap-5">
    <div className="max-w-3xl">
      <Eyebrow className="mb-3">{label}</Eyebrow>
      <h2 id={id} className="font-display text-3xl font-bold uppercase leading-[1.05] md:text-[2.75rem]">{title}</h2>
    </div>
    {action && <button type="button" onClick={onClick} className={`focus-ring group flex min-h-11 items-center gap-3 border-b text-sm font-medium ${tone === 'paper' ? 'border-ink-850/30 hover:text-orange-ink' : 'border-line hover:border-orange hover:text-orange'}`}>
      {action}<Icon className="transition-transform motion-safe:group-hover:translate-x-1" />
    </button>}
  </Entrance>;
}
