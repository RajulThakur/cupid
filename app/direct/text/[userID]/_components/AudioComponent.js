'use client';
import AudioWave from '@/app/_icons/AudioWave';
import Pause from '@/app/_icons/Pause';
import Play from '@/app/_icons/Play';
import {useRef, useState} from 'react';
import CircularProgress from './CircularLoader';
import Button from '@/app/_components/Button';

export default function AudioComponent({message}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  // Circle constants

  function handleClick() {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((play) => !play);
  }

  function handleTimeUpdate() {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    const progress = (currentTime / duration) * 100;
    setProgress(progress);
    if (progress === 100) {
      setProgress(0);
      setIsPlaying(false);
    }
  }

  // Calculate stroke offset

  return (
    <div className="flex h-12 max-w-fit items-center gap-4 rounded-md bg-accent-tint-400 px-3 py-2">
      {/* Audio Icon */}
      <AudioWave
        size="lg"
        strokeWidth={1}
        fill="black"
      />

      {/* Play/Pause Button with Circular Loader */}
      <Button
        className="relative flex w-auto items-center justify-center text-accent-shade-900"
        onClick={handleClick}>
        <CircularProgress circularProgress={progress} />
        {/* Play/Pause Icon */}
        {isPlaying ? <Pause stroke={2} /> : <Play stroke={2} />}
      </Button>

      {/* Audio Element */}
      <audio
        onTimeUpdate={handleTimeUpdate}
        ref={audioRef}>
        <source src={message} />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
