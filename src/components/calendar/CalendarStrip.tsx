interface Props {
  selectedDate: string; // YYYY-MM-DD
  onSelect: (date: string) => void;
  daysToShow?: number;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function CalendarStrip({ selectedDate, onSelect, daysToShow = 14 }: Props) {
  const today = formatDate(new Date());

  const days = Array.from({ length: daysToShow }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {days.map(day => {
        const iso = formatDate(day);
        const isToday = iso === today;
        const isSelected = iso === selectedDate;

        return (
          <button
            key={iso}
            onClick={() => onSelect(iso)}
            className={`flex flex-col items-center min-w-[52px] py-2 px-1 rounded-xl transition-colors cursor-pointer ${
              isSelected
                ? 'bg-blue-600 text-white'
                : isToday
                ? 'bg-blue-50 text-blue-600 border border-blue-200'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span className="text-xs font-medium">{DAY_NAMES[day.getDay()]}</span>
            <span className="text-lg font-bold leading-tight">{day.getDate()}</span>
            <span className="text-xs">{MONTH_NAMES[day.getMonth()]}</span>
          </button>
        );
      })}
    </div>
  );
}
