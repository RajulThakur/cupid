'use client';
import {useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {GifSearchValue} from '../_atom/Atoms';
import useDebounce from '@/app/_hooks/Debouncing';
export default function GifInput() {
  const [search, setSearch] = useState('');
  const setGifSearchValue = useSetRecoilState(GifSearchValue);
  let value = useDebounce(search, 500);
  if (value) setGifSearchValue(value);
  function handleChange(event) {
    setSearch(event.target.value);
  }
  return (
    <input
      type="text"
      className="h-8 rounded-md border-gray-300 p-2 backdrop-blur-sm"
      placeholder="Search Gif"
      value={search}
      onChange={handleChange}
    />
  );
}
