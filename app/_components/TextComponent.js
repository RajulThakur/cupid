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
    <div className={`flex gap-3 ${isYou ? 'justify-end' : 'justify-start'}`}>
      {!isYou && (
        <div className="self-end">
          <Avatar
            sx={{height: '45px', width: '45px'}}
            src={friendProfileImage}
          />
        </div>
      )}
      <div
        className={`w-auto max-w-xs ${isYou ? 'rounded-l-2xl rounded-tr-2xl' : 'rounded-r-2xl rounded-tl-2xl'} ${isYou ? 'bg-accent-tint-0' : 'bg-foreground'} px-4 py-3 text-base`}>
        <p className={`font-semibold ${isYou ? 'text-accent-shade-1000' : 'text-accent-tint-0'}`}>
          {user}
        </p>

        <div
          className={`max-h-auto pr-4 text-base leading-snug ${isYou ? 'text-accent-shade-1000' : 'text-background'}`}>
          {message}
        </div>
        <p className="mt-[1px] text-right text-accent-shade-400">{GetformatTime(date)}</p>
      </div>
      {isYou && (
        <div className="self-end">
          <Avatar
            sx={{height: '45px', width: '45px'}}
            src={yourProfileImage}
          />
        </div>
      )}
    </div>
  );
}
