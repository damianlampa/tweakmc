import { type PageProps } from '../types/page';
import { Hero } from '../features/home/hero';
import { Ticker } from '../features/home/ticker';
import { Modes } from '../features/home/modes';
import { EarthSMP } from '../features/home/earth-smp';
import { Join } from '../features/home/join';
import { HomeBoards } from '../features/home/supporters';
import { DiscordBanner } from '../features/home/discord-banner';

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
