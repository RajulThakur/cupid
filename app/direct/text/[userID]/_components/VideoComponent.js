'use client';
import {useState} from 'react';

export default function VideoComponent({message}) {
  const [isLoading, setIsLoading] = useState(true);

  // Handle when the video has loaded
  function handleOnLoad() {
    setIsLoading(false);
  }

  return (
    <div className="max-w-72 rounded-md">
      {/* Skeleton Loader */}
      {isLoading && (
        <div
          className="h-80 w-72 animate-pulse rounded-md bg-accent-tint-200"
          aria-label="Loading video placeholder"
        />
      )}

      {/* Render the video only after it has loaded */}
      <video
        className={`rounded-md transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        width="100%"
        height="100%"
        controls
        src={message}
        onLoadedData={handleOnLoad}
        alt="User sent video"
      />
    </div>
  );
}
