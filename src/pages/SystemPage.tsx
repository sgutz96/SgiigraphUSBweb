import type { ReactNode } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Tag from '../components/ui/Tag';
import Eyebrow from '../components/ui/Eyebrow';
import FilterChips from '../components/ui/FilterChips';
import Section from '../components/ui/Section';
import Icon, { type IconName } from '../components/Icon';
import Bird from '../components/Bird';
import { useState } from 'react';

/*
 * Guía viva del sistema de diseño. Todo lo que se ve aquí usa los
 * mismos tokens y componentes que el sitio: si cambias un token en
 * index.css, esta página cambia también.
 */

const brand = [
  { name: 'orange', hex: '#F47B20', use: 'Acción principal, acentos' },
  { name: 'teal', hex: '#2BB5A8', use: 'Acento secundario, foco' },
  { name: 'magenta', hex: '#C41E5A', use: 'Detalles, selección' },
  { name: 'pink', hex: '#ED77A3', use: 'Ruta "Investigar"' },
  { name: 'peach', hex: '#FBC9A8', use: 'Ruta "Conectar"' },
  { name: 'navy', hex: '#0F1A4A', use: 'Fondo del logo' },
];
const neutrals = [
  { name: 'ink-950', hex: '#0C0C0E', use: 'Footer' },
  { name: 'ink-900', hex: '#111113', use: 'Banda alterna' },
  { name: 'ink-850', hex: '#151517', use: 'Fondo base' },
  { name: 'ink-800', hex: '#1B1B1E', use: 'Tarjetas' },
  { name: 'ink-700', hex: '#232326', use: 'Hover, elevado' },
  { name: 'line', hex: '#3A3A3C', use: 'Bordes' },
  { name: 'paper', hex: '#F5F1EA', use: 'Banda clara' },
];
const text = [
  { name: 'fg', hex: '#FFFFFF', note: '18.2:1' },
  { name: 'muted', hex: '#C4C8CF', note: '10.9:1' },
  { name: 'subtle', hex: '#9A9EA6', note: '6.8:1' },
];
const icons: IconName[] = ['arrow', 'diagonal', 'back', 'calendar', 'pin', 'plus', 'close', 'check', 'globe', 'menu', 'code', 'pen', 'spark', 'eye'];

function Block({ label, title, children, note }: { label: string; title: string; children: ReactNode; note?: string }) {
  return <section className="border-t border-line py-12 first:border-t-0 first:pt-0">
    <div className="mb-8 grid gap-3 md:grid-cols-[.8fr_1.2fr]">
      <div><Eyebrow className="mb-2">{label}</Eyebrow><h2 className="font-display text-3xl font-bold uppercase">{title}</h2></div>
      {note && <p className="max-w-xl text-sm leading-7 text-muted md:pt-6">{note}</p>}
    </div>
    {children}
  </section>;
}

function Swatch({ name, hex, use }: { name: string; hex: string; use: string }) {
  return <li className="overflow-hidden rounded-card border border-line">
    <div className="h-24" style={{ background: `var(--color-${name})` }} />
    <div className="bg-ink-800 p-4"><code className="font-mono text-sm text-fg">{name}</code><p className="font-mono text-xs text-subtle">{hex}</p><p className="mt-2 text-xs leading-5 text-muted">{use}</p></div>
  </li>;
}

