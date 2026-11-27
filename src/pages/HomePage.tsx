import type { Navigate } from '../data/content';
import Hero from '../components/Hero';
import InterestsStrip from '../components/InterestsStrip';
import ExploreRoutes from '../components/ExploreRoutes';
import FeaturedEvent from '../components/FeaturedEvent';
import AboutIntro from '../components/AboutIntro';
import FeaturedProjects from '../components/FeaturedProjects';
import Profiles from '../components/Profiles';
import KnowledgeHighlights from '../components/KnowledgeHighlights';
import Participation from '../components/Participation';
import FrequentlyAsked from '../components/FrequentlyAsked';
import SiggraphConnection from '../components/SiggraphConnection';

/* Ritmo: oscuro → alterno → oscuro → CLARO → oscuro → alterno → CLARO → oscuro */
export default function HomePage({ navigate }: { navigate: Navigate }) {
  return <>
    <Hero navigate={navigate} />
    <InterestsStrip />
    <ExploreRoutes navigate={navigate} />
    <FeaturedEvent navigate={navigate} />
    <AboutIntro navigate={navigate} />
    <FeaturedProjects navigate={navigate} />
    <Profiles navigate={navigate} />
    <KnowledgeHighlights navigate={navigate} />
    <Participation navigate={navigate} />
    <FrequentlyAsked />
    <SiggraphConnection />
  </>;
}
