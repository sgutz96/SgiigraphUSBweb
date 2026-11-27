import { slugify, type Navigate } from '../data/content';
import SectionHeading from './SectionHeading';
import ProjectGrid from './ProjectGrid';
import Section from './ui/Section';

export default function FeaturedProjects({ navigate }: { navigate: Navigate }) {
  return <Section labelledBy="proyectos-title">
    <SectionHeading id="proyectos-title" label="03 / Un vistazo a lo posible" title="De la idea a la experiencia." action="Explorar proyectos" onClick={() => navigate('Proyectos')} />
    <p className="-mt-4 mb-8 max-w-2xl text-sm leading-7 text-muted">Exploraciones visuales de muestra. Las fichas con autores, procesos, herramientas y resultados se incorporarán con los proyectos verificados del capítulo.</p>
    <ProjectGrid onSelect={project => navigate('Proyectos', slugify(project.title))} />
  </Section>;
}
