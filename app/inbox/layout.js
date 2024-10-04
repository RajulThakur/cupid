'use client';

import { useState } from 'react';
import { MessageRounded } from "@mui/icons-material";
import { usePathname } from 'next/navigation';
import InboxNav from '@/app/_components/InboxNav';
import InboxMsgContainer from '../_components/InboxMsgContainer';

export default function InboxLayout({ children }) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname === '/inbox/requests' ? 'requests' : 'direct');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="relative h-svh flex gap-4 flex-col px-4">
      <InboxNav activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="flex-grow overflow-auto">
        {activeTab === 'direct' && pathname === '/inbox' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Direct Messages</h2>
            <InboxMsgContainer/>
          </div>
        )}
        {activeTab === 'requests' && pathname === '/inbox/requests' && (
          <div>
            <h2 className="text-xl font-bold mb-4">Requests</h2>
            {/* Add your requests content here */}
          </div>
        )}
        {children}
      </div>
      <button className="absolute bottom-0 right-0 -translate-x-1/2 -translate-y-full transform rounded-l-xl rounded-tr-xl bg-accent-tint-200 p-4">
        <MessageRounded sx={{ fill: "rgb(58 ,74, 50)" }} />
      </button>
    </div>
  );
}
