import type { Sport } from '../../types';

interface Props {
  sport: Sport;
  following: boolean;
  onToggle: () => void;
}

export default function SportBadge({ sport, following, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer ${
        following
          ? `${sport.color} border-transparent text-white shadow-md scale-[1.02]`
          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
      }`}
    >
      <span className="text-xl">{sport.icon}</span>
      <span className="font-medium text-sm">{sport.name}</span>
      {following && <span className="ml-auto text-white text-xs">✓</span>}
    </button>
  );
}
