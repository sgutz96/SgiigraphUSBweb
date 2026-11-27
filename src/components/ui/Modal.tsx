import { useEffect, useRef, type ReactNode } from 'react';
import Icon from '../Icon';

/*
 * Diálogo modal con <dialog> nativo: trampa de foco, Esc para cerrar
 * y devolución del foco al botón que lo abrió, sin librerías.
 */
export default function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return <dialog
    ref={ref}
    onClose={onClose}
    onClick={event => { if (event.target === ref.current) onClose(); }}
    aria-labelledby="modal-title"
    className="m-auto w-[min(560px,calc(100%-2rem))] rounded-panel border border-line bg-ink-800 p-0 text-fg shadow-2xl"
  >
    <div className="p-7 md:p-9">
      <div className="mb-6 flex items-start justify-between gap-6">
        <h2 id="modal-title" className="font-display text-3xl font-bold uppercase leading-tight">{title}</h2>
        <button type="button" onClick={onClose} aria-label="Cerrar" className="focus-ring -mr-2 -mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-control text-muted hover:bg-ink-700 hover:text-fg"><Icon name="close" /></button>
      </div>
      {children}
    </div>
  </dialog>;
}
