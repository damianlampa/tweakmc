export interface AdminStats {
  isPreview: boolean;
  totalRevenue: number;
  monthRevenue: number;
  totalTransactions: number;
  avgOrder: number;
  daily: { day: string; amount: number }[];
  transactions: {
    id: string;
    nick: string;
    amount: number;
    method: string;
    status: string;
    time: string;
  }[];
}
