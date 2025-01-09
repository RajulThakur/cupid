import AudioWave from '@/app/_icons/AudioWave';
import PhotoIcon from '@/app/_icons/Photo';
import VideoIcon from '@/app/_icons/Video';
import XMark from '@/app/_icons/XMark';
import {useRecoilValue} from 'recoil';
import {circularProgress} from '../_atom/Atoms';

export default function UploadingComponent({message}) {
  const circleProgress = useRecoilValue(circularProgress);
  const radius = 20;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (circleProgress / 100) * circumference;
  const {fileName, fileType} = message;
  console.log(fileType);
  return (
    <div className="flex h-12 max-w-fit items-center gap-4 rounded-md bg-accent-tint-400 px-3 py-2">
      <button
        onClick={() => {
          message.cancelUpload?.();
        }}
        className="relative flex w-auto items-center justify-center text-accent-shade-900">
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
        <XMark
          size="md"
          strokeWidth={2.5}
        />
      </button>
      <div className="flex items-center gap-1">
        <span className="max-w-[200px] truncate text-base font-normal capitalize tracking-wide text-accent-shade-900">
          {fileName}
        </span>
        <span>
          {fileType === 'audio' && <AudioWave size="sm" fill='black' strokeWidth={1} />}
          {fileType === 'image' && <PhotoIcon />}
          {fileType === 'video' && <VideoIcon />}
        </span>
      </div>
    </div>
  );
}
