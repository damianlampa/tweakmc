import type { ShopActivity } from '../types/shop-activity';

export const PREVIEW_SHOP_ACTIVITY: ShopActivity = {
  isPreview: true,
  topDonors: [
    { nick: 'Gracz_01', amount: 250 },
    { nick: 'Gracz_02', amount: 150 },
    { nick: 'Gracz_03', amount: 100 },
  ],
  recentPurchases: [
    { nick: 'Gracz_01', amount: 50, timeAgo: 'preview.justNow' },
    { nick: 'Gracz_04', amount: 25, timeAgo: 'preview.twelveMinutes' },
    { nick: 'Gracz_02', amount: 100, timeAgo: 'preview.thirtyEightMinutes' },
    { nick: 'Gracz_05', amount: 10, timeAgo: 'preview.hour' },
    { nick: 'Gracz_03', amount: 50, timeAgo: 'preview.twoHours' },
  ],
};
