import { useState, type FormEvent } from 'react';
import { interests } from '../data/content';
import Icon from '../components/Icon';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const ways = [
  { title: 'Participa en nuestros encuentros', text: 'Talleres, masterclasses y conversatorios abiertos a toda la comunidad universitaria.' },
  { title: 'Comparte tu proyecto o investigación', text: 'Muestra lo que estás haciendo y recibe miradas de otras disciplinas.' },
  { title: 'Haz parte del voluntariado', text: 'Ayuda a organizar eventos, comunicar y construir el capítulo desde adentro.' },
];

const fieldClass = 'focus-ring w-full rounded-card border border-line bg-ink-850 px-4 py-3 text-fg placeholder:text-subtle';

/*
 * Formulario de interés en modal (patrón "Quiero aplicar" de AIESEC).
 * Es una VISTA PREVIA: no envía datos. Para conectarlo, reemplaza el
 * cuerpo de `submit` por un fetch al formulario oficial del capítulo.
 */
export default function CommunityPage() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };
  const close = () => { setOpen(false); setSent(false); };

  return <div className="grid gap-10 md:grid-cols-[1.1fr_.9fr]">
    <ol className="space-y-4">
      {ways.map((way, index) => <li key={way.title} className="flex gap-5 rounded-card border border-line p-6">
        <span className="font-display text-3xl font-extrabold text-teal">0{index + 1}</span>
        <div><h2 className="text-lg font-semibold">{way.title}</h2><p className="mt-2 text-sm leading-6 text-muted">{way.text}</p></div>
      </li>)}
    </ol>

    <div className="self-start rounded-panel bg-orange p-8 text-ink-950 md:p-10">
      <p className="eyebrow mb-4">Convocatoria abierta pronto</p>
      <h2 className="mb-4 font-display text-4xl font-extrabold uppercase leading-none">Tu próxima idea empieza aquí.</h2>
      <p className="mb-8 leading-7">Déjanos saber qué te interesa y te avisaremos cuando el capítulo abra su convocatoria oficial.</p>
      <button type="button" onClick={() => setOpen(true)} className="focus-ring inline-flex min-h-12 items-center gap-3 rounded-control bg-ink-950 px-6 text-sm font-semibold text-fg transition-colors hover:bg-ink-700">Me interesa participar <Icon name="diagonal" /></button>
    </div>

    <Modal open={open} onClose={close} title={sent ? '¡Gracias por tu interés!' : 'Quiero participar'}>
      {sent ? <div aria-live="polite">
        <p className="mb-6 leading-7 text-muted">Esta es una vista previa: <strong className="text-fg">no se envió ni se guardó ningún dato.</strong> Cuando el capítulo publique su canal oficial, este formulario quedará conectado.</p>
        <Button onClick={close}>Entendido <Icon name="check" /></Button>
      </div> : <form onSubmit={submit} className="space-y-5">
        <p className="rounded-card border border-orange/40 bg-orange/10 p-4 text-sm leading-6 text-muted">Vista previa: este formulario aún no envía información.</p>
        <label className="block"><span className="mb-2 block text-sm font-semibold">Nombre</span><input required name="nombre" autoComplete="name" className={fieldClass} /></label>
        <label className="block"><span className="mb-2 block text-sm font-semibold">Correo institucional</span><input required type="email" name="correo" autoComplete="email" placeholder="tu correo de la universidad" className={fieldClass} /></label>
        <fieldset>
          <legend className="mb-3 text-sm font-semibold">¿Qué te interesa? <span className="font-normal text-subtle">(opcional)</span></legend>
          <div className="flex flex-wrap gap-2">{interests.map(item => <label key={item} className="cursor-pointer">
            <input type="checkbox" name="intereses" value={item} className="peer sr-only" />
            <span className="inline-flex min-h-10 items-center rounded-control border border-line px-4 text-sm text-muted transition-colors peer-checked:border-teal peer-checked:bg-teal/15 peer-checked:text-fg peer-focus-visible:outline-2 peer-focus-visible:outline-teal">{item}</span>
          </label>)}</div>
        </fieldset>
        <Button type="submit" className="w-full">Enviar <Icon /></Button>
      </form>}
    </Modal>
  </div>;
}
