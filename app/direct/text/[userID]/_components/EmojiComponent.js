import {Avatar} from '@mui/material';

export default function EmojiComponent({message, yourProfileImage, friendProfileImage, isYou}) {
  // Determine the text size based on the length of the message
  let textSize;
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
  const isSoloHeart =
    message === '❤️' ||
    message === '💗' ||
    message === '💖' ||
    message === '💕' ||
    message === '💞' ||
    message === '💓' ||
    message === '💛';

  return (
    <div
      className={`max-h-auto ${textSize} ${isYou ? 'text-accent-shade-1000' : 'text-slate-200'} ${isSoloHeart ? 'animate-beat text-6xl' : ''}`}>
      {message}
    </div>
  );
}
