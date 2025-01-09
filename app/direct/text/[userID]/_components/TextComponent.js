import GetformatTime from '@/app/_helper/GetformatTime';
import {Avatar} from '@mui/material';

export default function TextComponent({message, isYou, user, date}) {
  return (
    <div
      className={`w-auto max-w-xs ${isYou ? 'rounded-l-xl rounded-tr-xl md:rounded-l-2xl md:rounded-tr-2xl' : 'rounded-r-xl rounded-tl-xl md:rounded-r-2xl md:rounded-tl-2xl'} ${isYou ? 'bg-accent-tint-0' : 'bg-accent-shade-900'} px-2 py-1 text-base md:px-4 md:py-3`}>
      <p
        className={`text-sm font-semibold lg:text-base ${isYou ? 'text-accent-shade-1000' : 'text-accent-tint-0'}`}>
        {user}
      </p>

      <div
        className={`max-h-auto text-base leading-snug md:pr-4 ${isYou ? 'text-accent-shade-1000' : 'text-slate-200'}`}>
        {message}
      </div>
      <p className="mt-[1px] text-right text-xs text-accent-shade-400 md:text-sm lg:text-base">
        {GetformatTime(date)}
      </p>
    </div>
  );
}
