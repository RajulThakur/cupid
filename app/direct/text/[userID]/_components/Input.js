'use client';
import isOnlyEmojis from '@/app/_helper/isOnlyEmoji';
import {push} from 'firebase/database';
import {useRef, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {MessageState} from '../_atom/Atoms';
import AdditionalButtons from './AdditionalButton';

import SentIcon from '@/app/_icons/Sent';
import {useUserIDContext} from '../_context/UserIDContext';
import RecordingComponent from './RecordingComponent';
import MicIcon from '@/app/_icons/Mic';
import Button from '@/app/_components/Button';

export default function InputBar() {
  const [value, setValue] = useState('');
  const {userID, messagesRef} = useUserIDContext();
  const [isRecording, setIsRecording] = useState(false);
  const setMessages = useSetRecoilState(MessageState);
  async function handleSubmit() {
    const isOnlyEmoji = isOnlyEmojis(value);
    if (value.trim()) {
      setMessages((messages) => [
        ...messages,
        {
          id: Date.now(),
          message: value,
          isYou: true,
          from: userID,
          createdAt: new Date(),
          msgType: isOnlyEmoji ? 'emoji' : 'text',
        },
      ]);
      setValue('');
      push(messagesRef, {
        from: userID,
        msgType: isOnlyEmoji ? 'emoji' : 'text',
        value: value,
        createdAt: new Date().toISOString(),
      });
    }
  }

  const handleChange = (e) => {
    const {value} = e.target;
    const length = value.length;
    if (value[length - 1] === '\n') {
      handleSubmit();
    } else {
      setValue(value);
    }
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white p-2 px-4 py-1 shadow-sm">
      {!isRecording && (
        <textarea
          onChange={handleChange}
          value={value}
          className="h-auto flex-1 resize-none overflow-y-auto px-1 py-2 focus:outline-none"
          placeholder="Type your message..."
          rows="1"
          maxLength="1000"
        />
      )}
      <RecordingComponent
        isRecording={isRecording}
        setIsRecording={setIsRecording}
      />
      {!value && !isRecording && (
        <>
          <AdditionalButtons />
        </>
      )}
      {(value) && (
        <Button
          onClick={handleSubmit}
          className="flex items-center gap-2 rounded-lg bg-accent-shade-900 px-4 py-2 text-slate-100">
          <span>Send </span>
          <SentIcon />
        </Button>
      )}
    </div>
  );
}
