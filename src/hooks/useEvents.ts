import { useState, useEffect } from 'react';
import type { SportEvent } from '../types';
import { fetchEventsForSports } from '../api/thesportsdb';
import { ALL_SPORTS } from '../data/sports';

// Shown when nothing is followed
const DEFAULT_SPORTS = ['football', 'formula1', 'tennis', 'basketball', 'cycling', 'rugby'];

interface UseEventsResult {
  allEvents: SportEvent[];
  loading: boolean;
  error: string | null;
}

export function useEvents(followedSports: Set<string>): UseEventsResult {
  const [allEvents, setAllEvents] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const sportIds = followedSports.size > 0
      ? ALL_SPORTS.filter(s => followedSports.has(s.id)).map(s => s.id)
      : DEFAULT_SPORTS;

    setLoading(true);
    setError(null);

    fetchEventsForSports(sportIds)
      .then(data => {
        if (!cancelled) {
          setAllEvents(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load events');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [followedSports]);

  return { allEvents, loading, error };
}
