import { classes } from '@/shared/utils/classes';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, ScrollRestoration, useMatches } from 'react-router';
import { getScrollKey } from '@/router/utils/get-scroll-key';
import { useSettings } from '@/shared/settings/hooks/use-settings';
import { CopyStatus } from '@/shared/server-ip';
import SeasonFx from './components/season-fx';
import { SiteNavigation } from './components/site-navigation';
import { SiteFooter } from './components/site-footer';
import { PhoneBar } from './components/phone-bar';

export function Layout() {
  const { t } = useTranslation();

  const routeSettings = useSettings();
  const { settings } = routeSettings;
  const isHome = useMatches().some(({ handle }) => handle === 'home');

  if (routeSettings.isLoading) {
    return (
      <main
        className={classes([
          'relative min-h-[100svh]',
          '[padding-block:calc(var(--nav-h)_+_clamp(32px,_5vh,_64px))_clamp(80px,_10vh,_120px)] overflow-hidden',
          'relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto]',
          '[padding-inline:var(--pad)]',
        ])}
        role="status"
      >
        {t('common.loadingSettings')}
      </main>
    );
  }

  return (
    <>
      <a
        className={classes([
          'fixed left-4 top-4 z-[100] rounded-lg bg-purple-600 christmas:bg-sky-600 halloween:bg-orange-600 spring:bg-emerald-600 px-[18px] py-3 font-semibold',
          'text-ink no-underline [transform:translateY(-180%)] focus:transform-none',
        ])}
        href="#main"
      >
        {t('nav.skip')}
      </a>
      {settings.sections.seasonFx && <SeasonFx theme={settings.theme} motion={settings.motion} />}

      <SiteNavigation settings={settings} />

      <main id="main">
        <Suspense fallback={null}>
          <Outlet context={routeSettings} />
          <ScrollRestoration getKey={getScrollKey} />
        </Suspense>
      </main>

      <SiteFooter settings={settings} />

      {isHome && <PhoneBar />}

      <CopyStatus />
    </>
  );
}
