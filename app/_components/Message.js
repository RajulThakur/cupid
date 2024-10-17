import { Avatar } from "@mui/material";
import GetformatTime from "../_helper/GetformatTime";
function MessageComponent({
  text,
  isYou = true,
  user = "You",
}) {
  return (
    <div
      className={`flex gap-3 ${isYou ? "justify-end" : "justify-start"}`}
    >
      {!isYou && (
        <div className="self-end">
        <Avatar sx={{ height: "45px", width: "45px" }} />
      </div>
    )}
    <div className={`w-auto max-w-xs rounded-l-2xl rounded-tr-2xl ${isYou ? "bg-accent-tint-0" : "bg-foreground"}  px-4 py-3 text-base`}>
      <p className={`font-semibold ${isYou ? "text-accent-shade-1000" : "text-accent-tint-0"}`}>{user}</p>
      <div className={`max-h-auto pr-4 text-base leading-snug ${isYou ? "text-accent-shade-1000" : "text-background"}`}>
        {text}
      </div>
      <p className="mt-[1px] text-right text-accent-shade-400">{GetformatTime()}</p>
    </div>
    {isYou && (
      <div className="self-end">
        <Avatar sx={{ height: "45px", width: "45px" }} />
      </div>
    )}
  </div>
  );
}
export default MessageComponent;