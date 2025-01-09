'use client';

import Button from '@/app/_components/Button';
import Pause from '@/app/_icons/Pause';
import Play from '@/app/_icons/Play';
import Stop from '@/app/_icons/Stop';
import {useRef, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {isAudioRecorded, timer} from '../_atom/Atoms';

export default function PlayPauseButton({intervalRef, mediaRecorderRef, audioUrl, audioLength}) {
  const audioRef = useRef(null); // Ref for the audio element
  const [isPlaying, setIsPlaying] = useState(false); // Tracks play/pause state
  const isRecorded = useRecoilValue(isAudioRecorded); // Checks if the audio is recorded
  const setRecordTimer = useSetRecoilState(timer); // Updates the playback timer

  // Function to handle play
  const handlePlay = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.play(); // Play the audio

      intervalRef.current = setInterval(() => {
        const progressTime = Math.min(audio.currentTime * 1000, audioLength); // Convert to ms
        setRecordTimer(progressTime);

        // Clear interval when playback ends
        if (progressTime >= audioLength) {
          clearInterval(intervalRef.current);
        }
      }, 100);

      setIsPlaying(true); // Set playing state
    }
  };

  // Function to handle pause
  const handlePause = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause(); // Pause the audio
      clearInterval(intervalRef.current); // Clear the timer interval
      setIsPlaying(false); // Set playing state
    }
  };

  // Handle stopping of the recording
  const handleStopPlayback = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      clearInterval(intervalRef.current);
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <>
      {/* Hidden audio element for playback */}
      <audio
        src={audioUrl}
        ref={audioRef}
        onEnded={() => {
          clearInterval(intervalRef.current);
          setIsPlaying(false);
          setRecordTimer(0); // Reset timer
        }}>
        <source src={audioUrl} />
      </audio>

      {/* Play/Pause/Stop Button */}
      {!isRecorded ? (
        <Button
          className="absolute left-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white p-1 text-[#607c53] shadow"
          onClick={handleStopPlayback}>
          <Stop
            size="sm"
            fill="#607c53"
          />
        </Button>
      ) : (
        <Button
          className="absolute left-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white p-1 text-[#607c53] shadow"
          onClick={isPlaying ? handlePause : handlePlay}>
          {isPlaying ? (
            <Pause
              size="sm"
              strokeWidth={4}
              fill="#607c53"
            />
          ) : (
            <Play
              size="xs"
              fill="#607c53"
            />
          )}
        </Button>
      )}
    </>
  );
}
