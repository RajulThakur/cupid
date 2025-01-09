/* eslint-disable @next/next/no-img-element */
'use client';
import {push} from 'firebase/database';
import {useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {MessageState} from '../_atom/Atoms';
import {useUserIDContext} from '../_context/UserIDContext';
export default function GifItem({gif}) {
  const [isLoading, setIsLoading] = useState(true);
  const setMessages = useSetRecoilState(MessageState);
  const {messagesRef, userID} = useUserIDContext();
  const nanogif = gif.media_formats.nanogif.url;
  const tinyGif = gif.media_formats.tinygif.url;
  const mediumGif = gif.media_formats.gif.url;
  async function handleGifClick() {
    setMessages((messages) => [
      ...messages,
      {
        id: Date.now(),
        message: mediumGif,
        isYou: true,
        from: userID,
        createdAt: new Date(),
        msgType: 'gif',
      },
    ]);
    push(messagesRef, {
      from: userID,
      msgType: 'gif',
      value: mediumGif,
      createdAt: new Date().toISOString(),
    });
  }
  return (
    <div
      className="relative mb-2 w-full rounded-md"
      onClick={handleGifClick}>
      {/* Skeleton Loader */}
      {isLoading && <div className={`absolute inset-0 animate-pulse rounded-md bg-gray-300`}></div>}
      <img
        className={`w-full rounded-md transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        alt={gif.content_description}
        src={nanogif}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
