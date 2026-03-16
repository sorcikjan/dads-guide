import { ALL_SPORTS } from '../data/sports';
import SportBadge from '../components/sports/SportBadge';
import { useSports } from '../hooks/useSports';

export default function SettingsPage() {
  const { followed, toggle, isFollowing } = useSports();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Sports</h1>
        <p className="text-sm text-gray-500 mt-1">
          Select the sports you follow — highlighted events will appear on the schedule.
        </p>
      </div>

      {/* Selection count */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">
          {followed.size === 0
            ? 'No sports selected — showing all events'
            : `${followed.size} sport${followed.size > 1 ? 's' : ''} selected`}
        </span>
        {followed.size > 0 && (
          <button
            onClick={() => ALL_SPORTS.forEach(s => isFollowing(s.id) && toggle(s.id))}
            className="text-xs text-red-500 hover:underline cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Sport grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {ALL_SPORTS.map(sport => (
          <SportBadge
            key={sport.id}
            sport={sport}
            following={isFollowing(sport.id)}
            onToggle={() => toggle(sport.id)}
          />
        ))}
      </div>

      {/* Tip */}
      <p className="text-xs text-gray-400 mt-2">
        Your selection is saved locally and used to highlight events in the schedule.
      </p>
    </div>
  );
}
