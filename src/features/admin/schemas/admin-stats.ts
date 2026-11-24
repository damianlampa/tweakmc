import { z } from 'zod';

export const adminStatsSchema = z.object({
  totalRevenue: z.number(),
  monthRevenue: z.number(),
  totalTransactions: z.number(),
  avgOrder: z.number(),
  daily: z.array(z.object({ day: z.string(), amount: z.number() })),
  transactions: z.array(
    z.object({
      id: z.string(),
      nick: z.string(),
      amount: z.number(),
      method: z.string(),
      status: z.string(),
      time: z.string(),
    }),
  ),
});
