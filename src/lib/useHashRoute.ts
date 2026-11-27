import { useCallback, useEffect, useState } from 'react';
import { pageFromSlug, pageSlug, type Page } from '../data/content';

/*
 * Rutas con hash (#/eventos, #/proyectos/el-codigo-tambien-crea).
 * - El botón "atrás" del navegador funciona.
 * - Cada página y cada detalle se puede compartir con un enlace.
 * - Funciona en cualquier hosting estático (Figma Make, GitHub Pages) sin configurar el servidor.
 */
type Route = { page: Page; detail?: string };

const parse = (): Route => {
  const [slug = '', detail] = window.location.hash.replace(/^#\/?/, '').split('/');
  return { page: pageFromSlug(slug), detail: detail || undefined };
};

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((page: Page, detail?: string) => {
    const hash = `#/${[pageSlug(page), detail].filter(Boolean).join('/')}`;
    if (window.location.hash !== hash) window.location.hash = hash;
  }, []);

  return { ...route, navigate };
}
