import { resources } from '../data/content';
import { cardClass } from '../components/ui/Card';
import Icon from '../components/Icon';

export default function ResourcesPage() {
  return <ul className="grid gap-5 md:grid-cols-2">
    {resources.map(resource => <li key={resource.title}>
      <a href={resource.url} target="_blank" rel="noreferrer" className={`group flex items-center justify-between gap-5 p-8 ${cardClass('dark', true)}`}>
        <div><span className="eyebrow text-teal">{resource.type}</span><h2 className="mt-3 text-xl font-semibold">{resource.title}</h2></div>
        <Icon name="diagonal" className="transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" />
        <span className="sr-only">(se abre en una pestaña nueva)</span>
      </a>
    </li>)}
  </ul>;
}
