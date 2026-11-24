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
    <section className="sec sec-elev sec-discord" id="discord">
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft="DISCORD // LIVE"
        labelRight={t('discord.tag')}
      />

      <div className="wrap">
        <div className="discord-card glow-card" onPointerMove={onCardMove}>
          <div className="discord-copy">
            <div className="tw-inline-flex tw-items-center tw-gap-[10px] tw-mb-[18px] tw-text-[0.88rem] tw-font-semibold tw-text-ink">
              <span className="live-dot" aria-hidden="true" />
              <span>{t('discord.community')}</span>
            </div>
            <h2 className="discord-h2">
              {t('discord.title')}
              <WaveWord text={t('discord.discord')} className="discord-accent" />
            </h2>
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              {t('discord.description')}
            </p>

            <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-[14px] tw-mt-[28px]">
              <a
                className="btn btn-discord"
                href={site.discordUrl}
                target="_blank"
                rel="noreferrer"
              >
                {Icon.discord}
                <span>{t('discord.join')}</span>
                {Icon.arrow}
              </a>
              <code className="discord-url">{site.discordLabel}</code>
            </div>
          </div>

          <div className="discord-preview" aria-hidden="true">
            <div className="discord-panel-head">
              <span className="discord-badge">{Icon.discord}</span>
              <div>
                <strong>{t('discord.official')}</strong>
                <span>{t('discord.channels')}</span>
              </div>
              <span className="typing-dots tw-ml-auto tw-inline-flex tw-gap-[4px] tw-items-center">
                <i />
                <i />
                <i />
              </span>
            </div>

            <ul className="discord-channels tw-list-none tw-m-0 tw-p-0 tw-grid tw-gap-[9px]">
              {DISCORD_CHANNELS.map((channel, channelIndex) => {
                return (
                  <li key={channel.name} style={{ '--i': channelIndex }}>
                    <span className="ch-name">{channel.name}</span>
                    <span className="tw-text-[0.82rem] tw-text-muted">{t(channel.desc)}</span>
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
