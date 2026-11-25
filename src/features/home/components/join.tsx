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
    <section
      className={
        'relative overflow-hidden [padding-block:clamp(72px,_10vh,_116px)] [border-top:1px_solid_var(--line)] ' +
        '[background:radial-gradient(620px_380px_at_15%_25%,_rgba(var(--accent-rgb),_0.11),_transparent_72%),_var(--bg-elev)]'
      }
      id={homeSections.join}
    >
      <SectionDecor
        theme={settings.theme}
        variant="left"
        labelLeft="START // JAVA"
        labelRight="TWEAKMC.PL"
      />

      <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
        <div className="max-w-[60ch]">
          <KineticHeading text={t('join.title')} accentWord={t('join.accent')} />
          <p className="mt-4 max-w-[58ch] text-muted text-[1.08rem]">{t('join.description')}</p>
        </div>

        <ol className="relative sm:max-wide:grid-cols-2 max-sm:grid-cols-1 list-none m-[40px_0_0] p-0 grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-4">
          {STEPS.map(([title, description], stepIndex) => {
            return (
              <li
                key={title}
                className={
                  'p-[24px] rounded-[14px] [border:1px_solid_var(--line-strong)] bg-bg-elev ' +
                  '[box-shadow:inset_0_1px_0_rgba(var(--bright-rgb),_0.16)] ' +
                  '[transition:transform_0.25s_var(--ease),_border-color_0.25s] hover:[transform:translateY(-3px)] ' +
                  "hover:[border-color:rgba(var(--bright-rgb),_0.45)] relative [&::before]:[content:''] [&::before]:absolute " +
                  '[&::before]:inset-0 [&::before]:rounded-[inherit] ' +
                  '[&::before]:[background:radial-gradient(_320px_circle_at_var(--mx,_50%)_var(--my,_50%),_rgba(var(--bright-rgb),_0.12),_transparent_62%_)] ' +
                  '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none ' +
                  '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1] ' +
                  '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_rgba(129,_140,_248,_0.2),_transparent_62%_)]'
                }
                onPointerMove={onCardMove}
              >
                <span
                  className={
                    'inline-grid place-items-center min-w-[38px] h-[32px] px-2.5 py-0 rounded-[8px] ' +
                    '[background:rgba(var(--accent-rgb),_0.16)] [border:1px_solid_rgba(var(--bright-rgb),_0.35)] font-mono ' +
                    'text-[0.85rem] font-bold text-accent-bright mb-[16px]'
                  }
                  aria-hidden="true"
                >
                  0{stepIndex + 1}
                </span>
                <h3 className="mb-2">{t(title)}</h3>
                <p className="text-[0.94rem] text-muted">
                  {description ? (
                    t(description)
                  ) : (
                    <>
                      {t('join.addressPrefix')}
                      <IpText className="p-[0.08em_0.42em] rounded-[6px] bg-surface [border:1px_solid_var(--line-strong)] text-[0.96em]" />
                      {t('join.addressSuffix')}
                    </>
                  )}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-[40px]">
          <IpBar />
        </div>
      </div>
    </section>
  );
}
