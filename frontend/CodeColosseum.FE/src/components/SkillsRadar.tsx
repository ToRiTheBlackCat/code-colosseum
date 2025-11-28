export function SkillsRadar() {
  const skills = [
    { name: 'Array', level: 85, color: 'text-green-400' },
    { name: 'String', level: 72, color: 'text-blue-400' },
    { name: 'Dynamic Programming', level: 68, color: 'text-purple-400' },
    { name: 'Tree', level: 78, color: 'text-yellow-400' },
    { name: 'Graph', level: 65, color: 'text-pink-400' },
    { name: 'Binary Search', level: 82, color: 'text-cyan-400' },
    { name: 'Backtracking', level: 58, color: 'text-orange-400' },
    { name: 'Hash Table', level: 90, color: 'text-red-400' },
  ];

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.name}>
          <div className="flex items-center justify-between mb-2">
            <span className={skill.color}>{skill.name}</span>
            <span className="text-sm text-gray-400">{skill.level}%</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
              style={{ width: `${skill.level}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
