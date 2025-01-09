'use client';

import {useState, useRef, useEffect} from 'react';

export default function AudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(null); // To store the duration
  const [recordingDuration, setRecordingDuration] = useState(0); // Timer for recording
  const [formattedDuration, setFormattedDuration] = useState('00:00');
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const streamRef = useRef(null); // To store the MediaStream
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      streamRef.current = stream; // Save the MediaStream for later use
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks.current, {type: 'audio/wav'});
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        console.log('blob', blob);
        console.log('audio-url', url);
        audioChunks.current = []; // Clear the chunks
        stopStream(); // Stop the stream when recording ends
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      startTimer(); // Start the timer
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    stopTimer(); // Stop the timer
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop()); // Stop all tracks
      streamRef.current = null; // Clear the reference
    }
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);

    audio.onended = () => setIsPlaying(false);
  };

  const startTimer = () => {
    setRecordingDuration(0);
    intervalRef.current = setInterval(() => {
      setRecordingDuration((prev) => {
        const nextTime = prev + 1;
        setFormattedDuration(formatTime(nextTime));
        return nextTime;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  function handleLoad() {
    const audio = audioRef.current;
    if (!audio) return;
    setAudioDuration(audio.duration.toFixed(2));
    console.log('audio-duration', audio.duration);
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-lg font-bold">Audio Recorder</h1>

      <div className="flex items-center gap-2">
        {isRecording ? (
          <button
            onClick={handleStopRecording}
            className="rounded bg-red-500 px-4 py-2 text-white">
            Stop Recording
          </button>
        ) : (
          <button
            onClick={handleStartRecording}
            className="rounded bg-green-500 px-4 py-2 text-white">
            Start Recording
          </button>
        )}
      </div>

      {isRecording && (
        <p className="text-sm font-semibold text-gray-700">Recording Time: {formattedDuration}</p>
      )}

      {audioUrl && (
        <div className="flex flex-col items-center gap-2">
          <audio
            ref={audioRef}
            src={audioUrl}
            onLoadedMetadata={handleLoad}
            controls
            hidden
          />
          <button
            onClick={handlePlayPause}
            className="rounded bg-blue-500 px-4 py-2 text-white">
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <p className="text-sm text-gray-500">Recording Duration: {formattedDuration}</p>
          {audioDuration && (
            <p className="text-sm text-gray-500">Audio Duration: {audioDuration} seconds</p>
          )}
        </div>
      )}
    </div>
  );
}
