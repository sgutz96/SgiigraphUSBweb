import type { Navigate, Page } from '../data/content';
import Entrance from './Entrance';
import SectionHeading from './SectionHeading';
import Section from './ui/Section';
import { cardClass } from './ui/Card';
import Icon from './Icon';

const routes: { title: string; text: string; target: Page; label: string; accent: string; bar: string }[] = [
  { title: 'Aprender', text: 'Talleres, masterclasses y recursos para dar tu siguiente paso.', target: 'Recursos', label: 'Explorar recursos', accent: 'text-orange', bar: 'bg-orange' },
  { title: 'Crear', text: 'Del primer boceto al prototipo: explora otras formas de contar.', target: 'Proyectos', label: 'Descubrir proyectos', accent: 'text-teal', bar: 'bg-teal' },
  { title: 'Investigar', text: 'Haz nuevas preguntas en la intersección del arte y la tecnología.', target: 'Investigación', label: 'Conocer las líneas', accent: 'text-pink', bar: 'bg-pink' },
  { title: 'Conectar', text: 'Encuentra personas con quienes aprender y compartir ideas.', target: 'Comunidad', label: 'Conocer la comunidad', accent: 'text-peach', bar: 'bg-peach' },
];

export default function ExploreRoutes({ navigate }: { navigate: Navigate }) {
  return <Section labelledBy="rutas-title">
    <SectionHeading id="rutas-title" label="Tu punto de partida" title="¿Qué quieres hacer hoy?" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{routes.map((route, index) => <Entrance key={route.title} delay={index * 0.08} className="h-full">
      <button type="button" onClick={() => navigate(route.target)} className={`group relative flex h-full min-h-64 w-full flex-col items-start overflow-hidden p-6 text-left ${cardClass('dark', true)}`}>
        <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${route.bar}`} />
        <span className={`eyebrow mb-7 flex w-full items-center justify-between ${route.accent}`}><span>Ruta / 0{index + 1}</span><Icon name="diagonal" /></span>
        <h3 className="mb-3 font-display text-4xl font-bold uppercase">{route.title}</h3>
        <p className="mb-6 text-sm leading-6 text-muted">{route.text}</p>
        <span className={`mt-auto flex items-center gap-3 text-sm font-semibold ${route.accent}`}>{route.label}<Icon className="transition-transform motion-safe:group-hover:translate-x-1" /></span>
      </button>
    </Entrance>)}</div>
  </Section>;
}
