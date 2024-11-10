'use client'
import FriendRequests from "@/app/_components/FriendRequests";
import { useEffect, useState, useRef } from "react";
import { BASE_URL } from "@/app/_helper/Config";
export default function RequestPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const interval = useRef(null);
  useEffect(() => {

    async function fetchRequests() {
      async function initialFetch() {
        const res = await fetch(`${BASE_URL}/requests/friend_requests`);
        const data = await res.json();
        if (data.senderData) setRequests(data.senderData);
      }
      initialFetch();
      interval.current = setInterval(async () => {
        const res = await fetch(`${BASE_URL}/requests/friend_requests`);
        const data = await res.json();
        if (data.senderData) setRequests(data.senderData);
      }, 5000);
    }
    fetchRequests();
    setLoading(false);
    return () => clearInterval(interval.current);
  }, []);
  return (
    <div>
      {loading ? <p>Loading...</p> : <FriendRequests requests={requests} setRequests={setRequests} />}
    </div>
  );
}
