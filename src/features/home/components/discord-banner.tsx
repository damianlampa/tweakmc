import { elevatedPageGlow, cardSpotlight } from '@/shared/styles/background-classes';
import { buttonClasses } from '@/shared/components/button-classes';
import { useTranslation } from 'react-i18next';
import { site } from '@/shared/config/site';
import { type Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/section-decor';
import { Icon } from '@/shared/components/icons';
import { onCardMove } from '@/shared/utils/card-glow';
import { WaveWord } from './wave-word';

const DISCORD_CHANNELS = [
  { name: '#ogłoszenia', desc: 'discord.news' },
  { name: '#rekrutacja-państw', desc: 'discord.recruit' },
  { name: '#konkursy', desc: 'discord.rewards' },
  { name: '#propozycje', desc: 'discord.ideas' },
];

export function DiscordBanner({ settings }: { settings: Settings }) {
  const { t } = useTranslation();

  return (
    <section
      className={
        'relative overflow-hidden [border-top:1px_solid_theme(colors.white/9%)] ' +
        elevatedPageGlow +
        ' ' +
        '[padding-block:clamp(64px,_9vh,_104px)]'
      }
      id="discord"
    >
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft="DISCORD // LIVE"
        labelRight={t('discord.tag')}
      />

      <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
        <div
          className={
            'discord-card grid grid-cols-[minmax(0,_1.05fr)_minmax(0,_0.95fr)] gap-[clamp(28px,_4.5vw,_56px)] ' +
            'items-center p-[clamp(26px,_4vw,_48px)] rounded-[20px] [border:1px_solid_rgb(99_120_255_/_0.52)] ' +
            '[background:radial-gradient(520px_360px_at_85%_18%,_theme(colors.discord/42%),_transparent_70%),_radial-gradient(460px_340px_at_14%_88%,_theme(colors.blue.600/34%),_transparent_72%),_linear-gradient(135deg,_#0d1638_0%,_#111c48_52%,_#0a122e_100%)] ' +
            '[box-shadow:inset_0_1px_0_rgb(147_165_255_/_0.32),_0_24px_60px_-24px_rgb(17_28_72_/_0.9)] ' +
            "overflow-hidden max-lg:grid-cols-[minmax(0,_1fr)] relative [&::before]:[content:''] [&::before]:absolute " +
            '[&::before]:inset-0 [&::before]:rounded-[inherit] ' +
            cardSpotlight +
            ' ' +
            '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none ' +
            '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1] ' +
            '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_theme(colors.indigo.400/20%),_transparent_62%_)]'
          }
          onPointerMove={onCardMove}
        >
          <div className="discord-copy">
            <div className="inline-flex items-center gap-2.5 mb-[18px] text-sm/relaxed font-semibold text-ink">
              <span
                className={
                  'relative w-[8px] h-[8px] rounded-[50%] bg-green-500 [box-shadow:0_0_10px_theme(colors.green.500/70%)] ' +
                  "[&::after]:[content:''] [&::after]:absolute [&::after]:inset-[-4px] [&::after]:rounded-[50%] " +
                  '[&::after]:[border:1.5px_solid_theme(colors.green.500)] [&::after]:animate-status-ping'
                }
                aria-hidden="true"
              />
              <span>{t('discord.community')}</span>
            </div>
            <h2 className="discord-h2">
              {t('discord.title')}
              <WaveWord text={t('discord.discord')} className="text-discord-light" />
            </h2>
            <p className="mt-4 max-w-[58ch] text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted text-base/relaxed">
              {t('discord.description')}
            </p>

            <div className="flex flex-wrap items-center gap-[14px] mt-[28px]">
              <a
                className={buttonClasses('discord')}
                href={site.discordUrl}
                target="_blank"
                rel="noreferrer"
              >
                {Icon.discord}
                <span>{t('discord.join')}</span>
                {Icon.arrow}
              </a>
              <code
                className={
                  'font-mono text-sm/relaxed p-[12px_16px] rounded-[10px] bg-background christmas:bg-christmas-background halloween:bg-halloween-background ' +
                  'spring:bg-spring-background [border:1px_solid_theme(colors.white/18%)] text-muted christmas:text-christmas-muted halloween:text-halloween-muted ' +
                  'spring:text-spring-muted'
                }
              >
                {site.discordLabel}
              </code>
            </div>
          </div>

          <div
            className="grid gap-3 p-[18px] rounded-[16px] [background:rgb(8_13_34_/_0.78)] [border:1px_solid_theme(colors.indigo.400/28%)]"
            aria-hidden="true"
          >
            <div
              className={
                'flex items-center gap-[12px] pb-[12px] [border-bottom:1px_solid_theme(colors.white/9%)] [&_strong]:block ' +
                '[&_strong]:text-base/tight [&>div_span]:block [&>div_span]:text-xs/relaxed ' +
                '[&>div_span]:text-muted christmas:[&>div_span]:text-christmas-muted halloween:[&>div_span]:text-halloween-muted spring:[&>div_span]:text-spring-muted'
              }
            >
              <span className="w-[40px] h-[40px] shrink-0 rounded-[10px] bg-discord text-white grid place-items-center">
                {Icon.discord}
              </span>
              <div>
                <strong>{t('discord.official')}</strong>
                <span>{t('discord.channels')}</span>
              </div>
              <span
                className={
                  '[&_i]:w-[6px] [&_i]:h-[6px] [&_i]:rounded-[50%] [&_i]:bg-discord-light [&_i]:animate-typing-pulse ' +
                  '[&_i:nth-child(2)]:[animation-delay:0.2s] [&_i:nth-child(3)]:[animation-delay:0.4s] ml-auto inline-flex ' +
                  'gap-[4px] items-center'
                }
              >
                <i />
                <i />
                <i />
              </span>
            </div>

            <ul
              className={
                '[&_li]:flex [&_li]:flex-col [&_li]:gap-[2px] [&_li]:p-[10px_14px] [&_li]:rounded-[10px] ' +
                '[&_li]:bg-overlay/[0.72] [&_li]:[border:1px_solid_theme(colors.white/9%)] ' +
                '[&_li]:[transition:transform_0.25s_var(--ease),_border-color_0.25s] [&_li]:animate-channel-glide ' +
                '[&_li]:[animation-delay:calc(var(--i,_0)_*_-1.4s)] [&_li:hover]:[transform:translateX(6px)] ' +
                '[&_li:hover]:border-discord/65 list-none m-0 p-0 grid gap-[9px]'
              }
            >
              {DISCORD_CHANNELS.map((channel, channelIndex) => {
                return (
                  <li key={channel.name} style={{ '--i': channelIndex }}>
                    <span className="font-mono text-sm/relaxed font-semibold text-indigo-300">
                      {channel.name}
                    </span>
                    <span className="text-sm/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted">
                      {t(channel.desc)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
