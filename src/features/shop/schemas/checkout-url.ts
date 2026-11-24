import { z } from 'zod';

const checkoutUrl = z.union([z.httpUrl(), z.string().regex(/^\/(?![/\\])/)]);

export const checkoutUrlSchema = z.union([
  z.object({ url: checkoutUrl }).transform(({ url }) => url),
  z.object({ checkoutUrl }).transform(({ checkoutUrl }) => checkoutUrl),
]);
