import StyledAvatar from "./StyledAvatar";

function MessageItem() {
  return (
    <section className="flex items-center gap-4 rounded-lg bg-accent-tint-900 px-4 py-5">
      <StyledAvatar alt="Priyanka" style={{width:"56px",height:"56px"}}/>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold tracking-wide">Priyanka</p>
          <span className="text-sm text-slate-400">2min ago</span>
        </div>
        <span className="text-base text-slate-500">Good Morning 💗</span>
      </div>
    </section>
  );
}

export default MessageItem;
