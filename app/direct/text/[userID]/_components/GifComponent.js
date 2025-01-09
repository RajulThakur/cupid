'use client';
import Image from 'next/image';
import GifInput from './GifInput';
import GifList from './GifList';
import GifTab from './GifTab';
import XMark from '@/app/_icons/XMark';
export default function GifComponent({setIsGiftOpen}) {
  return (
    <div className="absolute bottom-16 right-3 z-50 flex h-[500px] max-h-dvh max-w-full flex-col gap-3 rounded-xl border-2 px-2 pb-2 pt-4 shadow-sm backdrop-blur-2xl md:max-w-xs">
      <button
        className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-white p-1 shadow-sm"
        onClick={() => setIsGiftOpen(false)}>
        <XMark />
      </button>
      <GifTab />
      <GifInput />
      <GifList />
    </div>
  );
}
