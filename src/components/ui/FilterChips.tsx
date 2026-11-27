/**
 * Grupo de filtros. Botones con aria-pressed (antes se usaba role="tab"
 * sin tabpanel ni flechas, lo que confundía a los lectores de pantalla).
 */
export default function FilterChips({ label, options, value, onChange }: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return <div role="group" aria-label={label} className="mb-8 flex flex-wrap gap-2">
    {options.map(option => <button
      key={option}
      type="button"
      aria-pressed={value === option}
      onClick={() => onChange(option)}
      className={`focus-ring min-h-11 rounded-control border px-5 text-sm transition-colors ${
        value === option ? 'border-orange bg-orange font-semibold text-ink-950' : 'border-line text-muted hover:border-muted hover:text-fg'
      }`}
    >{option}</button>)}
  </div>;
}
