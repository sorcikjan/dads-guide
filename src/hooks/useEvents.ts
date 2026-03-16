import { useState, useEffect } from 'react';
import type { SportEvent } from '../types';
import { fetchEventsForDate } from '../api/espn';
import { ALL_SPORTS } from '../data/sports';

const DEFAULT_SPORTS = ['football', 'formula1', 'tennis', 'basketball', 'ice-hockey', 'baseball'];

interface UseEventsResult {
  events: SportEvent[];
  loading: boolean;
  error: string | null;
}

export function useEvents(date: string, followedSports: Set<string>): UseEventsResult {
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const sportIds = followedSports.size > 0
      ? ALL_SPORTS.filter(s => followedSports.has(s.id)).map(s => s.id)
      : DEFAULT_SPORTS;

    setLoading(true);
    setError(null);

    fetchEventsForDate(date, sportIds)
      .then(data => {
        if (!cancelled) {
          setEvents(data.sort((a, b) => a.startTime.localeCompare(b.startTime)));
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
  }, [date, followedSports]);

  return { events, loading, error };
}
