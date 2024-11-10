"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

function InboxNavHeader() {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === "/direct/menu/request" ? 1 : pathname === "/direct/menu/voice" ? 2 : 0);
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
            router.push("/direct/menu/inbox");
          }}
        >
          Chat
        </TabButton>

        <TabButton
          id={1}
          handleClick={() => {
            setActive(1);
            router.push("/direct/menu/request");
          }}
        >
          Request
        </TabButton>

        {/* TODO: Add call feature */}
        {/* <TabButton
          id={2}
          handleClick={() => {
            setActive(2);
            router.push("/direct/menu/voice");
          }}
        >
          Call
        </TabButton> */}
      </div>
    </header>
  );
}

export default InboxNavHeader;
