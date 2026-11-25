import '@/shared/i18n/i18n';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/space-grotesk';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from '@/app';

const root = document.getElementById('root');
if (!root) throw new Error('Missing application root element.');

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
