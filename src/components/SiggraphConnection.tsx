import Entrance from './Entrance';
import Section from './ui/Section';
import Eyebrow from './ui/Eyebrow';
import Icon from './Icon';

export default function SiggraphConnection() {
  return <Section labelledBy="global-title" inner="py-12 lg:py-14">
    <Entrance className="flex flex-wrap items-center justify-between gap-8 rounded-panel border border-teal/30 bg-teal/[0.06] p-8 lg:p-10">
      <div className="max-w-2xl">
        <Eyebrow alt className="mb-3">Una conversación que va más allá del campus</Eyebrow>
        <h2 id="global-title" className="mb-4 font-display text-3xl font-bold uppercase md:text-4xl">Talento local. Horizontes globales.</h2>
        <p className="text-sm leading-7 text-muted">Descubre la comunidad internacional de ACM SIGGRAPH: conferencias, conocimiento y conexiones alrededor de la computación gráfica y las técnicas interactivas.</p>
      </div>
      <a href="https://www.siggraph.org/" target="_blank" rel="noreferrer" className="focus-ring inline-flex min-h-12 items-center gap-3 rounded-control border border-teal px-6 text-sm font-semibold text-teal transition-colors hover:bg-teal/10"><Icon name="globe" />Conocer ACM SIGGRAPH<Icon name="diagonal" /></a>
    </Entrance>
  </Section>;
}
