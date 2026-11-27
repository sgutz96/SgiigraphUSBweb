import Card from '../components/ui/Card';

const blocks = [
  { title: '¿Qué es SIGGRAPH USBBOG?', text: 'Un capítulo estudiantil que conecta el arte y la ciencia de la computación gráfica dentro de la Universidad de San Buenaventura Bogotá.' },
  { title: 'Nuestra misión', text: 'Impulsar el aprendizaje colaborativo, la investigación y la creación de experiencias digitales con sentido.' },
  { title: 'Nuestra visión', text: 'Construir una comunidad interdisciplinar que conecte el talento local con la conversación global sobre medios digitales.' },
  { title: 'Las personas detrás de las ideas', text: 'Estudiantes, docentes, asesores y voluntarios hacen posible este espacio. El directorio del equipo y la historia del capítulo se publicarán con información oficial.' },
];

export default function AboutPage() {
  return <div className="grid gap-5 md:grid-cols-2">
    {blocks.map((item, index) => <Card as="article" key={item.title} className="p-8">
      <span className="eyebrow text-teal">0{index + 1}</span>
      <h2 className="mb-4 mt-4 text-xl font-semibold text-orange">{item.title}</h2>
      <p className="leading-7 text-muted">{item.text}</p>
    </Card>)}
  </div>;
}
