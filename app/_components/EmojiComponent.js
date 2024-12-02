import { Avatar } from '@mui/material';

export default function EmojiComponent({
  message,
  yourProfileImage,
  friendProfileImage,
  isYou,
  user,
  date,
}) {
  // Determine the text size based on the length of the message
  let textSize ;
  switch (message.length) {
    case 1:
      textSize = 'text-5xl';
      break;
    case 2:
      textSize = 'text-5xl';
      break;
    case 3:
      textSize = 'text-5xl';
      break;
    case 4:
      textSize = 'text-4xl';
      break;
    default:
      textSize = 'text-xl';
      break;
  }

  // Check if the message is a solo heart emoji
  const isSoloHeart = message === '❤️' || message === '💗' || message === '💖' || message === '💕' || message === '💞' || message === '💓' || message === '💛';

  return (
    <div className={`flex snap-start select-none gap-1 md:gap-3 ${isYou ? 'justify-end' : 'justify-start'}`}>
      {!isYou && (
        <div className="self-end">
          <Avatar
            sx={{
              height: {xs: '35px', md: '45px'},
              width: {xs: '35px', md: '45px'},
            }}
            src={friendProfileImage}
          />
        </div>
      )}
      <div className={`w-auto max-w-xs`}>
        <div
          className={`max-h-auto ${textSize} ${isYou ? 'text-accent-shade-1000' : 'text-slate-200'} ${isSoloHeart ? 'animate-beat text-6xl' : ''}`}>
          {message}
        </div>
      </div>
      {isYou && (
        <div className="hidden self-end md:block">
          <Avatar
            sx={{
              height: {xs: '35px', md: '45px'},
              width: {xs: '35px', md: '45px'},
            }}
            src={yourProfileImage}
          />
        </div>
      )}
    </div>
  );
}



