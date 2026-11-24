import { site } from '@/shared/config/site';
import { type Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/section-decor';
import { Icon } from '@/shared/components/icons';
import { onCardMove } from '@/shared/utils/card-glow';
import { WaveWord } from './wave-word';

const DISCORD_CHANNELS = [
  { name: '#ogłoszenia', desc: 'Starty sezonów, patche i nowe tryby' },
  { name: '#rekrutacja-państw', desc: 'Znajdź ekipę albo zrekrutuj graczy' },
  { name: '#konkursy', desc: 'Nagrody i doładowania /portfel' },
  { name: '#propozycje', desc: 'Twój głos w rozwoju sieci TweakMC' },
];

export function DiscordBanner({ settings }: { settings: Settings }) {
  return (
    <section className="sec sec-elev sec-discord" id="discord">
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft="DISCORD // LIVE"
        labelRight="SPOŁECZNOŚĆ"
      />

      <div className="wrap">
        <div className="discord-card glow-card" onPointerMove={onCardMove}>
          <div className="discord-copy">
            <div className="tw-inline-flex tw-items-center tw-gap-[10px] tw-mb-[18px] tw-text-[0.88rem] tw-font-semibold tw-text-ink">
              <span className="live-dot" aria-hidden="true" />
              <span>Społeczność TweakMC</span>
            </div>
            <h2 className="discord-h2">
              Wpadnij na naszego <WaveWord text="Discorda" className="discord-accent" />
            </h2>
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              Tu dzieją się ogłoszenia, konkursy, zapowiedzi kolejnych trybów i rekrutacja do państw
              na EarthSMP.
            </p>

            <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-[14px] tw-mt-[28px]">
              <a
                className="btn btn-discord"
                href={site.discordUrl}
                target="_blank"
                rel="noreferrer"
              >
                {Icon.discord}
                <span>Dołącz na Discorda</span>
                {Icon.arrow}
              </a>
              <code className="discord-url">{site.discordLabel}</code>
            </div>
          </div>

          <div className="discord-preview" aria-hidden="true">
            <div className="discord-panel-head">
              <span className="discord-badge">{Icon.discord}</span>
              <div>
                <strong>TweakMC · Oficjalny serwer</strong>
                <span>Aktywne kanały społeczności</span>
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
                    <span className="tw-text-[0.82rem] tw-text-muted">{channel.desc}</span>
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
