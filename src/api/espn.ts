import type { SportEvent, Broadcaster, BroadcasterType } from '../types';

const BASE = 'https://site.api.espn.com/apis/site/v2/sports';

// ESPN endpoints per sport: [espnSport, espnLeague]
const ENDPOINTS: Record<string, [string, string][]> = {
  'football':           [
    ['soccer', 'eng.1'],        // Premier League
    ['soccer', 'esp.1'],        // La Liga
    ['soccer', 'ger.1'],        // Bundesliga
    ['soccer', 'ita.1'],        // Serie A
    ['soccer', 'fra.1'],        // Ligue 1
    ['soccer', 'UEFA.CHAMPIONS'],
    ['soccer', 'UEFA.EUROPA'],
  ],
  'basketball':         [['basketball', 'nba']],
  'american-football':  [['football', 'nfl']],
  'baseball':           [['baseball', 'mlb']],
  'ice-hockey':         [['hockey', 'nhl']],
  'tennis':             [['tennis', 'atp'], ['tennis', 'wta']],
  'formula1':           [['racing', 'f1']],
  'golf':               [['golf', 'leaderboard']],
  // Below sports not well covered by ESPN — returns empty gracefully
  'cricket':            [],
  'rugby':              [],
  'cycling':            [],
  'volleyball':         [],
  'table-tennis':       [],
  'boxing':             [],
  'mma':                [],
};

function parseBroadcasters(comp: Record<string, unknown>): Broadcaster[] {
  const raw = (comp['broadcasts'] as { names?: string[] }[] | undefined) ?? [];
  const names: string[] = raw.flatMap(b => b.names ?? []);

  const STREAMING: string[] = ['peacock', 'espn+', 'dazn', 'amazon', 'fubo', 'paramount+', 'discovery+'];
  const FTA: string[] = ['abc', 'cbs', 'nbc', 'fox', 'bbc', 'itv', 'channel 4', 'channel 5'];

  const classify = (name: string): BroadcasterType => {
    const l = name.toLowerCase();
    if (STREAMING.some(k => l.includes(k))) return 'streaming';
    if (FTA.some(k => l.includes(k))) return 'free-to-air';
    return 'cable';
  };

  return names.map(name => ({ name, type: classify(name) }));
}

interface RawEvent {
  id: string;
  name: string;
  date: string;
  season?: { slug?: string };
  competitions?: Record<string, unknown>[];
}

function mapEvent(raw: RawEvent, sportId: string, leagueName: string): SportEvent | null {
  if (!raw.date) return null;

  const comp = (raw.competitions ?? [])[0] ?? {};
  const dateObj = new Date(raw.date);
  const date = dateObj.toISOString().slice(0, 10);
  const startTime = dateObj.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/London',
  });

  return {
    id: `espn-${raw.id}`,
    sportId,
    title: raw.name,
    subtitle: leagueName,
    date,
    startTime,
    broadcasters: parseBroadcasters(comp),
  };
}

// Cache: `sportSlug/leagueSlug/date` → events
const cache = new Map<string, SportEvent[]>();

async function fetchEndpoint(
  sport: string,
  league: string,
  sportId: string,
  date: string,
  leagueName: string,
): Promise<SportEvent[]> {
  const cacheKey = `${sport}/${league}/${date}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey)!;

  const yyyymmdd = date.replace(/-/g, '');
  const url = `${BASE}/${sport}/${league}/scoreboard?dates=${yyyymmdd}`;
  const res = await fetch(url);
  if (!res.ok) return [];

  const json = await res.json();
  const events: SportEvent[] = (json.events ?? [])
    .map((e: RawEvent) => mapEvent(e, sportId, leagueName))
    .filter(Boolean) as SportEvent[];

  cache.set(cacheKey, events);
  return events;
}

// Fetch league name from ESPN response for subtitle
const leagueNameCache = new Map<string, string>();

async function getLeagueName(sport: string, league: string, date: string): Promise<string> {
  const key = `${sport}/${league}`;
  if (leagueNameCache.has(key)) return leagueNameCache.get(key)!;

  const yyyymmdd = date.replace(/-/g, '');
  const res = await fetch(`${BASE}/${sport}/${league}/scoreboard?dates=${yyyymmdd}`);
  if (!res.ok) return league;
  const json = await res.json();
  const name = json.leagues?.[0]?.name ?? league;
  leagueNameCache.set(key, name);
  return name;
}

export async function fetchEventsForDate(
  date: string,
  sportIds: string[],
): Promise<SportEvent[]> {
  const tasks: Promise<SportEvent[]>[] = [];

  for (const sportId of sportIds) {
    const endpoints = ENDPOINTS[sportId] ?? [];
    for (const [sport, league] of endpoints) {
      tasks.push(
        getLeagueName(sport, league, date).then(leagueName =>
          fetchEndpoint(sport, league, sportId, date, leagueName),
        ),
      );
    }
  }

  const results = await Promise.allSettled(tasks);
  return results.flatMap(r => (r.status === 'fulfilled' ? r.value : []));
}
