import { MessageRounded } from "@mui/icons-material";
import InboxNav from "../_components/InboxNav";
import InboxMsgContainer from "../_components/InboxMsgContainer";

function InboxPage() {
  return (
    <div className="relative h-svh flex gap-4 flex-col px-4">
      <InboxNav/>
      <InboxMsgContainer/>
      <button className="absolute bottom-0 right-0 -translate-x-1/2 -translate-y-full transform rounded-l-xl rounded-tr-xl bg-accent-tint-200 p-4">
        <MessageRounded sx={{ fill: "rgb(58 ,74, 50)" }} />
      </button>
    </div>
  );
}

export default InboxPage;
