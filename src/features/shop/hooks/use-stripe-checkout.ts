import { useMutation } from '@tanstack/react-query';
import { createStripeCheckout } from '../api';

export function useStripeCheckout() {
  return useMutation({ mutationFn: createStripeCheckout });
}
