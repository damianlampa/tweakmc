import { useTranslation } from 'react-i18next';
import { onCardMove } from '@/shared/utils/card-glow';
import { formatPln } from '@/shared/utils/format-shop-amount';
import { PlayerAvatar } from './components';
import { useShopActivity } from './hooks/use-shop-activity';

export function Supporters() {
  const { t, i18n } = useTranslation();

  const activity = useShopActivity();

  return (
    <div className="shop-board tw-grid tw-grid-cols-[minmax(0,_1fr)_minmax(0,_1.15fr)] tw-gap-[20px] tw-mt-[36px]">
      <div className="board-card board-podium glow-card" onPointerMove={onCardMove}>
        <div className="board-head tw-flex tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[16px]">
          <h3>{t('supporters.top')}</h3>
          {activity.isPreview && <span className="board-tag">{t('supporters.preview')}</span>}
        </div>

        <ol className="podium" aria-label={t('supporters.podium')}>
          {[1, 0, 2].map((rankId) => {
            const donor = activity.topDonors[rankId];

            if (!donor) return null;

            const place = rankId + 1;

            return (
              <li key={`${donor.nick}-${place}`} className={`podium-slot podium-place-${place}`}>
                <div className="podium-player tw-flex tw-flex-col tw-items-center tw-gap-[6px] tw-mb-[10px] tw-w-full tw-text-center">
                  <PlayerAvatar key={donor.nick} nick={donor.nick} />
                  <span className="donor-nick">{donor.nick}</span>
                  <strong className="donor-amt">{formatPln(donor.amount, i18n.language)}</strong>
                </div>

                <div className="podium-step" aria-hidden="true">
                  <span>#{place}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="board-card glow-card" onPointerMove={onCardMove}>
        <div className="board-head tw-flex tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[16px]">
          <h3>{t('supporters.recent')}</h3>
          {activity.isPreview && <span className="board-tag">{t('supporters.preview')}</span>}
        </div>

        <ul className="recent-list tw-list-none tw-m-0 tw-p-0 tw-grid tw-gap-[8px]">
          {activity.recentPurchases.map((purchase, purchaseIndex) => {
            return (
              <li key={`${purchase.nick}-${purchaseIndex}`}>
                <PlayerAvatar key={purchase.nick} nick={purchase.nick} />

                <div className="tw-flex tw-items-baseline tw-gap-[8px] tw-min-w-0 tw-flex-wrap">
                  <span className="donor-nick">{purchase.nick}</span>
                  <span className="tw-text-[0.78rem] tw-text-muted">
                    {activity.isPreview ? t(purchase.timeAgo) : purchase.timeAgo}
                  </span>
                </div>

                <strong className="recent-amt">+{formatPln(purchase.amount, i18n.language)}</strong>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
