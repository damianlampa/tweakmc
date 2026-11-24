export interface Donor {
  nick: string;
  amount: number;
}
export interface ShopActivity {
  isPreview: boolean;
  topDonors: Donor[];
  recentPurchases: (Donor & { timeAgo: string })[];
}
