import type { Navigate, Page } from '../data/content';
import Bird from './Bird';
import Icon from './Icon';

const groups: { title: string; links: Page[] }[] = [
  { title: 'Explora', links: ['Nosotros', 'Eventos', 'Investigación', 'Proyectos'] },
  { title: 'Participa', links: ['Comunidad', 'Recursos', 'Sistema'] },
];
const label = (page: Page) => (page === 'Sistema' ? 'Sistema de diseño' : page);

export default function SiteFooter({ navigate }: { navigate: Navigate }) {
  return <footer className="bg-ink-950">
    <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
      <div>
        <div className="mb-5 flex items-center gap-3"><Bird small /><div><strong className="block text-lg tracking-wide">SIGGRAPH</strong><span className="eyebrow text-orange">San Buena / Bogotá</span></div></div>
        <p className="max-w-xs text-sm leading-7 text-muted">Arte, ciencia y tecnología.<br />Una comunidad para imaginar y crear otras dimensiones.</p>
      </div>
      {groups.map(group => <nav key={group.title} aria-label={group.title}>
        <h2 className="eyebrow mb-4 text-teal">{group.title}</h2>
        <ul>{group.links.map(link => <li key={link}><button type="button" onClick={() => navigate(link)} className="focus-ring block min-h-11 rounded-tag text-sm text-muted transition-colors hover:text-orange">{label(link)}</button></li>)}</ul>
      </nav>)}
      <div>
        <h2 className="eyebrow mb-5 text-teal">Desde Bogotá al mundo</h2>
        <p className="mb-4 text-sm leading-7 text-muted">Universidad de San Buenaventura<br />Bogotá, Colombia</p>
        <a href="https://www.siggraph.org/" target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-tag text-sm text-orange hover:text-fg">Explora ACM SIGGRAPH<Icon name="diagonal" /></a>
        <p className="mt-4 text-xs leading-6 text-subtle">Contacto del capítulo: pendiente de publicación oficial.</p>
      </div>
    </div>
    <div className="container-site"><div className="flex flex-wrap justify-between gap-3 border-t border-line py-6 text-xs leading-6 text-subtle">
      <span>© {new Date().getFullYear()} SIGGRAPH USBBOG · Vista previa con contenido de muestra.</span>
      <span className="eyebrow">Diseñado para imaginar.</span>
    </div></div>
  </footer>;
}
