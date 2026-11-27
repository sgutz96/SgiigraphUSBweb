import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { sections, type Navigate, type Page } from '../data/content';
import { asset } from '../lib/asset';
import Bird from './Bird';
import Icon from './Icon';
import Button from './ui/Button';

const navItems = sections.filter(section => section !== 'Inicio' && section !== 'Comunidad');

export default function SiteHeader({ page, navigate }: { page: Page; navigate: Navigate }) {
  const reducedMotion = useReducedMotion();
  const [menu, setMenu] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const go = (next: Page) => { setMenu(false); navigate(next); };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenu(false); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('keydown', onKey); };
  }, []);

  return <header className={`sticky top-0 z-40 border-b transition-colors ${scrolled || menu ? 'border-line-soft bg-ink-850/90 backdrop-blur-md' : 'border-transparent bg-ink-850'}`}>
    <div className="container-site flex min-h-20 items-center justify-between gap-6">
      <button type="button" onClick={() => go('Inicio')} aria-label="SIGGRAPH USBBOG, inicio" className="focus-ring flex min-h-11 shrink-0 items-center gap-3 rounded-tag">
        {logoFailed ? <Bird small /> : <img src={asset('siggraph-logo.png')} alt="" className="h-12 w-12 object-contain invert" onError={() => setLogoFailed(true)} />}
        <span className="hidden text-left leading-tight sm:block"><strong className="block text-sm tracking-wide">SIGGRAPH</strong><span className="font-mono text-[11px] tracking-widest text-orange">USBBOG</span></span>
      </button>

      <nav aria-label="Navegación principal" className="hidden items-center gap-1 lg:flex">
        {navItems.map(section => <button
          key={section}
          type="button"
          onClick={() => go(section)}
          aria-current={page === section ? 'page' : undefined}
          className={`focus-ring rounded-control px-4 py-2 text-sm transition-colors ${page === section ? 'bg-ink-700 text-fg' : 'text-muted hover:text-fg'}`}
        >{section}</button>)}
      </nav>

      <div className="flex items-center gap-2">
        {/* CTA siempre visible, también en móvil: el "Aplicar" de AIESEC */}
        <Button size="sm" onClick={() => go('Comunidad')} aria-current={page === 'Comunidad' ? 'page' : undefined}>Únete al capítulo <Icon name="diagonal" /></Button>
        <button type="button" aria-label={menu ? 'Cerrar navegación' : 'Abrir navegación'} aria-expanded={menu} aria-controls="menu-movil" onClick={() => setMenu(!menu)} className="focus-ring flex h-11 w-11 items-center justify-center rounded-control hover:bg-ink-700 lg:hidden"><Icon name={menu ? 'close' : 'menu'} /></button>
      </div>
    </div>

    <AnimatePresence>
      {menu && <motion.nav
        id="menu-movil"
        initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Navegación móvil"
        className="overflow-hidden border-t border-line-soft lg:hidden"
      >
        <div className="container-site grid gap-1 py-4">
          {sections.map(section => <button type="button" onClick={() => go(section)} key={section} aria-current={page === section ? 'page' : undefined} className={`focus-ring flex min-h-12 items-center justify-between rounded-card px-4 text-left ${page === section ? 'bg-ink-700 text-orange' : 'text-fg hover:bg-ink-800'}`}>{section}<Icon className="text-subtle" /></button>)}
        </div>
      </motion.nav>}
    </AnimatePresence>
  </header>;
}
