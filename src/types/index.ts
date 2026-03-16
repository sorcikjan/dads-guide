export interface Sport {
  id: string;
  name: string;
  icon: string;
  color: string; // Tailwind bg color class
}

export type BroadcasterType = 'cable' | 'streaming' | 'free-to-air';

export interface Broadcaster {
  name: string;
  type: BroadcasterType;
  logo?: string;
}

export interface SportEvent {
  id: string;
  sportId: string;
  title: string;
  subtitle?: string; // e.g. "Champions League · Group Stage"
  date: string; // ISO date string YYYY-MM-DD
  startTime: string; // HH:mm
  endTime?: string;
  broadcasters: Broadcaster[];
}
