import type { ZodType } from 'zod';

export async function readJsonResponse<T>(
  response: Response,
  schema: ZodType<T>,
): Promise<T | null> {
  if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
    return null;
  }

  const body: unknown = await response.json();
  const result = schema.safeParse(body);

  return result.success ? result.data : null;
}
