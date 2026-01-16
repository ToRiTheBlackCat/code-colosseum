import { useState } from "react";
import { Video, Copy, Check, Users, Code2 } from "lucide-react";

interface MeetingLobbyProps {
  onJoinMeeting: (meetingCode: string, isHost: boolean) => void;
}

export function MeetingLobby({ onJoinMeeting }: MeetingLobbyProps) {
  const [mode, setMode] = useState<"choose" | "create" | "join">("choose");
  const [meetingCode, setMeetingCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const generateMeetingCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setGeneratedCode(code);
    setMode("create");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateMeeting = () => {
    onJoinMeeting(generatedCode, true);
  };

  const handleJoinMeeting = () => {
    if (meetingCode.trim()) {
      onJoinMeeting(meetingCode.toUpperCase(), false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        {mode === "choose" && (
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Video className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl mb-3">Interview Meeting</h1>
            <p className="text-gray-400 text-lg mb-12">
              Collaborate in real-time with shared code editor and whiteboard
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Create Meeting */}
              <div
                onClick={generateMeetingCode}
                className="bg-[#121212] border-2 border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Code2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-2">Create Meeting</h3>
                <p className="text-gray-400">Start a new interview session</p>
              </div>

              {/* Join Meeting */}
              <div
                onClick={() => setMode("join")}
                className="bg-[#121212] border-2 border-gray-800 rounded-2xl p-8 hover:border-purple-500/50 transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl mb-2">Join Meeting</h3>
                <p className="text-gray-400">Enter with meeting code</p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">🎥</div>
                <div className="text-gray-400">Video & Audio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">👨‍💻</div>
                <div className="text-gray-400">Live Code Editor</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">✏️</div>
                <div className="text-gray-400">Whiteboard</div>
              </div>
            </div>
          </div>
        )}

        {mode === "create" && (
          <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8">
            <h2 className="text-3xl mb-6 text-center">Meeting Created!</h2>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8 mb-6">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-2">
                  Your Meeting Code
                </div>
                <div className="text-4xl tracking-wider mb-4 font-mono bg-[#0a0a0a] py-4 px-6 rounded-lg border border-purple-500/50">
                  {generatedCode}
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-2 mx-auto px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-400 text-center">
                📋 Share this code with participants to join your meeting
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setMode("choose")}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
              >
                Back
              </button>
              <button
                onClick={handleCreateMeeting}
                className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all"
              >
                Start Meeting
              </button>
            </div>
          </div>
        )}

        {mode === "join" && (
          <div className="bg-[#121212] border border-gray-800 rounded-2xl p-8">
            <h2 className="text-3xl mb-6 text-center">Join Meeting</h2>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-2">
                Meeting Code
              </label>
              <input
                type="text"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value.toUpperCase())}
                placeholder="Enter 8-character code"
                maxLength={8}
                className="w-full px-6 py-4 bg-[#0a0a0a] border border-gray-700 rounded-lg text-2xl tracking-wider font-mono text-center focus:outline-none focus:border-purple-500 transition-all uppercase"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setMode("choose")}
                className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
              >
                Back
              </button>
              <button
                onClick={handleJoinMeeting}
                disabled={meetingCode.length < 8}
                className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Meeting
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
