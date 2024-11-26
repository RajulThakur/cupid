import {useState} from 'react';

export default function AdditonalInfo({children}) {
  return (
    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
      {children}
    </span>
  );
}
