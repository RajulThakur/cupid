'use client';
import GifIcon from '@/app/_icons/Gif';
import MicIcon from '@/app/_icons/Mic';
import {useState} from 'react';
import FileUpload from './FileUpload';
import GifComponent from './GifComponent';

export default function AdditionalButtons() {
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  return (
    <div className="flex items-center gap-2">
      {isGiftOpen && <GifComponent setIsGiftOpen={setIsGiftOpen} />}
      <button
        className="rounded-md px-1 py-1 hover:bg-gray-300"
        onClick={() => setIsGiftOpen((prev) => !prev)}>
        <GifIcon size='md'  />
      </button>
      <FileUpload />
    </div>
  );
}
