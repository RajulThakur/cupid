"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

function InboxNavHeader() {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === "/inbox/request" ? 1 : pathname === "/inbox/voice" ? 2 : 0);
  const router = useRouter();
  function TabButton({ children, handleClick, id }) {
    return (
      <button
        onClick={handleClick}
        className={`rounded-md px-7 py-1 text-xl font-bold transition-all md:px-16 md:py-2 ${active === id && "text-accent-shade-800"} ${active === id ? "bg-accent-shade-0" : "text-accent-shade-200"}`}
      >
        {children}
      </button>
    );
  }
  return (
    <header className="flex justify-center rounded-md bg-accent-tint-500 py-2">
      <div className="flex gap-2">
        <TabButton
          id={0}
          handleClick={() => {
            setActive(0);
            router.push("/inbox/direct");
          }}
        >
          Chat
        </TabButton>

        <TabButton
          id={1}
          handleClick={() => {
            setActive(1);
            router.push("/inbox/request");
          }}
        >
          Request
        </TabButton>

        <TabButton
          id={2}
          handleClick={() => {
            setActive(2);
            router.push("/inbox/voice");
          }}
        >
          Call
        </TabButton>
      </div>
    </header>
  );
}

export default InboxNavHeader;
