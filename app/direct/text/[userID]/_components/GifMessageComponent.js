import GetformatTime from '@/app/_helper/GetformatTime';

export default function GifMessageComponent({message, date}) {
  return (
    <div className="flex flex-col gap-1 py-2">
      <img
        className="rounded-lg"
        src={message}
      />
      <span className="self-end text-xs text-slate-400">{GetformatTime(date)}</span>
    </div>
  );
}
