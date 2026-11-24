import type { ShopActivity } from '../types/shop-activity';

export const PREVIEW_SHOP_ACTIVITY: ShopActivity = {
  isPreview: true,
  topDonors: [
    { nick: 'Gracz_01', amount: 250 },
    { nick: 'Gracz_02', amount: 150 },
    { nick: 'Gracz_03', amount: 100 },
  ],
  recentPurchases: [
    { nick: 'Gracz_01', amount: 50, timeAgo: 'przed chwilą' },
    { nick: 'Gracz_04', amount: 25, timeAgo: '12 min temu' },
    { nick: 'Gracz_02', amount: 100, timeAgo: '38 min temu' },
    { nick: 'Gracz_05', amount: 10, timeAgo: '1 godz. temu' },
    { nick: 'Gracz_03', amount: 50, timeAgo: '2 godz. temu' },
  ],
};
