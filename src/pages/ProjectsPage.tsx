import { useState } from 'react';
import { projects, slugify, type Navigate, type Project } from '../data/content';
import Art from '../components/Art';
import ProjectGrid from '../components/ProjectGrid';
import FilterChips from '../components/ui/FilterChips';
import Tag from '../components/ui/Tag';
import BackLink from '../components/ui/BackLink';

export default function ProjectsPage({ project, navigate }: { project: Project | null; navigate: Navigate }) {
  const [filter, setFilter] = useState('Todos');

  if (project) return <article className="max-w-3xl">
    <BackLink onClick={() => navigate('Proyectos')}>Volver a proyectos</BackLink>
    <Art kind={project.kind} rounded />
    <div className="mt-6 flex flex-wrap gap-2"><Tag>{project.tag}</Tag><Tag tone="orange">Concepto de muestra</Tag></div>
    <h2 className="my-5 text-3xl font-semibold">{project.title}</h2>
    <p className="text-lg leading-8 text-muted">{project.description}</p>
    <p className="mt-6 text-sm text-subtle">Categoría: {project.category}</p>
  </article>;

  return <>
    <FilterChips label="Filtrar por categoría" options={['Todos', ...projects.map(item => item.category)]} value={filter} onChange={setFilter} />
    <ProjectGrid filter={filter} onSelect={item => navigate('Proyectos', slugify(item.title))} />
  </>;
}
