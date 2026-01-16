import { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MessageSquare,
  Users,
  Phone,
  Code2,
  PenTool,
  Send,
  Copy,
  Check,
  Bot,
  Crown,
  Sparkles,
} from "lucide-react";
import { CollaborativeCodeEditor } from "./CollaborativeCodeEditor";
import { CollaborativeWhiteboard } from "./CollaborativeWhiteboard";
import { AIAgentConfig, type AIAgentSettings } from "./AIAgentConfig";
import { AIInterviewer } from "./AIInterviewer";

interface Participant {
  id: string;
  username: string;
  avatar: string;
  color: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isHost: boolean;
}

interface MeetingRoomProps {
  meetingCode: string;
  isHost: boolean;
  onLeave: () => void;
  isPremium?: boolean;
}

interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  timestamp: string;
}

export function MeetingRoom({
  meetingCode,
  isHost,
  onLeave,
  isPremium,
}: MeetingRoomProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [activeView, setActiveView] = useState<"code" | "whiteboard">("code");
  const [showChat, setShowChat] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      userId: "system",
      username: "System",
      message: "Meeting started",
      timestamp: "10:30 AM",
    },
  ]);
  const [copied, setCopied] = useState(false);

  // AI Agent states
  const [showAIConfig, setShowAIConfig] = useState(false);
  const [aiAgentActive, setAiAgentActive] = useState(false);
  const [aiAgentSettings, setAiAgentSettings] =
    useState<AIAgentSettings | null>(null);
  const [showAIPanel, setShowAIPanel] = useState(false);

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "me",
      username: "You (Host)",
      avatar: "YH",
      color: "#8b5cf6",
      isMuted: false,
      isVideoOff: false,
      isHost: true,
    },
  ]);

  // Simulate participants joining
  useEffect(() => {
    const timer = setTimeout(() => {
      setParticipants((prev) => [
        ...prev,
        {
          id: "interviewer",
          username: "Jane Smith (Interviewer)",
          avatar: "JS",
          color: "#ec4899",
          isMuted: false,
          isVideoOff: false,
          isHost: false,
        },
      ]);

      setChatMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          userId: "interviewer",
          username: "Jane Smith",
          message:
            "Hi! Thanks for joining. Let's start with a coding question.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          userId: "me",
          username: "You",
          message: chatMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setChatMessage("");
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(meetingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleActivateAIAgent = () => {
    if (!isPremium) {
      alert(
        "AI Interview Agent is a premium feature. Upgrade to Premium to unlock this feature!"
      );
      return;
    }
    setShowAIConfig(true);
  };

  const handleSaveAIConfig = (settings: AIAgentSettings) => {
    setAiAgentSettings(settings);
    setShowAIConfig(false);
    setAiAgentActive(true);
    setShowAIPanel(true);

    // Add AI Agent to participants
    setParticipants((prev) => [
      ...prev,
      {
        id: "ai-agent",
        username: `${settings.name} (AI Agent)`,
        avatar: "🤖",
        color: "#3b82f6",
        isMuted: false,
        isVideoOff: false,
        isHost: false,
      },
    ]);

    // Add system message
    setChatMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        userId: "system",
        username: "System",
        message: `AI Agent "${settings.name}" has joined the meeting`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleCloseAIAgent = () => {
    setAiAgentActive(false);
    setShowAIPanel(false);
    setParticipants((prev) => prev.filter((p) => p.id !== "ai-agent"));

    setChatMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        userId: "system",
        username: "System",
        message: `AI Agent "${aiAgentSettings?.name}" has left the meeting`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  return (
    <div className="h-[calc(100vh-73px)] bg-[#0a0a0a] flex flex-col">
      {/* Top Bar */}
      <div className="bg-[#121212] border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span>Recording</span>
          </div>
          <div className="text-gray-400">|</div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Meeting Code:</span>
            <code className="px-3 py-1 bg-[#0a0a0a] border border-gray-700 rounded text-purple-400 font-mono">
              {meetingCode}
            </code>
            <button
              onClick={handleCopyCode}
              className="p-1.5 hover:bg-gray-800 rounded transition-all"
              title="Copy meeting code"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0a] rounded-lg">
            <Users className="w-4 h-4 text-purple-400" />
            <span>{participants.length} participants</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Video Grid */}
        <div className="w-80 bg-[#121212] border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h3 className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              Participants ({participants.length})
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {participants.map((participant) => (
              <div key={participant.id} className="relative group">
                <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-800 group-hover:border-purple-500/50 transition-all">
                  {participant.isVideoOff ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                        style={{ backgroundColor: participant.color }}
                      >
                        {participant.avatar}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 border-white/20"
                        style={{ backgroundColor: participant.color }}
                      >
                        {participant.avatar}
                      </div>
                    </div>
                  )}

                  {/* Status Overlays */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                    <div className="px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-sm">
                      {participant.username}
                      {participant.isHost && (
                        <span className="ml-1 text-xs text-purple-400">★</span>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {participant.isMuted && (
                        <div className="p-1 bg-red-500 rounded">
                          <MicOff className="w-3 h-3" />
                        </div>
                      )}
                      {participant.isVideoOff && (
                        <div className="p-1 bg-gray-700 rounded">
                          <VideoOff className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="p-4 border-t border-gray-800 bg-[#0a0a0a]">
            {/* AI Agent Button */}
            {!aiAgentActive && (
              <button
                onClick={handleActivateAIAgent}
                className={`w-full mb-3 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                  isPremium
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    : "bg-gray-800 border border-gray-700 hover:bg-gray-700"
                }`}
                title={
                  isPremium
                    ? "Activate AI Interview Agent"
                    : "Premium Feature - Upgrade to unlock"
                }
              >
                <Bot className="w-4 h-4" />
                <span className="text-sm">AI Interview Agent</span>
                {isPremium && <Sparkles className="w-3 h-3" />}
                {!isPremium && <Crown className="w-3 h-3 text-yellow-400" />}
              </button>
            )}

            {aiAgentActive && (
              <button
                onClick={() => setShowAIPanel(!showAIPanel)}
                className="w-full mb-3 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span className="text-sm">
                  {showAIPanel ? "Hide" : "Show"} AI Agent
                </span>
              </button>
            )}

            <div className="flex items-center justify-center gap-3 mb-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full transition-all ${
                  isMuted
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-4 rounded-full transition-all ${
                  isVideoOff
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                title={isVideoOff ? "Turn on camera" : "Turn off camera"}
              >
                {isVideoOff ? (
                  <VideoOff className="w-5 h-5" />
                ) : (
                  <Video className="w-5 h-5" />
                )}
              </button>

              <button
                className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-all"
                title="Share screen"
              >
                <Monitor className="w-5 h-5" />
              </button>

              <button
                onClick={onLeave}
                className="p-4 rounded-full bg-red-500 hover:bg-red-600 transition-all"
                title="Leave meeting"
              >
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Panel - Collaborative Editor/Whiteboard */}
        <div className="flex-1 flex flex-col">
          {/* View Switcher */}
          <div className="bg-[#121212] border-b border-gray-800 px-6 py-3 flex items-center gap-2">
            <button
              onClick={() => setActiveView("code")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeView === "code"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <Code2 className="w-5 h-5" />
              <span>Code Editor</span>
            </button>
            <button
              onClick={() => setActiveView("whiteboard")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeView === "whiteboard"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <PenTool className="w-5 h-5" />
              <span>Whiteboard</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {activeView === "code" ? (
              <CollaborativeCodeEditor
                isHost={isHost}
                participants={participants}
              />
            ) : (
              <CollaborativeWhiteboard participants={participants} />
            )}
          </div>
        </div>

        {/* Right Panel - Chat */}
        {showChat && (
          <div className="w-80 bg-[#121212] border-l border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                Chat
              </h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${
                    msg.userId === "system"
                      ? "text-center text-xs text-gray-500"
                      : msg.userId === "me"
                      ? "ml-8"
                      : "mr-8"
                  }`}
                >
                  {msg.userId !== "system" && (
                    <div className="mb-1">
                      <span
                        className={`text-sm ${
                          msg.userId === "me"
                            ? "text-purple-400"
                            : "text-pink-400"
                        }`}
                      >
                        {msg.username}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        {msg.timestamp}
                      </span>
                    </div>
                  )}
                  {msg.userId !== "system" && (
                    <div
                      className={`p-3 rounded-lg ${
                        msg.userId === "me"
                          ? "bg-purple-500/20 border border-purple-500/30"
                          : "bg-gray-800"
                      }`}
                    >
                      {msg.message}
                    </div>
                  )}
                  {msg.userId === "system" && msg.message}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {!showChat && (
          <button
            onClick={() => setShowChat(true)}
            className="absolute bottom-6 right-6 p-4 bg-purple-500 hover:bg-purple-600 rounded-full shadow-lg transition-all"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        )}

        {/* AI Agent Panel (Floating) */}
        {showAIPanel && aiAgentSettings && (
          <div className="absolute bottom-24 right-6 w-96 h-[600px] shadow-2xl z-50">
            <AIInterviewer
              settings={aiAgentSettings}
              isActive={aiAgentActive}
              onClose={handleCloseAIAgent}
            />
          </div>
        )}
      </div>

      {/* AI Agent Configuration Modal */}
      {showAIConfig && (
        <AIAgentConfig
          onSave={handleSaveAIConfig}
          onCancel={() => setShowAIConfig(false)}
        />
      )}
    </div>
  );
}
