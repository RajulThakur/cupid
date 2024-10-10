'use client '
import { PersonAddRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";

export default function RequestUser({ user}) {
  async function handleAccept() {
    const res = await fetch("/api/friend-requests", {
      method: "POST",
      body: JSON.stringify({ receiver: user._id }),
    });
    const data = await res.json();
    console.log(data);
  }
  return (
    <li
      className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
    >
      <div className="flex items-center justify-start gap-4">
        <Avatar alt={user.firstName} src={user.avatar} />
        <div className="flex flex-col">
          <span className="font-medium">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-accent-shade-500">{user.username}</span>
        </div>
      </div>
      <button className="rounded-full p-2 text-accent-shade-700 transition-colors hover:bg-accent-tint-500" onClick={handleAccept}>
        <PersonAddRounded  />
      </button>
    </li>
  );
}
