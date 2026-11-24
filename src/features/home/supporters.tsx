import { useEffect, useState } from 'react';
import { type PageProps } from '../../types/page';
import { fetchShopActivity, PREVIEW_SHOP_ACTIVITY } from '../../api/shop';
import { SectionDecor } from '../../components/side-decor';
import { ShopBoards } from '../../components/shop-boards';
import { Icon } from '../../components/icons';
import { KineticHeading } from '../../components/animated-heading';

export function HomeBoards({ settings, navigate }: PageProps) {
  const [activity, setActivity] = useState(PREVIEW_SHOP_ACTIVITY);
  useEffect(() => {
    const ctrl = new AbortController();
    fetchShopActivity(ctrl.signal)
      .then((d) => setActivity(d))
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

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
        <ShopBoards activity={activity} userIcon={Icon.user} />
      </div>
    </section>
  );
}
