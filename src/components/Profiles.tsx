import { profiles, type Navigate } from '../data/content';
import Section from './ui/Section';
import SectionHeading from './SectionHeading';
import Entrance from './Entrance';
import Button from './ui/Button';
import Icon from './Icon';

/*
 * "¿Es para mí?" — banda clara inspirada en la sección de historias
 * de AIESEC. En lugar de testimonios inventados, perfiles: quien
 * visita se reconoce en uno. Cuando haya testimonios reales del
 * capítulo, este es el lugar para añadirlos.
 */
const swatch = {
  teal: 'bg-teal text-ink-950',
  orange: 'bg-orange text-ink-950',
  pink: 'bg-pink text-ink-950',
  peach: 'bg-peach text-ink-950',
} as const;

export default function Profiles({ navigate }: { navigate: Navigate }) {
  return <Section background="paper" labelledBy="perfiles-title">
    <SectionHeading id="perfiles-title" label="¿Es para mí?" title="Hay un lugar para tu forma de crear." />
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {profiles.map((profile, index) => <Entrance as="li" key={profile.who} delay={index * 0.08} className="flex h-full flex-col rounded-card border border-paper-line bg-paper-raised p-6 shadow-[0_1px_0_rgb(0_0_0/0.04)]">
          <span className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl ${swatch[profile.color]}`}><Icon name={profile.icon} className="h-7 w-7" /></span>
          <h3 className="mb-3 font-display text-2xl font-bold uppercase leading-tight">{profile.who}</h3>
          <p className="text-sm leading-6 text-paper-muted">{profile.text}</p>
      </Entrance>)}
    </ul>
    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
      <Button onClick={() => navigate('Comunidad')}>Encuentra tu lugar <Icon name="diagonal" /></Button>
      <p className="text-sm text-paper-muted">Sin requisitos previos para acercarte.</p>
    </div>
  </Section>;
}
