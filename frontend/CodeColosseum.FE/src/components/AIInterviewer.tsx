import { useState, useEffect, useRef } from "react";
import {
  Bot,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  MessageSquare,
  Zap,
  Activity,
} from "lucide-react";
import { type AIAgentSettings } from "./AIAgentConfig";

interface AIInterviewerProps {
  settings: AIAgentSettings;
  isActive: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: "ai" | "user";
  timestamp: Date;
  isVoice?: boolean;
}

export function AIInterviewer({
  settings,
  isActive,
  onClose,
}: AIInterviewerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(settings.voiceEnabled);
  const [transcript, setTranscript] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulated AI responses based on interview style
  const getAIResponse = (userMessage: string): string => {
    const responses = {
      technical: [
        `Interesting approach! Can you explain the time complexity of your solution?`,
        `That's a good start. How would you optimize this for larger datasets?`,
        `I see. What data structure would you use to implement this efficiently?`,
        `Good thinking! Can you walk me through your algorithm step by step?`,
        `Let's dive deeper. What edge cases should we consider here?`,
      ],
      behavioral: [
        `Tell me more about how you handled that situation.`,
        `That's a great example! What did you learn from that experience?`,
        `How did you collaborate with your team during that project?`,
        `What would you do differently if faced with a similar challenge?`,
        `Excellent! Can you give me another example of leadership in action?`,
      ],
      mixed: [
        `Good answer! Now, let's discuss the technical implementation.`,
        `I appreciate your perspective. How would you code this solution?`,
        `That shows great problem-solving skills. What's the Big O notation here?`,
        `Interesting! How does this relate to the system design principles?`,
        `Perfect! Let's move on to discussing scalability.`,
      ],
    };

    const styleResponses = responses[settings.interviewStyle];
    return styleResponses[Math.floor(Math.random() * styleResponses.length)];
  };

  // Initial greeting
  useEffect(() => {
    if (isActive && messages.length === 0) {
      const greeting = {
        id: Date.now().toString(),
        text: `Hello! I'm ${settings.name}, a ${settings.role} with ${
          settings.experience
        } of experience. I'll be conducting your ${
          settings.interviewStyle
        } interview today focusing on ${settings.focusAreas.join(
          ", "
        )}. Are you ready to begin?`,
        sender: "ai" as const,
        timestamp: new Date(),
        isVoice: voiceEnabled,
      };
      setMessages([greeting]);

      if (voiceEnabled) {
        speakText(greeting.text);
      }
    }
  }, [isActive]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulated speech synthesis
  const speakText = (text: string) => {
    setIsSpeaking(true);

    // Mock voice synthesis
    if ("speechSynthesis" in window && voiceEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      // Simulate speaking duration
      setTimeout(() => {
        setIsSpeaking(false);
      }, text.length * 50);
    }
  };

  // Simulated speech recognition
  const startListening = () => {
    setIsListening(true);
    setTranscript("");

    // Mock voice recognition
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);

        if (event.results[current].isFinal) {
          handleSendMessage(transcript, true);
          setIsListening(false);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      // Fallback: simulate voice input
      setTimeout(() => {
        const mockResponse =
          "I would use a hash map to solve this problem efficiently.";
        setTranscript(mockResponse);
        handleSendMessage(mockResponse, true);
        setIsListening(false);
      }, 2000);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const handleSendMessage = (
    text: string = userInput,
    isVoice: boolean = false
  ) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
      isVoice,
    };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(text),
        sender: "ai",
        timestamp: new Date(),
        isVoice: voiceEnabled,
      };
      setMessages((prev) => [...prev, aiResponse]);

      if (voiceEnabled) {
        speakText(aiResponse.text);
      }
    }, 1000 + Math.random() * 1000);
  };

  const toggleVoice = () => {
    const newVoiceState = !voiceEnabled;
    setVoiceEnabled(newVoiceState);

    if (!newVoiceState && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const getAgentAvatar = () => {
    const colors = {
      professional: "from-blue-500 to-indigo-500",
      friendly: "from-green-500 to-teal-500",
      challenging: "from-red-500 to-orange-500",
      supportive: "from-purple-500 to-pink-500",
    };
    return colors[settings.personality];
  };

  if (!isActive) return null;

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getAgentAvatar()} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white">{settings.name}</h3>
              <p className="text-xs text-white/80">
                {settings.role} • {settings.experience}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isSpeaking && (
              <div className="flex items-center gap-1 text-white/80 text-xs bg-white/20 px-2 py-1 rounded-full">
                <Activity className="w-3 h-3 animate-pulse" />
                Speaking...
              </div>
            )}

            <button
              onClick={toggleVoice}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              {voiceEnabled ? (
                <Volume2 className="w-4 h-4 text-white" />
              ) : (
                <VolumeX className="w-4 h-4 text-white" />
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-white"
            >
              ×
            </button>
          </div>
        </div>

        {/* Agent Info */}
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white">
            {settings.difficulty}
          </span>
          <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white capitalize">
            {settings.interviewStyle}
          </span>
          {settings.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 bg-white/20 rounded-full text-xs text-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-800 text-gray-100"
              }`}
            >
              <div className="flex items-start gap-2">
                {message.isVoice && (
                  <Mic className="w-3 h-3 mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm">{message.text}</p>
              </div>
              <p className="text-xs opacity-50 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {isListening && (
          <div className="flex justify-end">
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 max-w-[80%]">
              <div className="flex items-center gap-2 text-blue-400">
                <Mic className="w-4 h-4 animate-pulse" />
                <span className="text-sm">{transcript || "Listening..."}</span>
              </div>
            </div>
          </div>
        )}

        {isSpeaking && messages[messages.length - 1]?.sender === "ai" && (
          <div className="flex justify-start">
            <div className="bg-gray-800/50 rounded-lg p-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-400 animate-pulse" />
              <span className="text-xs text-gray-400">AI is speaking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder={
              voiceEnabled ? "Type or use voice..." : "Type your response..."
            }
            className="flex-1 px-4 py-2 bg-black/30 border border-gray-700 rounded-lg focus:border-blue-500 outline-none text-sm"
          />

          {voiceEnabled && (
            <button
              onClick={isListening ? stopListening : startListening}
              disabled={isSpeaking}
              className={`px-4 py-2 rounded-lg transition-all ${
                isListening
                  ? "bg-red-500 hover:bg-red-600 animate-pulse"
                  : "bg-blue-500 hover:bg-blue-600"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>
          )}

          <button
            onClick={() => handleSendMessage()}
            disabled={!userInput.trim() || isSpeaking}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>Interview Style: {settings.interviewStyle}</span>
          <span>Focus: {settings.focusAreas.join(", ")}</span>
        </div>
      </div>
    </div>
  );
}
