'use client';

import {useRecoilValue} from 'recoil';
import {audioCircularProgress} from '../_atom/Atoms';

export default function CircularProgress({radius = 20, stroke = 4, circularProgress}) {
  const progress = useRecoilValue(audioCircularProgress);
  const processValue = circularProgress || progress;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (processValue / 100) * circumference;
  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      className="absolute">
      <circle
        stroke="#e5e7eb"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke="#739464"
        fill="transparent"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="origin-center -rotate-90 transform transition-all duration-300"
      />
    </svg>
  );
}
