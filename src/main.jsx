import { createRoot } from 'react-dom/client';
import './styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing application root element.');

createRoot(root).render(
  <main className="tw:mx-auto tw:max-w-xl tw:p-8">
    <h1 className="tw:text-2xl tw:font-bold">TweakMC</h1>
    <p className="tw:mt-3">Website coming soon.</p>
  </main>,
);