export default function SystemPage() {
  const [chip, setChip] = useState('Todos');
  return <div>
    <Block label="01 / Color" title="Marca" note="Los colores del colibrí. El naranja es la única acción principal por pantalla; el teal acompaña y marca el foco del teclado.">
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">{brand.map(color => <Swatch key={color.name} {...color} />)}</ul>
    </Block>

    <Block label="02 / Color" title="Neutros y texto" note="Superficies de más profunda a más elevada. Los contrastes de texto están medidos sobre ink-850 y cumplen WCAG AA; subtle se reserva para notas y metadatos.">
      <ul className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">{neutrals.map(color => <Swatch key={color.name} {...color} />)}</ul>
      <ul className="grid gap-3 md:grid-cols-3">{text.map(item => <li key={item.name} className="flex items-center justify-between rounded-card border border-line bg-ink-850 p-5">
        <span style={{ color: `var(--color-${item.name})` }} className="text-lg font-semibold">Texto {item.name}</span><code className="font-mono text-xs text-subtle">{item.note}</code>
      </li>)}</ul>
    </Block>

    <Block label="03 / Tipografía" title="Tres voces" note="Barlow Condensed grita (títulos, siempre en mayúsculas). Montserrat conversa (lectura). JetBrains Mono etiqueta (eyebrows, datos, fechas). Las tres se sirven desde el proyecto, sin depender de Google Fonts.">
      <div className="space-y-6">
        <div className="grid items-baseline gap-2 md:grid-cols-[180px_1fr]"><code className="font-mono text-xs text-subtle">font-display · 80/700</code><p className="font-display text-6xl font-bold uppercase leading-none md:text-[80px]">Otra dimensión.</p></div>
        <div className="grid items-baseline gap-2 md:grid-cols-[180px_1fr]"><code className="font-mono text-xs text-subtle">font-display · 44/700</code><p className="font-display text-[44px] font-bold uppercase leading-none">Lo próximo en el radar</p></div>
        <div className="grid items-baseline gap-2 md:grid-cols-[180px_1fr]"><code className="font-mono text-xs text-subtle">font-body · 18/400</code><p className="max-w-2xl text-lg leading-8 text-muted">La comunidad de computación gráfica, arte digital y tecnologías interactivas de la Universidad de San Buenaventura Bogotá.</p></div>
        <div className="grid items-baseline gap-2 md:grid-cols-[180px_1fr]"><code className="font-mono text-xs text-subtle">font-body · 20/600</code><p className="text-xl font-semibold">Del concepto al mundo: creación de entornos 3D</p></div>
        <div className="grid items-baseline gap-2 md:grid-cols-[180px_1fr]"><code className="font-mono text-xs text-subtle">.eyebrow · 12</code><Eyebrow>01 / Encuéntrate con nuevas ideas</Eyebrow></div>
      </div>
    </Block>

    <Block label="04 / Forma" title="Radios" note="Controles en píldora (como AIESEC): se leen como tocables. Tarjetas con radio medio. Etiquetas casi rectas, para conservar el tono técnico.">
      <div className="flex flex-wrap items-end gap-6">
        {[['rounded-control', 'control · píldora', 'h-12 w-40'], ['rounded-panel', 'panel · 24px', 'h-28 w-40'], ['rounded-card', 'card · 16px', 'h-28 w-40'], ['rounded-tag', 'tag · 6px', 'h-10 w-24']].map(([cls, label, size]) => <div key={cls}>
          <div className={`${size} ${cls} border border-teal bg-teal/10`} /><code className="mt-2 block font-mono text-xs text-subtle">{label}</code>
        </div>)}
      </div>
    </Block>

    <Block label="05 / Componentes" title="Botones y etiquetas" note="<Button> tiene tres variantes. Con href se convierte en enlace. Dentro de una sección clara cambia de color solo.">
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <Button>Quiero participar <Icon name="diagonal" /></Button>
        <Button variant="outline">Únete al capítulo</Button>
        <Button variant="quiet">Explorar proyectos <Icon /></Button>
        <Button size="sm">Pequeño</Button>
        <Button disabled>Deshabilitado</Button>
      </div>
      <div className="mb-8 flex flex-wrap gap-2"><Tag>Evento de muestra</Tag><Tag tone="orange">Masterclass</Tag><Tag tone="pink">Investigación</Tag></div>
      <FilterChips label="Ejemplo de filtros" options={['Todos', 'Masterclass', 'Taller']} value={chip} onChange={setChip} />
    </Block>

    <Block label="06 / Componentes" title="Superficies" note="<Card> en oscuro y la banda <Section background=&quot;paper&quot;> para romper el ritmo (patrón tomado de AIESEC). En paper, los acentos pasan a orange-ink y teal-ink para mantener contraste.">
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="p-8"><Eyebrow alt className="mb-3">Card / oscuro</Eyebrow><h3 className="mb-2 text-xl font-semibold">Superficie ink-800</h3><p className="text-sm leading-6 text-muted">Borde line, radio card. Si toda la tarjeta es clicable, usa cardClass(tone, true) sobre el button.</p></Card>
        <div className="overflow-hidden rounded-card"><Section background="paper" inner="!p-8"><Eyebrow className="mb-3">Section / paper</Eyebrow><h3 className="mb-4 text-xl font-semibold">Banda clara</h3><Button size="sm">Botón en paper <Icon /></Button></Section></div>
      </div>
    </Block>

    <Block label="07 / Iconografía" title="Íconos de línea" note="24×24, trazo 1.5, extremos redondeados. Se agregan en Icon.tsx; siempre decorativos (aria-hidden) junto a un texto.">
      <ul className="grid grid-cols-4 gap-3 sm:grid-cols-7">{icons.map(name => <li key={name} className="flex flex-col items-center gap-2 rounded-card border border-line p-4"><Icon name={name} className="h-6 w-6" /><code className="font-mono text-[11px] text-subtle">{name}</code></li>)}</ul>
    </Block>

    <Block label="08 / Marca" title="El colibrí" note="Ilustración geométrica construida con los seis colores de marca. Versión 3D en el hero (three.js, carga diferida) y versión plana como respaldo y en el footer.">
      <div className="flex flex-wrap items-center gap-10 rounded-panel border border-line bg-ink-900 p-8"><div className="h-48 w-56"><Bird /></div><Bird small /></div>
    </Block>
  </div>;
}
