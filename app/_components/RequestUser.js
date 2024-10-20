'use client '
import { PersonAddRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";

export default function RequestUser({ user}) {
  async function handleRequest() {
    const res = await fetch("/api/requests/create_request", {
      method: "POST",
      body: JSON.stringify({ receiver: user._id }),
    });
  
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
      <button className="rounded-full p-2 text-accent-shade-700 transition-colors hover:bg-accent-tint-500" onClick={handleRequest  }>
        <PersonAddRounded  />
      </button>
    </li>
  );
}
