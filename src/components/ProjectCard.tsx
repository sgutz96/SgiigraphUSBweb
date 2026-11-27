import { motion, useReducedMotion } from 'motion/react';
import type { Project } from '../data/content';
import { cardClass } from './ui/Card';
import Art from './Art';
import Icon from './Icon';

export default function ProjectCard({ project, onSelect, index = 0 }: { project: Project; onSelect: () => void; index?: number }) {
  const reducedMotion = useReducedMotion();
  return <motion.button
    type="button"
    layout={!reducedMotion}
    onClick={onSelect}
    initial={{ y: reducedMotion ? 0 : 32 }}
    whileInView={{ y: 0, transition: { duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] } }}
    viewport={{ once: true, amount: 0.12 }}
    whileHover={reducedMotion ? undefined : { y: -6 }}
    whileTap={reducedMotion ? undefined : { scale: 0.99 }}
    transition={{ type: 'spring', stiffness: 280, damping: 26 }}
    className={`group min-w-0 overflow-hidden text-left ${cardClass('dark', true)}`}
  >
    <Art kind={project.kind} />
    <div className="p-6">
      <p className="eyebrow mb-3 text-teal-soft">{project.tag}</p>
      <h3 className="mb-4 text-lg font-semibold transition-colors group-hover:text-orange">{project.title}</h3>
      <div className="flex items-center justify-between text-sm text-muted">
        <span>{project.category}</span><Icon name="diagonal" className="transition-transform motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1" />
      </div>
    </div>
  </motion.button>;
}
