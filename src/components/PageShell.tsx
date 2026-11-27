import type { ReactNode } from 'react';
import { pageIntro, type Page } from '../data/content';
import Eyebrow from './ui/Eyebrow';

export default function PageShell({ page, children }: { page: Exclude<Page, 'Inicio'>; children: ReactNode }) {
  const intro = pageIntro[page];
  return <>
    <header className="border-b border-line-soft bg-[radial-gradient(ellipse_at_top_right,rgb(244_123_32/0.12),transparent_55%)]">
      <div className="container-site pb-12 pt-14 lg:pb-16 lg:pt-20">
        <Eyebrow alt className="mb-5">SIGGRAPH San Buena / {page}</Eyebrow>
        <h1 className="mb-5 max-w-4xl font-display text-5xl font-bold uppercase leading-[1.02] md:text-7xl">{intro.title}</h1>
        <p className="max-w-2xl text-lg leading-8 text-muted">{intro.text}</p>
      </div>
    </header>
    <div className="container-site min-h-[45vh] py-14">{children}</div>
  </>;
}
