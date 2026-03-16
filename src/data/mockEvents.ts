import type { SportEvent } from '../types';

// Helper: get ISO date string offset from today
function dateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const MOCK_EVENTS: SportEvent[] = [
  {
    id: '1',
    sportId: 'football',
    title: 'Manchester City vs Liverpool',
    subtitle: 'Premier League · Matchday 28',
    date: dateOffset(0),
    startTime: '17:30',
    endTime: '19:30',
    broadcasters: [
      { name: 'Sky Sports', type: 'cable' },
      { name: 'Sky Go', type: 'streaming' },
    ],
  },
  {
    id: '2',
    sportId: 'tennis',
    title: 'ATP Masters — Quarterfinals',
    subtitle: 'Miami Open',
    date: dateOffset(0),
    startTime: '19:00',
    broadcasters: [
      { name: 'Eurosport', type: 'cable' },
      { name: 'discovery+', type: 'streaming' },
    ],
  },
  {
    id: '3',
    sportId: 'formula1',
    title: 'Bahrain Grand Prix — Qualifying',
    subtitle: 'Formula 1 World Championship',
    date: dateOffset(1),
    startTime: '15:00',
    endTime: '16:00',
    broadcasters: [
      { name: 'Sky Sports F1', type: 'cable' },
      { name: 'F1 TV', type: 'streaming' },
    ],
  },
  {
    id: '4',
    sportId: 'basketball',
    title: 'LA Lakers vs Boston Celtics',
    subtitle: 'NBA Regular Season',
    date: dateOffset(1),
    startTime: '02:30',
    endTime: '05:00',
    broadcasters: [
      { name: 'NBA League Pass', type: 'streaming' },
    ],
  },
  {
    id: '5',
    sportId: 'football',
    title: 'Real Madrid vs Barcelona',
    subtitle: 'La Liga · El Clásico',
    date: dateOffset(2),
    startTime: '21:00',
    endTime: '23:00',
    broadcasters: [
      { name: 'DAZN', type: 'streaming' },
      { name: 'BBC Sport', type: 'free-to-air' },
    ],
  },
  {
    id: '6',
    sportId: 'cycling',
    title: 'Paris–Roubaix',
    subtitle: 'Classic Spring Race',
    date: dateOffset(2),
    startTime: '10:30',
    endTime: '17:00',
    broadcasters: [
      { name: 'Eurosport', type: 'cable' },
      { name: 'GCN+', type: 'streaming' },
    ],
  },
  {
    id: '7',
    sportId: 'formula1',
    title: 'Bahrain Grand Prix — Race',
    subtitle: 'Formula 1 World Championship',
    date: dateOffset(2),
    startTime: '15:00',
    endTime: '17:00',
    broadcasters: [
      { name: 'Sky Sports F1', type: 'cable' },
      { name: 'F1 TV', type: 'streaming' },
    ],
  },
  {
    id: '8',
    sportId: 'golf',
    title: 'The Masters — Round 1',
    subtitle: 'Augusta National',
    date: dateOffset(3),
    startTime: '14:00',
    endTime: '21:00',
    broadcasters: [
      { name: 'Sky Sports Golf', type: 'cable' },
      { name: 'BBC Sport', type: 'free-to-air' },
    ],
  },
  {
    id: '9',
    sportId: 'rugby',
    title: 'England vs France',
    subtitle: 'Six Nations Championship',
    date: dateOffset(3),
    startTime: '16:45',
    endTime: '18:30',
    broadcasters: [
      { name: 'ITV', type: 'free-to-air' },
      { name: 'ITVX', type: 'streaming' },
    ],
  },
  {
    id: '10',
    sportId: 'boxing',
    title: 'World Heavyweight Championship',
    subtitle: 'WBC Title Fight',
    date: dateOffset(5),
    startTime: '22:00',
    broadcasters: [
      { name: 'Sky Sports Box Office', type: 'cable' },
    ],
  },
];
