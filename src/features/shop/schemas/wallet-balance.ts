import { z } from 'zod';

const amountSchema = z.union([z.number(), z.string().trim().min(1).pipe(z.coerce.number())]);

export const walletBalanceSchema = z.union([
  z.object({ balance: amountSchema }).transform(({ balance }) => balance),
  z.object({ wallet: amountSchema }).transform(({ wallet }) => wallet),
  z.object({ amount: amountSchema }).transform(({ amount }) => amount),
]);
