import { useRouter } from "next/navigation";
import StyledAvatar from "./StyledAvatar";

function InboxMsgContainer({ friend }) {
  const router = useRouter();
  return (
    <div className="flex flex-col" onClick={()=>{
      router.push(`/direct/text/${friend._id}`);
    }}>
      <section className="flex items-center gap-4 rounded-lg bg-accent-tint-900 px-4 py-5">
        <StyledAvatar
          alt={friend.username}
          style={{ width: "56px", height: "56px" }}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold tracking-wide">
              {friend.firstName} {friend.lastName}
            </p>
            <span className="text-sm text-slate-400">2min ago</span>
          </div>
          <p className="font-slate-400 text-sm">{friend.username}</p>
        </div>
      </section>
    </div>
  );
}

export default InboxMsgContainer;
