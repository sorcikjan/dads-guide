import type { SportEvent } from '../types';

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
    sportId: 'cricket',
    title: 'England vs India — Day 2',
    subtitle: 'ICC Test Series',
    date: dateOffset(0),
    startTime: '10:00',
    endTime: '18:00',
    broadcasters: [
      { name: 'Sky Sports Cricket', type: 'cable' },
    ],
  },
  {
    id: '4',
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
    id: '5',
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
    id: '6',
    sportId: 'ice-hockey',
    title: 'Toronto Maple Leafs vs Montreal Canadiens',
    subtitle: 'NHL Regular Season',
    date: dateOffset(1),
    startTime: '23:00',
    broadcasters: [
      { name: 'NHL TV', type: 'streaming' },
    ],
  },
  {
    id: '7',
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
    id: '8',
    sportId: 'cycling',
    title: 'Paris–Roubaix',
    subtitle: 'UCI WorldTour Classic',
    date: dateOffset(2),
    startTime: '10:30',
    endTime: '17:00',
    broadcasters: [
      { name: 'Eurosport', type: 'cable' },
      { name: 'GCN+', type: 'streaming' },
    ],
  },
  {
    id: '9',
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
    id: '10',
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
    id: '11',
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
    id: '12',
    sportId: 'mma',
    title: 'UFC 310 — Main Card',
    subtitle: 'UFC · Heavyweight Championship',
    date: dateOffset(4),
    startTime: '03:00',
    broadcasters: [
      { name: 'TNT Sports', type: 'cable' },
      { name: 'discovery+', type: 'streaming' },
    ],
  },
  {
    id: '13',
    sportId: 'baseball',
    title: 'New York Yankees vs Boston Red Sox',
    subtitle: 'MLB Regular Season',
    date: dateOffset(4),
    startTime: '18:05',
    endTime: '21:30',
    broadcasters: [
      { name: 'MLB.TV', type: 'streaming' },
    ],
  },
  {
    id: '14',
    sportId: 'boxing',
    title: 'World Heavyweight Championship',
    subtitle: 'WBC Title Fight',
    date: dateOffset(5),
    startTime: '22:00',
    broadcasters: [
      { name: 'Sky Sports Box Office', type: 'cable' },
    ],
  },
  {
    id: '15',
    sportId: 'volleyball',
    title: 'Brazil vs Italy',
    subtitle: 'VNL — Volleyball Nations League',
    date: dateOffset(5),
    startTime: '20:00',
    endTime: '22:30',
    broadcasters: [
      { name: 'Eurosport', type: 'cable' },
      { name: 'discovery+', type: 'streaming' },
    ],
  },
  {
    id: '16',
    sportId: 'table-tennis',
    title: 'WTT Contender — Finals',
    subtitle: 'World Table Tennis Series',
    date: dateOffset(6),
    startTime: '13:00',
    endTime: '17:00',
    broadcasters: [
      { name: 'DAZN', type: 'streaming' },
    ],
  },
  {
    id: '17',
    sportId: 'american-football',
    title: 'NFL Draft — Day 1',
    subtitle: 'NFL · Annual Draft',
    date: dateOffset(6),
    startTime: '01:00',
    broadcasters: [
      { name: 'Sky Sports NFL', type: 'cable' },
      { name: 'NFL Game Pass', type: 'streaming' },
    ],
  },
  {
    id: '18',
    sportId: 'cricket',
    title: 'IPL — Mumbai Indians vs Chennai Super Kings',
    subtitle: 'Indian Premier League',
    date: dateOffset(7),
    startTime: '15:30',
    endTime: '19:30',
    broadcasters: [
      { name: 'Sky Sports Cricket', type: 'cable' },
      { name: 'JioStar', type: 'streaming' },
    ],
  },
];
