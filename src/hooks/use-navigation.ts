import { useCallback, useEffect, useState } from 'react';
import { type Route } from '../types/page';

function getCurrentRoute(): Route {
  const p = window.location.pathname.replace(/\/+$/, '') || '/';
  if (p === '/sklep' || p === '/mapa' || p === '/admin') return p;
  return '/';
}

export function useNavigation() {
  const [route, setRoute] = useState(() => getCurrentRoute());

  const navigate = useCallback((href: string) => {
    const [rawPath, hash] = href.split('#');
    const targetPath = rawPath ? rawPath.replace(/\/+$/, '') || '/' : '/';
    const url = hash ? `${targetPath === '/' ? '/' : targetPath}#${hash}` : targetPath;
    if (window.location.pathname + window.location.hash !== url) {
      window.history.pushState({}, '', url);
    }
    setRoute(
      targetPath === '/sklep' || targetPath === '/mapa' || targetPath === '/admin'
        ? targetPath
        : '/',
    );
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    const onPop = () => setRoute(getCurrentRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return { route, navigate };
}
