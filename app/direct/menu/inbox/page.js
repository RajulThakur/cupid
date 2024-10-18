'use client'
import InboxMsgContainer from "@/app/_components/InboxMsgContainer";
import { useEffect, useState } from "react";

function DirectMessagesPage() {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    async function fetchFriends() {
      const res = await fetch("/api/friends");
      const data = await res.json();
      console.log(data);
      setFriends(data.friends);
    }
    fetchFriends();
  }, []);
  return (
    <div className="gap-2 flex flex-col">
      {friends.map((friend) => (
        <InboxMsgContainer key={friend._id} friend={friend} />
      ))}
    </div>
  );
}

export default DirectMessagesPage;
