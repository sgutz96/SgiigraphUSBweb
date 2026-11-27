import type { Navigate, Page } from '../data/content';
import Button from './ui/Button';
import { ToneContext } from './ui/tone';
import Icon from './Icon';

export default function CommunityCTA({ page, navigate }: { page: Page; navigate: Navigate }) {
  const onCommunity = page === 'Comunidad';
  return <section aria-labelledby="cta-title" className="relative overflow-hidden bg-orange text-ink-950">
    <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-ink-950/10" />
    <div className="container-site relative flex flex-wrap items-center justify-between gap-8 py-14">
      <div>
        <p className="eyebrow mb-3">Tu curiosidad tiene un lugar aquí.</p>
        <h2 id="cta-title" className="font-display text-4xl font-extrabold uppercase leading-none md:text-5xl">Creemos lo que sigue.</h2>
      </div>
      {/* Sobre naranja, el botón usa la variante para fondos claros (oscuro) */}
      <ToneContext.Provider value="paper"><Button
        onClick={() => navigate(onCommunity ? 'Eventos' : 'Comunidad')}
      >{onCommunity ? 'Explora los encuentros' : 'Sé parte de la comunidad'}<Icon name="diagonal" /></Button></ToneContext.Provider>
    </div>
  </section>;
}
