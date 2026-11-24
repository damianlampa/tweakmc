import { z } from 'zod';

export const settingsSaveConfirmationSchema = z.object({ saved: z.literal(true) });
