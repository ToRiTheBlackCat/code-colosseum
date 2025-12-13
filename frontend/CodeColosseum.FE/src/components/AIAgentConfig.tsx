import { useState } from 'react';
import { Bot, Briefcase, Code, TrendingUp, Zap, Settings, Volume2 } from 'lucide-react';

export interface AIAgentSettings {
  name: string;
  role: string;
  experience: string;
  techStack: string[];
  personality: 'professional' | 'friendly' | 'challenging' | 'supportive';
  difficulty: 'junior' | 'mid' | 'senior' | 'staff';
  focusAreas: string[];
  voiceEnabled: boolean;
  interviewStyle: 'behavioral' | 'technical' | 'mixed';
}

interface AIAgentConfigProps {
  onSave: (settings: AIAgentSettings) => void;
  onCancel: () => void;
  initialSettings?: AIAgentSettings;
}

const techOptions = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust',
  'React', 'Vue', 'Angular', 'Node.js', 'Django', 'Spring Boot',
  'MongoDB', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS'
];

const focusOptions = [
  'System Design', 'Data Structures', 'Algorithms', 'Problem Solving',
  'Architecture', 'Best Practices', 'Communication', 'Leadership'
];

export function AIAgentConfig({ onSave, onCancel, initialSettings }: AIAgentConfigProps) {
  const [settings, setSettings] = useState<AIAgentSettings>(initialSettings || {
    name: 'Alex',
    role: 'Senior Software Engineer',
    experience: '8 years',
    techStack: ['JavaScript', 'React', 'Node.js'],
    personality: 'professional',
    difficulty: 'mid',
    focusAreas: ['Algorithms', 'Problem Solving'],
    voiceEnabled: true,
    interviewStyle: 'mixed'
  });

  const [customTech, setCustomTech] = useState('');

  const handleAddTech = (tech: string) => {
    if (!settings.techStack.includes(tech)) {
      setSettings({ ...settings, techStack: [...settings.techStack, tech] });
    }
  };

  const handleRemoveTech = (tech: string) => {
    setSettings({ ...settings, techStack: settings.techStack.filter(t => t !== tech) });
  };

  const handleAddCustomTech = () => {
    if (customTech.trim() && !settings.techStack.includes(customTech.trim())) {
      setSettings({ ...settings, techStack: [...settings.techStack, customTech.trim()] });
      setCustomTech('');
    }
  };

  const handleToggleFocus = (focus: string) => {
    if (settings.focusAreas.includes(focus)) {
      setSettings({ ...settings, focusAreas: settings.focusAreas.filter(f => f !== focus) });
    } else {
      setSettings({ ...settings, focusAreas: [...settings.focusAreas, focus] });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 max-w-3xl w-full my-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl">Configure AI Interview Agent</h2>
            <p className="text-sm text-gray-400">Customize the interviewer's background and style</p>
          </div>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {/* Basic Info */}
          <div>
            <label className="block text-sm mb-2">Agent Name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
              placeholder="Enter agent name"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Role / Position</label>
            <input
              type="text"
              value={settings.role}
              onChange={(e) => setSettings({ ...settings, role: e.target.value })}
              className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
              placeholder="e.g., Senior Software Engineer, Tech Lead"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Years of Experience</label>
            <input
              type="text"
              value={settings.experience}
              onChange={(e) => setSettings({ ...settings, experience: e.target.value })}
              className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg focus:border-blue-500 outline-none"
              placeholder="e.g., 5 years, 10+ years"
            />
          </div>

          {/* Difficulty Level */}
          <div>
            <label className="block text-sm mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Interview Difficulty
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['junior', 'mid', 'senior', 'staff'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setSettings({ ...settings, difficulty: level })}
                  className={`py-2 rounded-lg border transition-colors capitalize ${
                    settings.difficulty === level
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-black/30 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-sm mb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Tech Stack Expertise
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={customTech}
                onChange={(e) => setCustomTech(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTech()}
                className="flex-1 px-4 py-2 bg-black/30 border border-gray-700 rounded-lg focus:border-blue-500 outline-none text-sm"
                placeholder="Add custom technology..."
              />
              <button
                onClick={handleAddCustomTech}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-sm"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {settings.techStack.map((tech) => (
                <span
                  key={tech}
                  onClick={() => handleRemoveTech(tech)}
                  className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm cursor-pointer hover:bg-red-500/20 hover:border-red-500/30 transition-colors"
                >
                  {tech} ×
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {techOptions.filter(t => !settings.techStack.includes(t)).map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleAddTech(tech)}
                  className="px-3 py-1 bg-black/30 border border-gray-700 rounded-full text-sm hover:border-blue-500/50 transition-colors"
                >
                  + {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Personality */}
          <div>
            <label className="block text-sm mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Personality Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['professional', 'friendly', 'challenging', 'supportive'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSettings({ ...settings, personality: type })}
                  className={`py-2 rounded-lg border transition-colors capitalize ${
                    settings.personality === type
                      ? 'bg-purple-500 border-purple-500 text-white'
                      : 'bg-black/30 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Interview Style */}
          <div>
            <label className="block text-sm mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Interview Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['behavioral', 'technical', 'mixed'] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setSettings({ ...settings, interviewStyle: style })}
                  className={`py-2 rounded-lg border transition-colors capitalize ${
                    settings.interviewStyle === style
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-black/30 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Focus Areas */}
          <div>
            <label className="block text-sm mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Interview Focus Areas
            </label>
            <div className="flex flex-wrap gap-2">
              {focusOptions.map((focus) => (
                <button
                  key={focus}
                  onClick={() => handleToggleFocus(focus)}
                  className={`px-3 py-1 rounded-full border transition-colors text-sm ${
                    settings.focusAreas.includes(focus)
                      ? 'bg-green-500/20 border-green-500/30 text-green-400'
                      : 'bg-black/30 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {focus}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Settings */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.voiceEnabled}
                onChange={(e) => setSettings({ ...settings, voiceEnabled: e.target.checked })}
                className="w-5 h-5"
              />
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" />
                <span>Enable Voice Interaction</span>
              </div>
            </label>
            <p className="text-xs text-gray-500 ml-8 mt-1">
              Allow the AI agent to speak questions and listen to your responses
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-800">
          <button
            onClick={onCancel}
            className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(settings)}
            className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg transition-all"
          >
            Save & Start Interview
          </button>
        </div>
      </div>
    </div>
  );
}
