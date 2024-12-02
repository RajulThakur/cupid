import {Avatar} from '@mui/material';
import GetformatTime from '../_helper/GetformatTime';

export default function TextComponent({
  message,
  isYou,
  user,
  date,
  yourProfileImage,
  friendProfileImage,
}) {
  return (
    <div className={`flex snap-start select-none gap-1 md:gap-3 ${isYou ? 'justify-end' : 'justify-start'}`}>
      {!isYou && (
        <div className="self-end">
          <Avatar
            sx={{
              height: {xs: '35px', md: '45px'},
              width: {xs: '35px', md: '45px'}
            }}
            src={friendProfileImage}
          />
        </div>
      )}
      <div
        className={`w-auto max-w-xs ${isYou ? 'rounded-l-xl rounded-tr-xl md:rounded-l-2xl md:rounded-tr-2xl' : 'rounded-r-xl rounded-tl-xl md:rounded-r-2xl md:rounded-tl-2xl'} ${isYou ? 'bg-accent-tint-0' : 'bg-accent-shade-900'} px-2 py-1 md:px-4 md:py-3 text-base`}>
        <p
          className={`font-semibold text-sm  lg:text-base ${isYou ? 'text-accent-shade-1000' : 'text-accent-tint-0'}`}>
          {user}
        </p>

        <div
          className={`max-h-auto md:pr-4 text-base leading-snug ${isYou ? 'text-accent-shade-1000' : 'text-slate-200'}`}>
          {message}
        </div>
        <p className="mt-[1px] text-right text-accent-shade-400 text-xs md:text-sm lg:text-base">
          {GetformatTime(date)}
        </p>
      </div>
      {isYou && (
        <div className="self-end hidden md:block">
          <Avatar
            sx={{
              height: {xs: '35px', md: '45px'},
              width: {xs: '35px', md: '45px'}
            }}
            src={yourProfileImage}
          />
        </div>
      )}
    </div>
  );
}
