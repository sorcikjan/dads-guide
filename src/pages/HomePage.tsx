import { useState } from 'react';
import CalendarStrip from '../components/calendar/CalendarStrip';
import DayView from '../components/calendar/DayView';
import { useSports } from '../hooks/useSports';
import { useEvents } from '../hooks/useEvents';
import { ALL_SPORTS } from '../data/sports';
import { NavLink } from 'react-router-dom';

function formatDate(iso: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  if (iso === today) return 'Today';
  if (iso === tomorrow) return 'Tomorrow';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
}

export default function HomePage() {
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);
  const { followed } = useSports();
  const { events: eventsForDay, loading, error } = useEvents(selectedDate, followed);

  return (
    <div className="flex flex-col gap-6">
      {/* Page heading */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sport on TV</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {followed.size > 0
              ? `Showing ${followed.size} sport${followed.size > 1 ? 's' : ''} you follow`
              : 'Top sports · pick your favourites in My Sports'}
          </p>
        </div>
        {followed.size === 0 && (
          <NavLink
            to="/settings"
            className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors"
          >
            Pick sports
          </NavLink>
        )}
      </div>

      {/* Followed sport chips */}
      {followed.size > 0 && (
        <div className="flex flex-wrap gap-2">
          {ALL_SPORTS.filter(s => followed.has(s.id)).map(s => (
            <span
              key={s.id}
              className={`${s.color} text-white text-xs font-medium px-3 py-1 rounded-full`}
            >
              {s.icon} {s.name}
            </span>
          ))}
        </div>
      )}

      {/* Date strip */}
      <CalendarStrip selectedDate={selectedDate} onSelect={setSelectedDate} />

      {/* Date heading + event count */}
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-gray-800">{formatDate(selectedDate)}</h2>
        {!loading && eventsForDay.length > 0 && (
          <span className="text-sm text-gray-500">
            {eventsForDay.length} event{eventsForDay.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm">Loading schedule…</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          Could not load events: {error}
        </div>
      )}

      {/* Events */}
      {!loading && !error && (
        <DayView events={eventsForDay} followedSports={followed} />
      )}
    </div>
  );
}
