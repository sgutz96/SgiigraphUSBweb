import Icon from '../Icon';

/** Enlace de regreso desde una vista de detalle. */
export default function BackLink({ onClick, children }: { onClick: () => void; children: string }) {
  return <button type="button" onClick={onClick} className="focus-ring mb-7 inline-flex min-h-11 items-center gap-2 rounded-tag text-sm text-teal-soft hover:text-fg"><Icon name="back" />{children}</button>;
}
