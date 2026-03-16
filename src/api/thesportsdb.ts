import type { SportEvent, Broadcaster, BroadcasterType } from '../types';

const API_BASE = 'https://www.thesportsdb.com/api/v1/json/3';

// Map our sport IDs to TheSportsDB sport name query param
export const SPORT_NAME_MAP: Record<string, string> = {
  'football':          'Soccer',
  'cricket':           'Cricket',
  'basketball':        'Basketball',
  'american-football': 'American Football',
  'tennis':            'Tennis',
  'volleyball':        'Volleyball',
  'table-tennis':      'Table Tennis',
  'ice-hockey':        'Ice Hockey',
  'rugby':             'Rugby',
  'formula1':          'Motorsport',
  'baseball':          'Baseball',
  'golf':              'Golf',
  'boxing':            'Boxing',
  'mma':               'Fighting',
  'cycling':           'Cycling',
};

// Rough broadcaster type classifier
const STREAMING_KEYWORDS = [
  'dazn', 'amazon', 'prime', 'discovery+', 'peacock', 'paramount',
  'espn+', 'f1 tv', 'nba league pass', 'mlb.tv', 'nhl.tv', 'draftking',
  'jiostar', 'hotstar', 'gcn+', 'fubo', 'sky go', 'now tv', 'itvx',
  'bbc iplayer', 'channel 4', 'all 4',
];
const FREE_TO_AIR_KEYWORDS = [
  'bbc', 'itv', 'channel 4', 'channel 5', 'abc', 'cbs', 'nbc',
  'rai', 'zdf', 'ard', 'rtl', 'tf1', 'france 2', 'france 3', 'sbs',
];

function classifyBroadcaster(name: string): BroadcasterType {
  const lower = name.toLowerCase();
  if (STREAMING_KEYWORDS.some(k => lower.includes(k))) return 'streaming';
  if (FREE_TO_AIR_KEYWORDS.some(k => lower.includes(k))) return 'free-to-air';
  return 'cable';
}

function parseBroadcasters(raw: string | null): Broadcaster[] {
  if (!raw) return [];
  return raw
    .split(/[,;\/]/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(name => ({ name, type: classifyBroadcaster(name) }));
}

function parseTime(raw: string | null): string {
  if (!raw) return '';
  // TheSportsDB returns "HH:MM:SS+00:00" or "HH:MM:SS"
  return raw.slice(0, 5);
}

interface RawEvent {
  idEvent: string;
  strEvent: string;
  strLeague: string | null;
  strSport: string;
  dateEvent: string;
  strTime: string | null;
  strTVStation: string | null;
}

function mapEvent(raw: RawEvent, sportId: string): SportEvent {
  return {
    id: raw.idEvent,
    sportId,
    title: raw.strEvent,
    subtitle: raw.strLeague ?? undefined,
    date: raw.dateEvent,
    startTime: parseTime(raw.strTime),
    broadcasters: parseBroadcasters(raw.strTVStation),
  };
}

// Simple in-memory cache so switching dates doesn't re-fetch
const cache = new Map<string, SportEvent[]>();

export async function fetchEventsByDateAndSport(
  date: string,
  sportId: string,
): Promise<SportEvent[]> {
  const key = `${date}|${sportId}`;
  if (cache.has(key)) return cache.get(key)!;

  const sportName = SPORT_NAME_MAP[sportId];
  if (!sportName) return [];

  const url = `${API_BASE}/eventsday.php?d=${date}&s=${encodeURIComponent(sportName)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TheSportsDB error: ${res.status}`);

  const json = await res.json();
  const events: SportEvent[] = (json.events ?? []).map((e: RawEvent) => mapEvent(e, sportId));

  cache.set(key, events);
  return events;
}

export async function fetchEventsForDate(
  date: string,
  sportIds: string[],
): Promise<SportEvent[]> {
  const results = await Promise.allSettled(
    sportIds.map(id => fetchEventsByDateAndSport(date, id)),
  );

  return results.flatMap(r => (r.status === 'fulfilled' ? r.value : []));
}
