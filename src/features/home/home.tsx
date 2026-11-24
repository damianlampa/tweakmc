import { type PageProps } from '@/shared/types/page';
import { Hero } from './components/hero';
import { Ticker } from './components/ticker';
import { Modes } from './components/modes';
import { EarthSMP } from './components/earth-smp';
import { Join } from './components/join';
import { HomeBoards } from './components/supporters';
import { DiscordBanner } from './components/discord-banner';

export function HomePage({ settings, navigate }: PageProps) {
  return (
    <>
      {settings.sections.hero && <Hero settings={settings} navigate={navigate} />}
      {settings.sections.ticker && <Ticker />}
      {settings.sections.modes && <Modes settings={settings} navigate={navigate} />}
      {settings.sections.earthsmp && <EarthSMP settings={settings} />}
      {settings.sections.join && <Join settings={settings} />}
      {settings.sections.topboards && <HomeBoards settings={settings} navigate={navigate} />}
      {settings.sections.discord && <DiscordBanner settings={settings} />}
    </>
  );
}
