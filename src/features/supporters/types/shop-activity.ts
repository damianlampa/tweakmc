import type { z } from 'zod';
import type { shopActivitySchema } from '../schemas/shop-activity';

export type ShopActivity = z.infer<typeof shopActivitySchema> & { isPreview: boolean };
