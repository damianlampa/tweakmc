import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, networkMode: 'always' },
    // Submit immediately or report the fallback. Never replay a checkout after reconnect.
    mutations: { retry: false, networkMode: 'always' },
  },
});
