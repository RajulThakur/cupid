'use client';

import {useRecoilValue} from 'recoil';
import {timer} from '../_atom/Atoms';

export default function AudioProgressBar({length}) {
  const timerValue = useRecoilValue(timer);
  const progress = (timerValue / length) * 100;

  // Determine if progress is resetting
  const isResetting = progress === 0;

  return (
    <div
      className="absolute left-0 top-0 h-9 rounded-lg bg-accent-shade-500"
      style={{
        width: `${progress}%`,
        // Disable transition when resetting, otherwise enable smooth transition
        transition: isResetting ? 'none' : 'width 100ms linear',
      }}
    />
  );
}