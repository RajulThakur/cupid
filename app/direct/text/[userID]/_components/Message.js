import {Avatar} from '@mui/material';
import AudioComponent from './AudioComponent';
import EmojiComponent from './EmojiComponent';
import GifMessageComponent from './GifMessageComponent';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';
import UploadingComponent from './UploadingComponent';
import VideoComponent from './VideoComponent';
function MessageComponent({
  message,
  isYou = true,
  user = 'You',
  date,
  msgType,
  yourProfileImage,
  friendProfileImage,
}) {
  return (
    <div
      className={`flex select-none snap-start gap-1 md:gap-3 ${isYou ? 'justify-end' : 'justify-start'}`}>
      {!isYou && (
        <Avatar
          sx={{
            alignSelf: 'flex-end',
            height: {xs: '35px', md: '45px'},
            width: {xs: '35px', md: '45px'},
          }}
          src={friendProfileImage}
        />
      )}
      {/* Switching Depending on Message Type */}
      {msgType === 'image' && <ImageComponent message={message} />}
      {msgType === 'gif' && (
        <GifMessageComponent
          message={message}
          date={date}
        />
      )}
      {msgType === 'audio' && <AudioComponent message={message} />}
      {msgType === 'text' && (
        <TextComponent
          isYou={isYou}
          message={message}
          date={date}
        />
      )}
      {msgType === 'emoji' && (
        <EmojiComponent
          message={message}
          isYou={isYou}
        />
      )}
      {msgType === 'upload' && <UploadingComponent message={message} />}
      {msgType === 'video' && <VideoComponent message={message} />}

      {isYou && (
        <Avatar
          sx={{
            display: {xs: 'none', md: 'flex'},
            alignSelf: 'flex-end',
            height: {xs: '35px', md: '45px'},
            width: {xs: '35px', md: '45px'},
          }}
          src={yourProfileImage}
        />
      )}
    </div>
  );
}
export default MessageComponent;
