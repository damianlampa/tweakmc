import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { createStripeCheckout } from '../api';

export function useStripeCheckout() {
  const { mutate, isPending, data, reset } = useMutation({ mutationFn: createStripeCheckout });
  const redirecting = data?.mode === 'live';

  useEffect(() => {
    if (!redirecting) return;

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) reset();
    };

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, [redirecting, reset]);

  return { startCheckout: mutate, submitting: isPending || redirecting };
}
