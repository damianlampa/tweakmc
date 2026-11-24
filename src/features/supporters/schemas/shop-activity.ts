import { z } from 'zod';

const donorSchema = z.object({ nick: z.string(), amount: z.number() });
const purchaseSchema = donorSchema.extend({ timeAgo: z.string() });

export const shopActivitySchema = z.object({
  topDonors: z
    .array(donorSchema.nullable().catch(null))
    .catch([])
    .transform((rows) => rows.filter((row) => row !== null).slice(0, 3)),
  recentPurchases: z
    .array(purchaseSchema.nullable().catch(null))
    .catch([])
    .transform((rows) => rows.filter((row) => row !== null).slice(0, 5)),
});
