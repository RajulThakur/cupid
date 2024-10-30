'use client'
import InboxMsgContainer from "@/app/_components/InboxMsgContainer";
import InboxMsgContainerSkeleton from "@/app/_components/InboxMsgContainerSkeleton";
import { useEffect, useState } from "react";

function DirectMessagesPage() {
  const [friends, setFriends] = useState(null);
  useEffect(() => {
    async function fetchFriends() {
      const res = await fetch("/api/friends");
      const data = await res.json();
      setFriends(data.friends);
    }
    fetchFriends();
  }, []);
  return (
    <div className={`gap-2 flex flex-col ${!friends ? "overflow-y-hidden" : ""}`}>
      {!friends ? (
        Array.from({ length: 7 }).map((_, index) => (
          <InboxMsgContainerSkeleton key={index} />
        ))
      ) : (
        friends.map((friend) => (
          <InboxMsgContainer key={friend._id} friend={friend} />
        ))
      )}
    </div>
  );
}

export default DirectMessagesPage;
