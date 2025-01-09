'use client';

import {useEffect, useState, useRef} from 'react';
import GifItem from './GifItem';
import {useRecoilValue} from 'recoil';
import {GifSearchValue} from '../_atom/Atoms';

export default function GifList({isLoading}) {
  const [gifs, setGifs] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [pos, setPos] = useState('');
  const scrollRef = useRef(null);
  const value = useRecoilValue(GifSearchValue);

  const limit = 20;
  const url = 'https://tenor.googleapis.com/v2/search?q=';
  const key = `&key=${process.env.NEXT_PUBLIC_GIF_API}&client_key=cupid-web-app`;

  // Debounce function to control rapid scroll events
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Fetch initial GIFs
  useEffect(() => {
    let isMounted = true; // Guard variable
    const endpoint = `${url}${value}${key}&limit=${limit}`;
    async function fetchGifs() {
      setIsFetching(true); // Start fetching
      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        if (isMounted) {
          console.log('v2', data);
          setPos(data.next);
          setGifs(data.results); // Append new results
        }
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      } finally {
        setIsFetching(false); // End fetching
      }
    }

    fetchGifs();

    return () => {
      isMounted = false; // Prevent updates after unmount
    };
  }, [value, key]);

  // Handle scroll event
  const handleScroll = debounce(async () => {
    if (!scrollRef.current || isFetching) return;

    const {scrollTop, clientHeight, scrollHeight} = scrollRef.current;

    // Trigger fetch when near the bottom
    if (scrollTop + clientHeight >= scrollHeight - 200) {
      setIsFetching(true); // Set fetching flag

      try {
        const fetchReq = await fetch(`${url}${value}${key}&limit=${limit}&pos=${pos}`);
        const data = await fetchReq.json();

        // Ensure no duplicate requests are processed
        if (data.next !== pos) {
          setPos(data.next);
          setGifs((prev) => [...prev, ...data.results]);
        }
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      } finally {
        setIsFetching(false); // Reset fetching flag
      }
    }
  }, 300); // Debounce delay of 300ms

  return (
    <div
      ref={scrollRef}
      className="h-auto max-h-96 overflow-scroll px-2"
      onScroll={handleScroll}>
      <div className="columns-2 gap-3">
        {gifs?.length > 0 &&
          gifs.map((gif) => (
            <GifItem
              key={gif.id}
              gif={gif}
              isLoading={isLoading}
            />
          ))}
      </div>
      {isFetching && (
        <div className="flex justify-center py-4">
          <span>Loading more GIFs...</span>
        </div>
      )}
    </div>
  );
}
