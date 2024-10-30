'use client'
import FriendRequest from "@/app/_components/FriendRequest";
import { useEffect, useState } from "react";

export default function RequestPage() {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    async function fetchRequests() {
      const res = await fetch("/api/requests/friend_requests");
      const data = await res.json();
      if (data.senderData) setRequests(data.senderData);
    }
    fetchRequests();
  }, []);
  return (
    <div>
      {requests.map((request) => (
        <FriendRequest key={request._id} request={request} />
      ))}
    </div>
  );
}
