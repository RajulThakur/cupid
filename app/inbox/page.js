import { MessageRounded } from "@mui/icons-material";

function InboxPage() {
  return (
    <div className="relative h-svh">
      <button className="bg-accent-tint-200 absolute bottom-0 right-0 p-4 transform -translate-x-1/2 -translate-y-full rounded-l-xl rounded-tr-xl ">
        <MessageRounded sx={{ fill: "rgb(58 ,74, 50)" }} />
      </button>
    </div>
  );
}

export default InboxPage;
