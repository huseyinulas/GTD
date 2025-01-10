import { useState, useEffect, useRef } from 'react';
import {
  TimerContainer,
  TimerDisplay,
  ProgressBarContainer,
  ProgressBar,
  TimerButton
} from '../styles/components/Timer.styles';

const TOTAL_TIME = 120; // 2 minutes in seconds

const Timer = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio('/notification.mp3'));

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (!isMuted && [60, 30, 10].includes(prev - 1)) {
            audioRef.current.play().catch(e => console.log('Audio play failed:', e));
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      onComplete && onComplete();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onComplete, isMuted]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TOTAL_TIME);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / TOTAL_TIME) * 100;
  const isWarning = timeLeft < 30;

  return (
    <TimerContainer>
      <h3>2-Minute Timer</h3>
      <TimerDisplay isWarning={isWarning}>
        {formatTime(timeLeft)}
      </TimerDisplay>
      <ProgressBarContainer>
        <ProgressBar 
          progress={progress} 
          isWarning={isWarning}
        />
      </ProgressBarContainer>
      <div>
        <TimerButton 
          isRunning={isRunning} 
          onClick={toggleTimer}
        >
          {isRunning ? 'Pause' : 'Start'}
        </TimerButton>
        <TimerButton onClick={resetTimer}>
          Reset
        </TimerButton>
        <TimerButton 
          onClick={toggleMute}
          style={{ backgroundColor: isMuted ? '#6c757d' : '#17a2b8' }}
        >
          {isMuted ? '🔇 Unmute' : '🔊 Mute'}
        </TimerButton>
      </div>
    </TimerContainer>
  );
};

export default Timer; 