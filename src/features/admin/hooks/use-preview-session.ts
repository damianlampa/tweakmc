import { useState } from 'react';

const SESSION_KEY = 'tweakmc-admin-auth';
export function usePreviewSession() {
  const [authed, setAuthed] = useState(() => {
    try {
      return window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      return false;
    }
  });
  const handleLogin = () => {
    setAuthed(true);
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // ignore
    }
  };
  const handleLogout = () => {
    setAuthed(false);
    try {
      window.sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  };

  return { authed, handleLogin, handleLogout };
}
