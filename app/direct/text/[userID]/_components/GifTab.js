'use client';
import {useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {GifSearchValue} from '../_atom/Atoms';
export default function GifTab() {
  const [activeTab, setActiveTab] = useState(1);
  const icons = [
    {tab: 'recent', iconName: 'Clock'},
    {tab: 'trending', iconName: 'Trend'},
    {tab: 'Star', iconName: 'Star'},
    {tab: 'Love', iconName: 'Heart'},
    {tab: 'Depressed', iconName: 'FaceFrown'},
    {tab: 'ThumpUp', iconName: 'ThumbUp'},
  ];
  const setSearchValue = useSetRecoilState(GifSearchValue);
  return (
    <div className="flex justify-between">
      {icons.map((Icon, index) => (
        <div
          key={index}
          className={`flex cursor-pointer flex-col items-center gap-1 transition-all duration-300 ${
            activeTab === index
              ? 'scale-110 stroke-red-800 text-red-800'
              : 'stroke-gray-400 text-gray-400 hover:scale-105'
          }`}
          onClick={() => {
            setActiveTab(index);
            setSearchValue(icons[index].tab);
          }}>
          <img
            className={`h-6 w-6 ${index === activeTab ? 'text-slate-400' : 'stroke-slate-300'}`}
            src={`/icons/${Icon.iconName}.svg`}
            alt={Icon}
          />
          {activeTab === index && <span className="h-1 w-4 rounded-full bg-slate-300"></span>}
        </div>
      ))}
    </div>
  );
}
