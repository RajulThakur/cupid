'use client';

import {useRecoilValue} from 'recoil';
import {timer} from '../_atom/Atoms';

export default function Timer() {
  const timerValue = useRecoilValue(timer);

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000); // Convert ms to seconds
    const mins = Math.floor(seconds / 60); // Calculate minutes
    const secs = seconds % 60; // Calculate remaining seconds
    return `${mins}:${secs.toString().padStart(2, '0')}`; // Format as MM:SS
  };

  return (
    <span className="text-base font-semibold tracking-wide text-accent-shade-500">
      {formatTime(timerValue)}
    </span>
  );
}
