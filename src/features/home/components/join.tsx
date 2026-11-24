import { useTranslation } from 'react-i18next';
import { homeSections } from '@/router/paths';
import { type Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/section-decor';
import { IpText, IpBar } from '@/shared/server-ip';
import { onCardMove } from '@/shared/utils/card-glow';
import { KineticHeading } from './kinetic-heading';

const STEPS = [
  ['join.launch', 'join.launchText'],
  ['join.multiplayer', 'join.multiplayerText'],
  ['join.address', null],
  ['join.play', 'join.playText'],
] as const;

export function Join({ settings }: { settings: Settings }) {
  const { t } = useTranslation();

  return (
    <section className="sec sec-elev" id={homeSections.join}>
      <SectionDecor
        theme={settings.theme}
        variant="left"
        labelLeft="START // JAVA"
        labelRight="TWEAKMC.PL"
      />

      <div className="wrap">
        <div className="tw-max-w-[60ch]">
          <KineticHeading text={t('join.title')} accentWord={t('join.accent')} />
          <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
            {t('join.description')}
          </p>
        </div>

        <ol className="steps tw-relative tw-list-none tw-m-[40px_0_0] tw-p-0 tw-grid tw-grid-cols-[repeat(4,_minmax(0,_1fr))] tw-gap-[16px]">
          {STEPS.map(([title, description], stepIndex) => {
            return (
              <li key={title} className="step-card glow-card" onPointerMove={onCardMove}>
                <span className="step-n" aria-hidden="true">
                  0{stepIndex + 1}
                </span>
                <h3>{t(title)}</h3>
                <p>
                  {description ? (
                    t(description)
                  ) : (
                    <>
                      {t('join.addressPrefix')}
                      <IpText className="ip-inline" />
                      {t('join.addressSuffix')}
                    </>
                  )}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="tw-mt-[40px]">
          <IpBar />
        </div>
      </div>
    </section>
  );
}
