import { projects, type Project } from '../data/content';
import ProjectCard from './ProjectCard';

type Props = { filter?: string; onSelect: (project: Project) => void };
export default function ProjectGrid({ filter = 'Todos', onSelect }: Props) {
  return <div className="grid gap-6 md:grid-cols-3">
    {projects.filter(project => filter === 'Todos' || project.category === filter).map((project, index) => (
      <ProjectCard key={project.title} project={project} index={index} onSelect={() => onSelect(project)} />
    ))}
  </div>;
}
