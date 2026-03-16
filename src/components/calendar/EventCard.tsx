import type { SportEvent, Sport } from '../../types';

interface Props {
  event: SportEvent;
  sport: Sport;
  highlighted: boolean;
}

const BROADCASTER_COLORS: Record<string, string> = {
  cable: 'bg-blue-100 text-blue-700',
  streaming: 'bg-purple-100 text-purple-700',
  'free-to-air': 'bg-green-100 text-green-700',
};

export default function EventCard({ event, sport, highlighted }: Props) {
  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        highlighted
          ? 'border-l-4 border-l-blue-500 bg-white shadow-md'
          : 'bg-white border-gray-200 opacity-60'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Sport icon + color strip */}
        <div className={`w-10 h-10 rounded-lg ${sport.color} flex items-center justify-center text-xl flex-shrink-0`}>
          {sport.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">
              {event.title}
            </h3>
            <span className="text-sm font-mono text-gray-500 flex-shrink-0">
              {event.startTime}{event.endTime ? `–${event.endTime}` : ''}
            </span>
          </div>

          {event.subtitle && (
            <p className="text-xs text-gray-500 mt-0.5">{event.subtitle}</p>
          )}

          <div className="flex flex-wrap gap-1 mt-2">
            {event.broadcasters.map(b => (
              <span
                key={b.name}
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${BROADCASTER_COLORS[b.type]}`}
              >
                {b.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
