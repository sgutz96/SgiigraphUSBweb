export default function Bird({ small = false }: { small?: boolean }) {
  return <svg viewBox="0 0 600 500" className={small ? 'h-14 w-16 shrink-0' : 'relative z-10 h-full w-full'} role="img" aria-label="Colibrí geométrico multicolor de SIGGRAPH San Buena">
    {small && <circle cx="300" cy="250" r="240" fill="#0F1A4A" />}
    <g stroke="#151517" strokeWidth={small ? '0' : '2'}>
      <path d="m312 239-98-88-92-109 24 140 102 127Z" fill="#F47B20" />
      <path d="m312 239-98-88 34 158Z" fill="#FBC9A8" />
      <path d="m214 151-92-109 88 47 116 143Z" fill="#F9A244" />
      <path d="m248 309-102-127 40 119 92 50Z" fill="#C41E5A" />
      <path d="m312 239 22-68 80-67-19 99-53 80Z" fill="#2BB5A8" />
      <path d="m334 171 80-67-45 110-27 69Z" fill="#77D1BC" />
      <path d="m342 283 53-80-14 102-73 53Z" fill="#198E8F" />
      <path d="m312 239 30 44-34 75-60-49Z" fill="#FBC9A8" />
      <path d="m308 358-30-7-88 111 99-62Z" fill="#C41E5A" />
      <path d="m278 351-30-42-25 117Z" fill="#F47B20" />
      <path d="m334 171 9-45 28-25 37 8-13 28-44 21Z" fill="#2BB5A8" />
      <path d="m371 101 37 8 93-28-106 56Z" fill="#F47B20" />
      <path d="m343 126 28-25-20 57-17 13Z" fill="#C41E5A" />
      <circle cx="379" cy="119" r="4" fill="#151517" stroke="none" />
    </g>
  </svg>;
}
