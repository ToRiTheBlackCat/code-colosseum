import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProblemList } from './components/ProblemList';
import { ProblemDetail } from './components/ProblemDetail';
import { Leaderboard } from './components/Leaderboard';
import { AIMentor } from './components/AIMentor';
import { UserProfile } from './components/UserProfile';
import { Contests } from './components/Contests';
import { Shop } from './components/Shop';
import { MeetingLobby } from './components/MeetingLobby';
import { MeetingRoom } from './components/MeetingRoom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';

type View = 'problems' | 'problem-detail' | 'leaderboard' | 'profile' | 'contests' | 'shop' | 'meeting';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const [currentView, setCurrentView] = useState<View>('problems');
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);
  const [showAIMentor, setShowAIMentor] = useState(false);
  const [meetingState, setMeetingState] = useState<{ inMeeting: boolean; meetingCode: string; isHost: boolean }>({
    inMeeting: false,
    meetingCode: '',
    isHost: false,
  });
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('dark');
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('dark');

  // Handle auto theme based on time
  useEffect(() => {
    const updateTheme = () => {
      if (theme === 'auto') {
        const hour = new Date().getHours();
        // Light mode from 6 AM to 6 PM, dark mode otherwise
        const autoTheme = hour >= 6 && hour < 18 ? 'light' : 'dark';
        setEffectiveTheme(autoTheme);
      } else {
        setEffectiveTheme(theme);
      }
    };

    updateTheme();
    
    // Update every minute if in auto mode
    if (theme === 'auto') {
      const interval = setInterval(updateTheme, 60000);
      return () => clearInterval(interval);
    }
  }, [theme]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('light', effectiveTheme === 'light');
    document.documentElement.classList.toggle('dark', effectiveTheme === 'dark');
  }, [effectiveTheme]);

  const handleSelectProblem = (id: number) => {
    setSelectedProblemId(id);
    setCurrentView('problem-detail');
  };

  const handleBackToProblems = () => {
    setCurrentView('problems');
    setSelectedProblemId(null);
  };

  const handleJoinMeeting = (meetingCode: string, isHost: boolean) => {
    setMeetingState({ inMeeting: true, meetingCode, isHost });
  };

  const handleLeaveMeeting = () => {
    setMeetingState({ inMeeting: false, meetingCode: '', isHost: false });
  };

  const handleLogin = (email: string, password: string) => {
    // In a real app, this would call an API
    setIsAuthenticated(true);
    setCurrentView('problems');
  };

  const handleSignup = (username: string, email: string, password: string) => {
    // In a real app, this would call an API
    setIsAuthenticated(true);
    setCurrentView('problems');
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setCurrentView('problems');
    setAuthView('login');
  };

  // Show auth screens if not authenticated
  if (!isAuthenticated) {
    if (authView === 'login') {
      return <Login onLogin={handleLogin} onSwitchToSignup={() => setAuthView('signup')} />;
    } else {
      return <Signup onSignup={handleSignup} onSwitchToLogin={() => setAuthView('login')} />;
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      effectiveTheme === 'light' 
        ? 'bg-white text-gray-900' 
        : 'bg-[#0a0a0a] text-gray-100'
    }`}>
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        onBackToProblems={handleBackToProblems}
        onSignOut={handleSignOut}
        theme={theme}
        onThemeChange={setTheme}
      />
      
      <main className="relative">
        {currentView === 'problems' && (
          <ProblemList onSelectProblem={handleSelectProblem} />
        )}
        
        {currentView === 'problem-detail' && selectedProblemId !== null && (
          <ProblemDetail 
            problemId={selectedProblemId}
            onToggleAIMentor={() => setShowAIMentor(!showAIMentor)}
            showAIMentor={showAIMentor}
          />
        )}
        
        {currentView === 'leaderboard' && <Leaderboard />}
        
        {currentView === 'profile' && <UserProfile onSignOut={handleSignOut} />}
        
        {currentView === 'contests' && <Contests />}
        
        {currentView === 'shop' && <Shop />}
        
        {currentView === 'meeting' && !meetingState.inMeeting && (
          <MeetingLobby onJoinMeeting={handleJoinMeeting} />
        )}

        {currentView === 'meeting' && meetingState.inMeeting && (
          <MeetingRoom
            meetingCode={meetingState.meetingCode}
            isHost={meetingState.isHost}
            onLeave={handleLeaveMeeting}
          />
        )}
      </main>

      {showAIMentor && currentView === 'problem-detail' && (
        <AIMentor 
          problemId={selectedProblemId!}
          onClose={() => setShowAIMentor(false)}
        />
      )}
    </div>
  );
}