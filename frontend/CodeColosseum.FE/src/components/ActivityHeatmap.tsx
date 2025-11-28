export function ActivityHeatmap() {
  // Generate mock data for the last 12 months
  const generateHeatmapData = () => {
    const data = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 12);

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const count = Math.floor(Math.random() * 15);
      data.push({
        date: new Date(d).toISOString().split('T')[0],
        count,
      });
    }
    return data;
  };

  const heatmapData = generateHeatmapData();
  
  const getColor = (count: number) => {
    if (count === 0) return 'bg-gray-800';
    if (count < 3) return 'bg-green-900/50';
    if (count < 6) return 'bg-green-700/70';
    if (count < 9) return 'bg-green-500';
    return 'bg-green-400';
  };

  const weeks: any[][] = [];
  let currentWeek: any[] = [];
  
  heatmapData.forEach((day, idx) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || idx === heatmapData.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const visibleMonths = [];
  for (let i = 0; i < 12; i++) {
    visibleMonths.push(months[(currentMonth - 11 + i + 12) % 12]);
  }

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex flex-col gap-1">
        <div className="flex gap-1 mb-2 text-xs text-gray-500 ml-6">
          {visibleMonths.map((month, idx) => (
            idx % 4 === 0 && <div key={idx} className="w-[52px]">{month}</div>
          ))}
        </div>
        <div className="flex gap-1">
          <div className="flex flex-col gap-1 text-xs text-gray-500 pr-2">
            <div className="h-[10px]">Mon</div>
            <div className="h-[10px]" />
            <div className="h-[10px]">Wed</div>
            <div className="h-[10px]" />
            <div className="h-[10px]">Fri</div>
            <div className="h-[10px]" />
            <div className="h-[10px]">Sun</div>
          </div>
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((day, dayIdx) => (
                <div
                  key={dayIdx}
                  className={`w-[10px] h-[10px] rounded-sm ${getColor(day.count)} hover:ring-2 hover:ring-purple-400 transition-all cursor-pointer`}
                  title={`${day.date}: ${day.count} submissions`}
                />
              ))}
              {week.length < 7 && Array.from({ length: 7 - week.length }).map((_, idx) => (
                <div key={`empty-${idx}`} className="w-[10px] h-[10px]" />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-[10px] h-[10px] rounded-sm bg-gray-800" />
            <div className="w-[10px] h-[10px] rounded-sm bg-green-900/50" />
            <div className="w-[10px] h-[10px] rounded-sm bg-green-700/70" />
            <div className="w-[10px] h-[10px] rounded-sm bg-green-500" />
            <div className="w-[10px] h-[10px] rounded-sm bg-green-400" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
