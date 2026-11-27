/*
 * Todo el contenido editable del sitio vive aquí.
 * Cuando el capítulo confirme información real, sólo hay que tocar este archivo.
 */

export const slugify = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* ---------- Navegación ---------- */
export const sections = ['Inicio', 'Nosotros', 'Eventos', 'Investigación', 'Proyectos', 'Recursos', 'Comunidad'] as const;
export type Page = (typeof sections)[number] | 'Sistema';
export const pageSlug = (page: Page) => (page === 'Inicio' ? '' : slugify(page));
export const pageFromSlug = (slug: string): Page =>
  ([...sections, 'Sistema'] as Page[]).find(page => pageSlug(page) === slug) ?? 'Inicio';

export const pageIntro: Record<Exclude<Page, 'Inicio'>, { title: string; text: string }> = {
  Nosotros: { title: 'NOSOTROS', text: 'Un espacio para aprender juntos, hacer preguntas y llevar las ideas más lejos.' },
  Eventos: { title: 'EVENTOS', text: 'Encuentros para compartir conocimiento, experimentar y conectar.' },
  Investigación: { title: 'INVESTIGACIÓN', text: 'Nuevas preguntas. Nuevas herramientas. Otras formas de entender el mundo.' },
  Proyectos: { title: 'PROYECTOS', text: 'Una selección de exploraciones creativas de nuestra comunidad.' },
  Recursos: { title: 'RECURSOS', text: 'Conocimiento abierto para acompañar tu siguiente idea.' },
  Comunidad: { title: 'EL FUTURO SE CREA EN COMUNIDAD.', text: 'No importa si estás empezando o ya tienes un recorrido: aquí hay un lugar para tu curiosidad.' },
  Sistema: { title: 'SISTEMA DE DISEÑO', text: 'Tokens, tipografía y componentes que dan forma a SIGGRAPH USBBOG. Si vas a crear algo nuevo para el sitio, empieza aquí.' },
};

/* ---------- Áreas ---------- */
export const interests = ['Computación gráfica', 'Animación & VFX', 'Arte digital', 'Videojuegos', 'Realidades extendidas'];

/* ---------- Proyectos ---------- */
export const projects = [
  { title: 'Mundos que aún no existen', category: 'Arte digital', tag: 'Exploración creativa', kind: 'world', description: 'Paisajes especulativos donde la arquitectura, la naturaleza y la imaginación se encuentran.' },
  { title: 'Más allá de la pantalla', category: 'Realidad virtual', tag: 'Investigación + XR', kind: 'xr', description: 'Una exploración de nuevas formas de habitar e interactuar con espacios virtuales.' },
  { title: 'El código también crea', category: 'Inteligencia artificial', tag: 'Arte generativo', kind: 'code', description: 'Sistemas creativos que convierten datos y algoritmos en nuevas expresiones visuales.' },
];

/* ---------- Eventos ---------- */
export const events = [
  { title: 'Del concepto al mundo: creación de entornos 3D', type: 'Masterclass', date: '24', month: 'OCT', time: '4:00 p. m.', place: 'Auditorio Fray Diego Barroso', description: 'Explora el proceso de creación de un entorno digital: desde las primeras ideas hasta la iluminación y el render final.' },
  { title: 'Inteligencia artificial y nuevas narrativas', type: 'Conversatorio', date: '30', month: 'OCT', time: '2:00 p. m.', place: 'Laboratorio de medios digitales', description: 'Una conversación abierta sobre autoría, herramientas generativas y el futuro de las narrativas digitales.' },
  { title: 'Primeros pasos en creative coding', type: 'Taller', date: '07', month: 'NOV', time: '3:00 p. m.', place: 'Sala de cómputo', description: 'Experimenta con formas, movimiento e interacción a través del código. No necesitas experiencia previa.' },
];
export const eventTypes = [...new Set(events.map(event => event.type))];

/* ---------- Investigación ---------- */
export const researchLines = [
  'Computación gráfica y visualización',
  'Interacción humano–computador',
  'Medios inmersivos y realidades extendidas',
  'IA aplicada a procesos creativos',
];

/* ---------- Cifras (derivadas del contenido: se actualizan solas) ---------- */
export const stats = [
  { value: researchLines.length, label: 'líneas de investigación propuestas' },
  { value: eventTypes.length, label: 'formatos de encuentro: masterclass, conversatorio y taller' },
  { value: interests.length, label: 'áreas creativas que se cruzan aquí' },
  { value: 1, label: 'red global: ACM SIGGRAPH' },
];

/* ---------- ¿Para quién es? ---------- */
export const profiles = [
  { who: 'Si programas', text: 'Shaders, motores, creative coding, simulación. Tu código puede convertirse en imagen y movimiento.', icon: 'code', color: 'teal' },
  { who: 'Si diseñas o dibujas', text: 'Ilustración, modelado, dirección de arte. Trae tu mirada a proyectos donde la técnica necesita estética.', icon: 'pen', color: 'orange' },
  { who: 'Si te mueve la investigación', text: 'Preguntas sobre interacción, percepción o IA. Encuentra con quién explorarlas y publicarlas.', icon: 'spark', color: 'pink' },
  { who: 'Si apenas tienes curiosidad', text: 'No necesitas experiencia previa. Muchas personas llegan por un taller y se quedan por la comunidad.', icon: 'eye', color: 'peach' },
] as const;

/* ---------- FAQ ---------- */
export const questions = [
  { question: '¿Necesito experiencia previa para acercarme?', answer: 'Puedes empezar explorando los recursos y los proyectos de esta web. Cada actividad deberá indicar sus conocimientos previos y requisitos cuando se publique su convocatoria oficial.' },
  { question: '¿Solo es un espacio para programadores?', answer: 'La computación gráfica conecta muchas disciplinas: arte, animación, diseño, narrativa, videojuegos e investigación. Esta propuesta de comunidad da espacio a distintas formas de crear, no solo al código.' },
  { question: '¿Participar es lo mismo que tener membresía en ACM SIGGRAPH?', answer: 'No. Participar en una actividad, pertenecer al capítulo y tener una membresía de ACM SIGGRAPH son cosas distintas. Los requisitos del capítulo están pendientes de publicación; consulta las condiciones de membresía global en el sitio oficial de ACM SIGGRAPH.' },
  { question: '¿Cómo puedo proponer un proyecto o ser voluntario?', answer: 'En Comunidad encontrarás las formas de participación previstas. El canal de contacto y las convocatorias se publicarán tras su confirmación oficial. Por ahora, esta vista previa no recibe propuestas ni inscripciones.' },
  { question: '¿Las fechas y los proyectos publicados ya están confirmados?', answer: 'No. Los eventos y proyectos actuales son ejemplos para explorar la web. Las fechas, los autores, los invitados y los resultados reales se incorporarán cuando el capítulo facilite información verificada.' },
];

export const resources = [
  { title: 'ACM SIGGRAPH', type: 'Comunidad global', url: 'https://www.siggraph.org/' },
  { title: 'Red de capítulos', type: 'Capítulos y conexiones', url: 'https://www.siggraph.org/chapters/' },
  { title: 'SIGGRAPH Conferences', type: 'Conferencias e investigación', url: 'https://www.siggraph.org/conferences/' },
  { title: 'Blender: documentación', type: 'Herramientas / 3D', url: 'https://docs.blender.org/' },
];

export type Project = (typeof projects)[number];
export type ChapterEvent = (typeof events)[number];
export type Navigate = (page: Page, detail?: string) => void;
