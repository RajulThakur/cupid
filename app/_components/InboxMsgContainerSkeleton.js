export default function InboxMsgContainerSkeleton() {
  return (
    <div className="flex flex-col">
      <section className="flex items-center gap-4 rounded-lg bg-accent-tint-900 px-4 py-5">
        <div
          className="animate-pulse rounded-full bg-accent-tint-200"
          style={{ width: "56px", height: "56px" }}
        ></div>
        <div className="flex h-auto flex-1 flex-col gap-2">
          <div className="flex h-5 items-center justify-between">
            <span className="h-full w-36 animate-pulse rounded-md bg-accent-tint-200"></span>
            <span className="h-full w-24 animate-pulse rounded-md bg-accent-tint-200"></span>
          </div>
          <span className="h-4 w-32 animate-pulse rounded-md bg-accent-tint-200"></span>
        </div>
      </section>
    </div>
  );
}
