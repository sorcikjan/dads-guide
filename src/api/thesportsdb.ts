import type { SportEvent, Broadcaster, BroadcasterType } from '../types';

const API_BASE = 'https://www.thesportsdb.com/api/v1/json/3';

// TheSportsDB league IDs for each sport (verified via API)
export const LEAGUES_BY_SPORT: Record<string, number[]> = {
  'football':          [4328, 4335, 4480, 4331, 4332, 4334, 4481],
  'cricket':           [4461, 4475],
  'basketball':        [4387],
  'american-football': [4391],
  'tennis':            [4464, 4517],
  'volleyball':        [5848, 5849],
  'table-tennis':      [],
  'ice-hockey':        [4380],
  'rugby':             [4416],
  'formula1':          [4370],
  'baseball':          [4424],
  'golf':              [],
  'boxing':            [],
  'mma':               [],
  'cycling':           [4465],
};

// Broadcaster type classifier
const STREAMING_KEYWORDS = [
  'dazn', 'amazon', 'prime video', 'discovery+', 'peacock', 'paramount+',
  'espn+', 'f1 tv', 'nba league pass', 'mlb.tv', 'nhl.tv', 'gcn+', 'fubo',
  'sky go', 'now tv', 'itvx', 'bbc iplayer', 'all 4', 'hotstar', 'jiostar',
];
const FREE_TO_AIR_KEYWORDS = [
  'bbc one', 'bbc two', 'bbc sport', 'itv', 'channel 4', 'channel 5',
  'abc', 'cbs', 'nbc', 'fox', 'rai', 'zdf', 'ard', 'rtl', 'tf1',
  'france 2', 'france 3', 'sbs',
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
  return raw.slice(0, 5); // "HH:MM:SS+00:00" → "HH:MM"
}

interface RawEvent {
  idEvent: string;
  strEvent: string;
  strLeague: string | null;
  strSport: string;
  dateEvent: string | null;
  strTime: string | null;
  strTVStation: string | null;
}

function mapEvent(raw: RawEvent, sportId: string): SportEvent | null {
  if (!raw.dateEvent) return null;
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

// Cache by leagueId → avoids re-fetching when switching dates
const cache = new Map<number, SportEvent[]>();

async function fetchLeagueEvents(leagueId: number, sportId: string): Promise<SportEvent[]> {
  if (cache.has(leagueId)) return cache.get(leagueId)!;

  const [nextRes, pastRes] = await Promise.allSettled([
    fetch(`${API_BASE}/eventsnextleague.php?id=${leagueId}`),
    fetch(`${API_BASE}/eventspastleague.php?id=${leagueId}`),
  ]);

  const events: SportEvent[] = [];

  for (const res of [nextRes, pastRes]) {
    if (res.status !== 'fulfilled' || !res.value.ok) continue;
    const json = await res.value.json();
    for (const raw of json.events ?? []) {
      const mapped = mapEvent(raw as RawEvent, sportId);
      if (mapped) events.push(mapped);
    }
  }

  cache.set(leagueId, events);
  return events;
}

export async function fetchEventsForSports(sportIds: string[]): Promise<SportEvent[]> {
  const tasks: Promise<SportEvent[]>[] = [];

  for (const sportId of sportIds) {
    const leagueIds = LEAGUES_BY_SPORT[sportId] ?? [];
    for (const leagueId of leagueIds) {
      tasks.push(fetchLeagueEvents(leagueId, sportId));
    }
  }

  const results = await Promise.allSettled(tasks);
  return results.flatMap(r => (r.status === 'fulfilled' ? r.value : []));
}
