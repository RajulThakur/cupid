'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';

export default function TestComponet() {
  const [gifs, setGifs] = useState([]);
  const gif = `https://g.tenor.com/v1/search?q=naruto&key=LIVDSRZULELA&limit=8`;
  useEffect(
    function () {
      async function getGif() {
        const res = await fetch(gif);
        const data = await res.json();
        console.log(data);
        setGifs(data.results);
      }
      getGif();
    },
    [gif]
  );
  return (
    <div className="w-96 columns-2 gap-3">
      {gifs?.length &&
        gifs.map((gif) => (
          <img
            key={gif.id}
            className="mb-2 w-full rounded-sm"
            alt={gif.content_description}
            src={gif.media[0].gif.url}
          />
        ))}
    </div>
  );
}
