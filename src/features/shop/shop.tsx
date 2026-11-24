import type { PageProps } from '@/shared/types/page';
import { Supporters } from '@/features/supporters';
import { SectionDecor } from '@/shared/components/side-decor';
import { TopUpForm } from './components/top-up-form';
export default function ShopPage({ settings, navigate }: PageProps) {
  if (!settings.sections.shopPage) {
    return (
      <section className="page-shell sec-dark">
        <SectionDecor
          theme={settings.theme}
          variant="both"
          labelLeft="SKLEP // OFFLINE"
          labelRight="TWEAKMC.PL"
        />
        <div className="wrap">
          <div className="disabled-card">
            <span className="disabled-tag">Sklep tymczasowo niedostępny</span>
            <h1>Sklep TweakMC chwilowo wyłączony</h1>
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              {settings.maintenanceMsg}
            </p>
            <div className="tw-flex tw-flex-wrap tw-gap-[12px] tw-mt-[28px]">
              <a
                href="/"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
              >
                Wróć na stronę główną
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell sec-elev">
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft="SKLEP // PORTFEL"
        labelRight="STRIPE // AUTO"
      />
      <div className="wrap">
        <div className="tw-flex tw-flex-wrap tw-justify-between tw-items-end tw-gap-[20px] tw-mb-[32px]">
          <div>
            <a
              href="/"
              className="back-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              ← Powrót na stronę główną
            </a>
            <h1 className="tw-text-[clamp(2.4rem,_5vw,_4rem)] tw-mt-[10px]">
              Doładuj swój <span className="tw-text-accent-bright">portfel</span>
            </h1>
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              Wpisz nick z Minecrafta i wybierz kwotę. Po opłaceniu przez Stripe plugin
              automatycznie dopisuje środki pod komendę{' '}
              <code className="inline-code">/portfel</code> na całej sieci TweakMC.
            </p>
          </div>
        </div>

        <TopUpForm />

        {settings.sections.topboards && (
          <div className="tw-mt-[32px]">
            <Supporters />
          </div>
        )}
      </div>
    </section>
  );
}
