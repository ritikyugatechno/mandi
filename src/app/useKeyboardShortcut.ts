'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useKeyboardShortcut = (keyCombo: string, url: string) => {
  const router = useRouter();
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keys = keyCombo.split('+');
      const altKey = keys.includes('Alt');
      const key = keys[keys.length - 1];

      if (
        event.altKey === altKey &&
        event.key === key
      ) {
        event.preventDefault(); // Prevent the default action for the key combination
        window.location.href = url
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyCombo, url, router]);
};

export default useKeyboardShortcut;
