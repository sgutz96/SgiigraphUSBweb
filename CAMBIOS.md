# Cambios — revisión del sistema de diseño

## Sistema
- Tokens consolidados en `src/index.css` (marca, neutros `ink-*`, texto `fg/muted/subtle`, banda clara `paper`, radios, fuente mono). Se eliminaron todos los hex sueltos de los componentes.
- Primitivas nuevas en `src/components/ui/`: Button, Card, Section, Eyebrow, Tag, FilterChips, Modal, BackLink.
- Página **Sistema de diseño** (`#/sistema`, enlazada en el footer) con colores, contrastes, tipografía, radios, componentes e íconos.
- Contrastes verificados (WCAG AA) en oscuro y en claro.
- Fuentes servidas desde el proyecto (@fontsource): ya no dependen de Google Fonts y se agregó JetBrains Mono (antes la mono era la del sistema).

## Inspirado en aieseccolombia.org
- Botones y chips en píldora, tarjetas con esquinas redondeadas.
- Ritmo claro/oscuro: dos bandas claras (perfiles y FAQ).
- Banda de cifras grandes (derivadas del contenido real, no inventadas).
- "¿Es para mí?": perfiles en lugar de testimonios (no hay testimonios reales todavía).
- FAQ numerado en tarjetas.
- CTA "Únete al capítulo" siempre visible, también en móvil; header fijo.
- Formulario de interés en modal (vista previa: no envía datos).
- Banda CTA final en naranja sólido.

## Técnico
- Rutas con hash: el botón "atrás" funciona y cada página/detalle tiene enlace propio (`#/eventos/primeros-pasos-en-creative-coding`).
- three.js se carga diferido: bundle inicial de 990 kB a ~400 kB.
- Rutas a `/public` con `BASE_URL` (antes se rompían en subcarpetas).
- Menú móvil: Esc lo cierra, `aria-controls`, animación de altura.
- Filtros con `aria-pressed` (antes `role="tab"` incompleto); listas semánticas; enlace "Saltar al contenido"; título de pestaña por página.
