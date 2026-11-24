import { useRouteSettings } from '@/router/use-route-settings';
import { Hero } from './components/hero';
import { Ticker } from './components/ticker';
import { Modes } from './components/modes';
import { EarthSMP } from './components/earth-smp';
import { Join } from './components/join';
import { HomeBoards } from './components/supporters';
import { DiscordBanner } from './components/discord-banner';

export function HomePage() {
  const { settings } = useRouteSettings();

  return (
    <>
      {settings.sections.hero && <Hero settings={settings} />}

      {settings.sections.ticker && <Ticker />}

      {settings.sections.modes && <Modes settings={settings} />}

      {settings.sections.earthsmp && <EarthSMP settings={settings} />}

      {settings.sections.join && <Join settings={settings} />}

      {settings.sections.topboards && <HomeBoards settings={settings} />}

      {settings.sections.discord && <DiscordBanner settings={settings} />}
    </>
  );
}
