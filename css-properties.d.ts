import 'react';

declare module 'react' {
  interface CSSProperties {
    '--ci'?: number;
    '--wi'?: number;
    '--i'?: number;
  }
}
