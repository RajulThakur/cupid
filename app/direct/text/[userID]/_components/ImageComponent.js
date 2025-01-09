'use client';
import {useState} from 'react';

export default function ImageComponent({message}) {
  const [isLoading, setIsLoading] = useState(true);
  function handleOnLoad(e) {
    setIsLoading(false);
    const img = e.target;
  }

  return (
    <div className="max-w-72 rounded-md">
      {/* Skeleton Loader */}
      {isLoading && (
        <div
          className="h-80 w-72 animate-pulse rounded-md bg-accent-tint-200"
          aria-label="Loading image placeholder"
        />
      )}

      {/* Render the image only after it has loaded */}
      <img
        className={`rounded-md transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        src={message}
        onLoad={handleOnLoad}
        alt="User sent image"
      />
    </div>
  );
}
