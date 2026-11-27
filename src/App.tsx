import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { events, projects, slugify } from './data/content';
import { useHashRoute } from './lib/useHashRoute';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import PageShell from './components/PageShell';
import CommunityCTA from './components/CommunityCTA';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import EventsPage from './pages/EventsPage';
import ResearchPage from './pages/ResearchPage';
import ProjectsPage from './pages/ProjectsPage';
import ResourcesPage from './pages/ResourcesPage';
import CommunityPage from './pages/CommunityPage';
import SystemPage from './pages/SystemPage';

export default function App() {
  const reducedMotion = useReducedMotion();
  const { page, detail, navigate } = useHashRoute();
  const event = page === 'Eventos' ? events.find(item => slugify(item.title) === detail) ?? null : null;
  const project = page === 'Proyectos' ? projects.find(item => slugify(item.title) === detail) ?? null : null;

  // Al cambiar de página: arriba del todo y título de pestaña correcto.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const name = event?.title ?? project?.title ?? (page === 'Inicio' ? null : page);
    document.title = name ? `${name} · SIGGRAPH USBBOG` : 'SIGGRAPH USBBOG · Computación gráfica y arte digital';
  }, [page, detail]); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="min-h-screen overflow-x-clip bg-ink-850 font-body text-fg">
    <a href="#contenido" className="focus-ring fixed left-3 top-3 z-50 -translate-y-24 rounded-control bg-orange px-4 py-2 text-sm font-semibold text-ink-950 focus:translate-y-0">Saltar al contenido</a>
    <div className="h-1 bg-gradient-to-r from-magenta via-orange to-teal" />
    <SiteHeader page={page} navigate={navigate} />
    <motion.main
      id="contenido"
      tabIndex={-1}
      key={page + (detail ?? '')}
      initial={{ y: reducedMotion ? 0 : 14 }}
      animate={{ y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="outline-none"
    >
      {page === 'Inicio' ? <HomePage navigate={navigate} /> : (
        <PageShell page={page}>
          {page === 'Nosotros' && <AboutPage />}
          {page === 'Eventos' && <EventsPage selected={event} navigate={navigate} />}
          {page === 'Investigación' && <ResearchPage />}
          {page === 'Proyectos' && <ProjectsPage project={project} navigate={navigate} />}
          {page === 'Recursos' && <ResourcesPage />}
          {page === 'Comunidad' && <CommunityPage />}
          {page === 'Sistema' && <SystemPage />}
        </PageShell>
      )}
      {page !== 'Sistema' && <CommunityCTA page={page} navigate={navigate} />}
    </motion.main>
    <SiteFooter navigate={navigate} />
  </div>;
}
