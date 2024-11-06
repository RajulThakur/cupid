import InboxNav from "@/app/_components/InboxNav";
import { SessionProvider } from "next-auth/react";
export const metadata = {
  title: "Direct",
  description: "Direct messages",
};
export default async function InboxLayout({ children }) {
  return (
    <SessionProvider>
      <div className="relative flex h-svh flex-col gap-4 px-4">
      <InboxNav />
      <div className="flex-grow overflow-auto">{children}</div>
      {/* <button className="absolute bottom-0 right-0 -translate-x-1/2 -translate-y-full transform rounded-l-xl rounded-tr-xl bg-accent-tint-200 p-4">
        <MessageRounded sx={{ fill: "rgb(58 ,74, 50)" }} />
      </button> */}
    </div>
    </SessionProvider>
  );
}
