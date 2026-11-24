import type { z } from 'zod';
import type { adminStatsSchema } from '../schemas/admin-stats';

export type AdminStats = z.infer<typeof adminStatsSchema> & { isPreview: boolean };
