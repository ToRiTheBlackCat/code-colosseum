import { useState } from 'react';
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

type View = 'problems' | 'problem-detail' | 'leaderboard' | 'profile' | 'contests' | 'shop' | 'meeting';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('profile');
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);
  const [showAIMentor, setShowAIMentor] = useState(false);
  const [meetingState, setMeetingState] = useState<{ inMeeting: boolean; meetingCode: string; isHost: boolean }>({
    inMeeting: false,
    meetingCode: '',
    isHost: false,
  });

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

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        onBackToProblems={handleBackToProblems}
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
        
        {currentView === 'profile' && <UserProfile />}
        
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