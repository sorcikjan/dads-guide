import type { SportEvent } from '../../types';
import { ALL_SPORTS } from '../../data/sports';
import EventCard from './EventCard';

interface Props {
  events: SportEvent[];
  followedSports: Set<string>;
}

export default function DayView({ events, followedSports }: Props) {
  const sorted = [...events].sort((a, b) => a.startTime.localeCompare(b.startTime));

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <span className="text-5xl mb-3">🏖️</span>
        <p className="text-lg font-medium">No events on this day</p>
        <p className="text-sm">Enjoy the break!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {sorted.map(event => {
        const sport = ALL_SPORTS.find(s => s.id === event.sportId)!;
        const highlighted = followedSports.size === 0 || followedSports.has(event.sportId);
        return (
          <EventCard
            key={event.id}
            event={event}
            sport={sport}
            highlighted={highlighted}
          />
        );
      })}
    </div>
  );
}
