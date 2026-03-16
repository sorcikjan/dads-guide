import { useState, useCallback } from 'react';

const STORAGE_KEY = 'dads-guide:followed-sports';

function loadFollowed(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    // ignore
  }
  return new Set();
}

function saveFollowed(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

export function useSports() {
  const [followed, setFollowed] = useState<Set<string>>(loadFollowed);

  const toggle = useCallback((sportId: string) => {
    setFollowed(prev => {
      const next = new Set(prev);
      if (next.has(sportId)) {
        next.delete(sportId);
      } else {
        next.add(sportId);
      }
      saveFollowed(next);
      return next;
    });
  }, []);

  const isFollowing = useCallback(
    (sportId: string) => followed.has(sportId),
    [followed],
  );

  return { followed, toggle, isFollowing };
}
