/* Set de íconos de línea, 24×24, trazo 1.5. Agrega nuevos al mapa `paths`. */
const paths = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  diagonal: 'M7 17 17 7M8 7h9v9',
  back: 'M19 12H5M11 6l-6 6 6 6',
  calendar: 'M8 3v4M16 3v4M4 10h16M5 5h14v15H5z',
  pin: 'M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0ZM12 8v4',
  plus: 'M12 5v14M5 12h14',
  close: 'M6 6l12 12M18 6 6 18',
  check: 'M5 12.5 10 17l9-10',
  globe: 'M3 12h18M12 3c6 5 6 13 0 18-6-5-6-13 0-18ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  pen: 'M4 20l4-1 11-11-3-3L5 16l-1 4ZM14 7l3 3',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6',
  eye: 'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name = 'arrow', className = '' }: { name?: IconName; className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`h-5 w-5 shrink-0 ${className}`} aria-hidden="true"><path d={paths[name]} /></svg>;
}
