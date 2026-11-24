import { type PageProps } from '@/shared/types/page';
import { SectionDecor } from '@/shared/components/side-decor';
import { Supporters } from '@/features/supporters';
import { Icon } from '@/shared/components/icons';
import { KineticHeading } from './animated-heading';

export function HomeBoards({ settings, navigate }: PageProps) {
  return (
    <section className="sec sec-dark" id="topki">
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft="TOPKI // PORTFEL"
        labelRight="SKLEP // STRIPE"
      />
      <div className="wrap">
        <div className="tw-flex tw-flex-wrap tw-justify-between tw-items-end tw-gap-[24px] tw-mb-[32px]">
          <div>
            <KineticHeading text="Wspierający sieć TweakMC" accentWord="TweakMC" />
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              Top 3 wpłat i ostatnie doładowania <code className="inline-code">/portfel</code>.
              Doładowanie zrobisz na osobnej podstronie sklepu.
            </p>
          </div>
          {settings.sections.shopPage && (
            <a
              href="/sklep"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate('/sklep');
              }}
            >
              <span>Przejdź do sklepu</span>
              {Icon.arrow}
            </a>
          )}
        </div>
        <Supporters />
      </div>
    </section>
  );
}
