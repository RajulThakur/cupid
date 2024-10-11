import { CheckRounded, CloseRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
function FriendRequest({ request }) {
  return (
    <section className="flex items-center gap-4 rounded-lg bg-accent-tint-1000 px-4 py-5">
      <Avatar alt="Priyanka" style={{ width: "56px", height: "56px" }} />
      <div className="flex-1">
        <p className="text-lg font-semibold tracking-wide">{request.username}</p>
      </div>
      <button className="bg-accent-tint-600 rounded-md px-2 py-1 text-accent-shade-800 font-bold tracking-wider hover:bg-accent-tint-400 text-base">
         <CheckRounded sx={{ fontSize: "1.2rem", strokeWidth: "0.1rem" ,stroke: "rgb(96,124,83)" }} />
      </button>
      <button className="rounded-md bg-red-500 hover:bg-red-600 px-2 py-1 text-white">
        Reject <CloseRounded sx={{ fontSize: "1.2rem", strokeWidth: "0.1rem" }} />
      </button>
    </section>
  );
}

export default FriendRequest;
