'use client '
import { PersonAddRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { BASE_URL } from "../_helper/Config";

export default function RequestUser({ user}) {
  async function handleRequest() {
    await fetch(`${BASE_URL}/requests/create_request`, {
      method: "POST",
      body: JSON.stringify({ receiver: user.id }),
    });
  
  }
  return (
    <li
      className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
    >
      <div className="flex items-center justify-start gap-4">
        <Avatar alt={user.firstName} src={user.profileImage} />
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
