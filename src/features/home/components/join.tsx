import { homeSections } from '@/router/paths';
import { type Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/section-decor';
import { IpText, IpBar } from '@/shared/server-ip';
import { onCardMove } from '@/shared/utils/card-glow';
import { KineticHeading } from './kinetic-heading';

const STEPS = [
  ['Odpal Minecrafta', 'Uruchom Minecraft Java Edition na swoim koncie i wejdź do głównego menu.'],
  ['Gra wieloosobowa', 'Wybierz zakładkę Gra wieloosobowa, a następnie kliknij Dodaj serwer.'],
  ['Wpisz adres', null],
  [
    'Wybierz tryb i graj',
    'Dołącz na sieć, wybierz EarthSMP (lub kolejne tryby) i wpadnij na Discorda.',
  ],
];

export function Join({ settings }: { settings: Settings }) {
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
          <KineticHeading text="Na serwerze w czterech krokach" accentWord="krokach" />
          <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
            Nie potrzebujesz paczek modów do samego wejścia. Kopiujesz adres i grasz.
          </p>
        </div>

        <ol className="steps tw-relative tw-list-none tw-m-[40px_0_0] tw-p-0 tw-grid tw-grid-cols-[repeat(4,_minmax(0,_1fr))] tw-gap-[16px]">
          {STEPS.map(([title, description], stepIndex) => {
            return (
              <li key={title} className="step-card glow-card" onPointerMove={onCardMove}>
                <span className="step-n" aria-hidden="true">
                  0{stepIndex + 1}
                </span>
                <h3>{title}</h3>
                <p>
                  {description ?? (
                    <>
                      W polu adresu serwera wpisz <IpText className="ip-inline" /> i zatwierdź
                      przyciskiem Gotowe.
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
