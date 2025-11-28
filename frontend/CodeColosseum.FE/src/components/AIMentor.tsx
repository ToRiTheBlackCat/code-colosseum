import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Lightbulb, Code2, Trash2 } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIMentorProps {
  problemId: number;
  onClose: () => void;
}

export function AIMentor({ problemId, onClose }: AIMentorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: `Hello! I'm your AI Mentor powered by Semantic Kernel. I'm here to help you understand the problem and guide you toward a solution without giving away the answer. 

I can help you with:
• Understanding the problem requirements
• Discussing different approaches and their trade-offs
• Explaining relevant algorithms and data structures
• Analyzing time and space complexity
• Debugging your thought process

What would you like to explore first?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `Great question! Let's break this down together. 

The key insight here is to think about what data structure would allow you to efficiently look up complementary values. 

Consider this: if you're at a number in the array, what do you need to find? And what structure gives you O(1) lookup time?

Try thinking about this approach and let me know what you come up with!`,
        
        `I see you're thinking about this problem. Let me give you a hint without spoiling the solution.

Think about the relationship between the numbers you're looking for:
• You have a target value
• You need two numbers that sum to that target
• You're iterating through the array

At each step, you can calculate what number you *need* to find. How can you keep track of the numbers you've already seen?

What data structure comes to mind for fast lookups?`,

        `Excellent thinking! You're on the right track. 

Let's discuss the time complexity:
• A nested loop approach would be O(n²) - checking every pair
• Using a hash map/object for lookups gives us O(1) lookup time
• We only iterate once through the array, so overall O(n)

This is a classic space-time tradeoff. We use extra space (the hash map) to achieve better time complexity.

Does this help clarify the approach?`,

        `Let me guide you through the logic without giving the exact code:

1. As you iterate through each number in the array:
   - Calculate: what number would complement this one to reach the target?
   - Check: have you seen that complement before?
   - If yes: you found your pair!
   - If no: remember this current number for future iterations

Think about what you'd store and how you'd check for the complement. This is a pattern you'll see in many other problems too!`
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: `Chat cleared! I'm ready to help you with the Two Sum problem. What would you like to discuss?`,
        timestamp: new Date()
      }
    ]);
  };

  const suggestedQuestions = [
    "What approach should I use?",
    "Explain the time complexity",
    "What data structure fits best?",
    "How do I optimize this?"
  ];

  return (
    <div className="fixed right-0 top-[73px] bottom-0 w-[400px] bg-[#121212] border-l border-gray-800 flex flex-col z-40 shadow-2xl">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg">AI Mentor</h2>
              <p className="text-xs text-gray-400">Powered by Semantic Kernel</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-green-400/10 border border-green-400/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400">Online</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-purple-400/10 border border-purple-400/20 rounded-full">
            <Lightbulb className="w-3 h-3 text-purple-400" />
            <span className="text-purple-400">Hint Mode</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'assistant'
                ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                : 'bg-gradient-to-br from-blue-500 to-cyan-500'
            }`}>
              {message.role === 'assistant' ? (
                <Sparkles className="w-4 h-4 text-white" />
              ) : (
                <span className="text-xs">You</span>
              )}
            </div>
            <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
              <div className={`inline-block max-w-[85%] p-3 rounded-lg ${
                message.role === 'assistant'
                  ? 'bg-gray-800 text-gray-100'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
              }`}>
                <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-500">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => setInput(question)}
                className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex gap-2 mb-2">
          <button
            onClick={handleClearChat}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask for a hint or guidance..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          AI Mentor guides without revealing solutions
        </p>
      </div>
    </div>
  );
}
