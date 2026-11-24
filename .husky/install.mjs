import { warn } from 'node:console';
import process from 'node:process';

if (process.env.NODE_ENV !== 'production' && process.env.HUSKY !== '0') {
  const { default: install } = await import('husky');
  const message = install();
  if (message) warn(message);
}
