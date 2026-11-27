import { useState } from 'react';
import { events, eventTypes, slugify, type ChapterEvent, type Navigate } from '../data/content';
import FilterChips from '../components/ui/FilterChips';
import Tag from '../components/ui/Tag';
import { cardClass } from '../components/ui/Card';
import BackLink from '../components/ui/BackLink';
import Icon from '../components/Icon';

export default function EventsPage({ selected, navigate }: { selected: ChapterEvent | null; navigate: Navigate }) {
  const [filter, setFilter] = useState('Todos');

  if (selected) return <article className="max-w-3xl">
    <BackLink onClick={() => navigate('Eventos')}>Volver a eventos</BackLink>
    <div className={`${cardClass()} p-7 md:p-10`}>
      <div className="flex flex-wrap gap-2"><Tag tone="orange">{selected.type}</Tag><Tag>Evento de muestra</Tag></div>
      <h2 className="my-5 text-3xl font-semibold leading-tight">{selected.title}</h2>
      <p className="mb-8 leading-7 text-muted">{selected.description}</p>
      <dl className="mb-8 grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-card bg-ink-700 p-4"><dt><Icon name="calendar" className="text-orange" /><span className="sr-only">Fecha</span></dt><dd>{selected.date} {selected.month} · {selected.time}</dd></div>
        <div className="flex items-center gap-3 rounded-card bg-ink-700 p-4"><dt><Icon name="pin" className="text-orange" /><span className="sr-only">Lugar</span></dt><dd>{selected.place}</dd></div>
      </dl>
      <h3 className="mb-3 text-lg font-semibold">Agenda propuesta</h3>
      <ol className="mb-8 space-y-2 text-muted">{['Bienvenida al capítulo', 'Sesión principal', 'Preguntas y conversación abierta'].map((item, index) => <li key={item} className="flex gap-3"><span className="font-mono text-teal">0{index + 1}</span>{item}</li>)}</ol>
      <p className="border-l-2 border-orange pl-4 text-sm leading-6 text-muted">La fecha, los invitados y las inscripciones están pendientes de confirmación oficial.</p>
    </div>
  </article>;

  const visible = events.filter(event => filter === 'Todos' || event.type === filter);
  return <>
    <FilterChips label="Filtrar por tipo de evento" options={['Todos', ...eventTypes]} value={filter} onChange={setFilter} />
    <ul className="space-y-4" aria-live="polite">
      {visible.map(event => <li key={event.title}>
        <button type="button" onClick={() => navigate('Eventos', slugify(event.title))} className={`group flex min-h-32 w-full items-center gap-6 p-5 text-left md:p-6 ${cardClass('dark', true)}`}>
          <span className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-card bg-ink-700 text-center font-mono">
            <strong className="text-3xl leading-none text-orange">{event.date}</strong><span className="mt-1 text-xs tracking-widest">{event.month}</span>
          </span>
          <span className="min-w-0 flex-1"><Tag>{event.type}</Tag><strong className="my-2 block text-lg">{event.title}</strong><span className="text-sm text-muted">{event.time} · {event.place}</span></span>
          <Icon name="diagonal" className="hidden transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 sm:block" />
        </button>
      </li>)}
    </ul>
    <p className="mt-6 text-sm text-subtle">Programación ilustrativa, pendiente de confirmación por el capítulo.</p>
  </>;
}
