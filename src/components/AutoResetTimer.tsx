import React, { useEffect, useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface AutoResetTimerProps {
  onReset: () => void;
  timeoutSeconds?: number;
}

export const AutoResetTimer: React.FC<AutoResetTimerProps> = ({
  onReset,
  timeoutSeconds = 40
}) => {
  const [timeLeft, setTimeLeft] = useState(timeoutSeconds);

  useEffect(() => {
    let timer: any;
    let secondsRemaining = timeoutSeconds;

    const resetInactivity = () => {
      secondsRemaining = timeoutSeconds;
      setTimeLeft(timeoutSeconds);
    };

    const interval = setInterval(() => {
      secondsRemaining -= 1;
      setTimeLeft(secondsRemaining);
      if (secondsRemaining <= 0) {
        clearInterval(interval);
        onReset();
      }
    }, 1000);

    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    activityEvents.forEach(evt => window.addEventListener(evt, resetInactivity, { passive: true }));

    return () => {
      clearInterval(interval);
      activityEvents.forEach(evt => window.removeEventListener(evt, resetInactivity));
    };
  }, [onReset, timeoutSeconds]);

  // Subtle progress calculation
  const progressPercent = (timeLeft / timeoutSeconds) * 100;

  return (
    <div 
      className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono-code border border-neutral-800 bg-neutral-950/80 backdrop-blur rounded-none text-neutral-400 select-none cursor-pointer hover:border-neutral-600 transition-colors"
      title="Auto-resets after 40 seconds of inactivity. Tap to reset timer."
      onClick={() => setTimeLeft(timeoutSeconds)}
    >
      <RotateCcw className={`w-3 h-3 ${timeLeft <= 10 ? 'animate-spin text-white' : 'text-neutral-500'}`} />
      <span className={timeLeft <= 10 ? 'text-white font-bold' : ''}>
        RESET IN {timeLeft}s
      </span>
      <div className="w-10 h-1 bg-neutral-800 overflow-hidden">
        <div 
          className="h-full bg-neutral-300 transition-all duration-1000"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
