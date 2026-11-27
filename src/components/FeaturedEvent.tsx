import { events, slugify, type Navigate } from '../data/content';
import SectionHeading from './SectionHeading';
import Entrance from './Entrance';
import Section from './ui/Section';
import Tag from './ui/Tag';
import Button from './ui/Button';
import Icon from './Icon';

export default function FeaturedEvent({ navigate }: { navigate: Navigate }) {
  const event = events[0];
  return <Section labelledBy="evento-title" inner="pt-0 lg:pt-0">
    <SectionHeading id="evento-title" label="01 / Encuéntrate con nuevas ideas" title="Lo próximo en el radar" action="Todos los eventos" onClick={() => navigate('Eventos')} />
    <Entrance delay={0.1} className="grid overflow-hidden rounded-panel border border-line bg-ink-800 md:grid-cols-[.9fr_1.1fr]">
      <div className="relative flex min-h-72 flex-col justify-between overflow-hidden bg-teal/10 p-8">
        <div aria-hidden="true" className="absolute -right-8 -top-12 h-80 w-80 rotate-[25deg] rounded-[3rem] border-[35px] border-teal/20" />
        <div aria-hidden="true" className="absolute -right-4 top-3 h-72 w-72 rotate-[25deg] rounded-[2.5rem] border border-teal" />
        <span className="eyebrow relative text-teal-soft">Aprende. Experimenta. Crea.</span>
        <div className="relative border-l-[5px] border-orange pl-5">
          <p className="font-display text-[44px] font-extrabold leading-[0.95] lg:text-[56px]">MASTER<br /><span className="text-orange">CLASS_</span></p>
          <p className="eyebrow mt-3">Del concepto al mundo 3D</p>
        </div>
      </div>
      <div className="flex flex-col p-7 lg:p-10">
        <div className="flex flex-wrap gap-2"><Tag>Evento de muestra</Tag><Tag tone="orange">{event.type}</Tag></div>
        <h3 className="mb-4 mt-5 text-2xl font-semibold leading-snug">{event.title}</h3>
        <p className="mb-6 text-sm leading-7 text-muted">Del primer concepto a la iluminación final. Un ejemplo de los encuentros que podrás explorar en nuestra agenda.</p>
        <dl className="mb-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          <div className="flex items-center gap-2"><dt><Icon name="calendar" className="text-orange" /><span className="sr-only">Fecha</span></dt><dd>Fecha por confirmar</dd></div>
          <div className="flex items-center gap-2"><dt><Icon name="pin" className="text-orange" /><span className="sr-only">Lugar</span></dt><dd>Campus Bogotá · Propuesto</dd></div>
        </dl>
        <Button variant="outline" size="sm" className="mt-auto self-start" onClick={() => navigate('Eventos', slugify(event.title))}>Explorar el formato <Icon /></Button>
      </div>
    </Entrance>
  </Section>;
}
