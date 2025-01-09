'use client';

import Button from '@/app/_components/Button';
import MicIcon from '@/app/_icons/Mic';
import XMark from '@/app/_icons/XMark';
import {useRef, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {circularProgress, isAudioRecorded, MessageState, timer} from '../_atom/Atoms';
import AudioProgressBar from './AudioProgressBar';
import PlayPauseButton from './PlayPauseButton';
import Timer from './Timer';
import SentIcon from '@/app/_icons/Sent';
import {storage} from '@/app/_firebase/firebase';
import {push} from 'firebase/database';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {useUserIDContext} from '../_context/UserIDContext';

export default function AudioRecorderBar({isRecording, setIsRecording}) {
  // Refs for MediaRecorder, MediaStream, audio chunks, and interval
  const mediaRecorderRef = useRef(null); // Stores the MediaRecorder instance
  const streamRef = useRef(null); // Stores the MediaStream for stopping tracks
  const audioChunksRef = useRef([]); // Stores audio data chunks
  const intervalRef = useRef(null); // Interval reference for timer updates
  const isClosing = useRef(false);
  const audio_blob = useRef(null);
  // State variables
  const [audioUrl, setAudioUrl] = useState(null); // Stores the URL of the recorded audio
  const audioLength = useRef(0); // Tracks the recording length
  const setTimer = useSetRecoilState(timer); // Updates the timer state
  const setIsRecorded = useSetRecoilState(isAudioRecorded); // Sets whether audio is recorded or not
  const {chatID, messagesRef, userID} = useUserIDContext();
  const setMessages = useSetRecoilState(MessageState);
  const setCircleProgress = useSetRecoilState(circularProgress);

  // Constants
  const MAX_RECORDING_TIME = 120 * 1000; // Maximum recording time: 2 minutes

  //Handle Upload
  async function handleUpload(file) {
    console.log(file);
    console.log('file', file);
    const fileName = 'audioClip.wav';
    const fileType = 'audio';
    const uniqueFileName = `/recording/${chatID}/${Date.now()}_${fileName}`;
    const storageRef = ref(storage, uniqueFileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const messageID = Date.now();
    // Track upload state
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: messageID,
        message: {
          fileType,
          fileName,
          cancelUpload: () => uploadTask.cancel(),
        },
        isYou: true,
        from: userID,
        createdAt: new Date(),
        msgType: 'upload',
      },
    ]);

    try {
      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setCircleProgress(progress);
          },
          (error) => reject(error),
          () => resolve()
        );
      });

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      // Update with successful upload
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageID ? {...msg, message: downloadURL, msgType: fileType} : msg
        )
      );

      await push(messagesRef, {
        from: userID,
        msgType: fileType,
        value: downloadURL,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error(`Upload canceled or failed for ${file.name}:`, error);

      // Remove the canceled upload
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageID));
    }
  }
  //Handle sent
  async function handleSubmit() {
    if (!audioUrl) return;
    const audio = audio_blob.current;
    setIsRecording(false);
    await handleUpload(audio);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    clearInterval(intervalRef.current);
    isClosing.current = true;
    setAudioUrl(null);
    setIsRecorded(false);
    setIsRecording(false);
    streamRef.current = null;
    mediaRecorderRef.current = null;
    audioLength.current = 0;
    setTimer(0);
  }

  // Function to start recording
  const handleRecording = async () => {
    try {
      isClosing.current = false;
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({audio: true});
      const recorder = new MediaRecorder(stream);

      // Initialize recording setup
      streamRef.current = stream;
      audioChunksRef.current = [];
      setTimer(0);

      // Push recorded audio chunks to the ref
      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      // Handle stop event and generate the audio URL
      recorder.onstop = () => {
        if (isClosing.current) return;

        // Stop all tracks before creating the blob
        streamRef.current?.getTracks().forEach((track) => track.stop());

        const audioBlob = new Blob(audioChunksRef.current, {type: 'audio/wav'});
        console.log('Audio blob-', audioBlob);
        audio_blob.current = audioBlob;
        const audioUrl = URL.createObjectURL(audioBlob);

        setIsRecorded(true); // Mark audio as recorded
        setAudioUrl(audioUrl);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        // Cleanup on unmount
        return () => {
          if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
          }
        };
      };

      // Start the recording and set up timer updates
      recorder.start();
      setIsRecording(true);
      mediaRecorderRef.current = recorder;

      intervalRef.current = setInterval(() => {
        setTimer((prev) => {
          const nextTime = prev + 100;
          audioLength.current = nextTime;
          // Stop recording when max recording time is reached
          if (nextTime > MAX_RECORDING_TIME) {
            recorder.stop();
          }
          return nextTime;
        });
      }, 100);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsRecording(false);
    }
  };

  // Function to stop recording and cleanup resources
  const handleClose = () => {
    // if (mediaRecorderRef.current?.state === 'recording') {
    //   mediaRecorderRef.current.stop();
    // }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    clearInterval(intervalRef.current);
    isClosing.current = true;
    setAudioUrl(null);
    setIsRecorded(false);
    setIsRecording(false);
    streamRef.current = null;
    mediaRecorderRef.current = null;
    audioLength.current = 0;
    setTimer(0);
  };

  // Render the UI for recording
  if (!isRecording) {
    return (
      <Button
        className="px-1 py-1"
        onClick={handleRecording}>
        <MicIcon size="md" />
      </Button>
    );
  }

  return (
    <div className="flex w-full items-center gap-2">
      {/* Cancel Button */}
      <Button
        className="flex h-5 w-5 items-center justify-center rounded-full bg-accent-shade-500 p-1 text-accent-tint-900"
        onClick={handleClose}>
        <XMark
          size="xs"
          fill="#f9fef6"
          strokeWidth={2.5}
        />
      </Button>

      {/* Progress Bar */}
      <div className="relative mx-2 h-9 flex-1 rounded-lg bg-accent-tint-300">
        <AudioProgressBar length={audioUrl ? audioLength.current : MAX_RECORDING_TIME} />
        <PlayPauseButton
          mediaRecorderRef={mediaRecorderRef}
          intervalRef={intervalRef}
          audioLength={audioLength.current}
          audioUrl={audioUrl}
        />
      </div>

      {/* Timer */}
      <Timer />

      <Button
        onClick={handleSubmit}
        className="flex items-center gap-2 rounded-lg bg-accent-shade-900 px-4 py-2 text-slate-100">
        <span>Send </span>
        <SentIcon />
      </Button>
    </div>
  );
}
