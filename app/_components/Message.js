import AudioComponent from './AudioComponent';
import EmojiComponent from './EmojiComponent';
import ImageComponent from './ImageComponent';
import TextComponent from './TextComponent';
function MessageComponent({
  message,
  isYou = true,
  user = 'You',
  date,
  msgType,
  yourProfileImage,
  friendProfileImage,
}) {
  switch (msgType) {
    case 'image':
      return (
      <ImageComponent
        message={message}
        yourProfileImage={yourProfileImage}
        friendProfileImage={friendProfileImage}
      />
      );
    case 'text':
      return (
        <TextComponent
        message={message}
        isYou={isYou}
        user={user}
        date={date}
        yourProfileImage={yourProfileImage}
        friendProfileImage={friendProfileImage}
      />
    );
    case 'audio':
      return (
        <AudioComponent
          message={message}
        yourProfileImage={yourProfileImage}
        friendProfileImage={friendProfileImage}
      />
      );
    case 'emoji':
      return (
        <EmojiComponent
          message={message}
          yourProfileImage={yourProfileImage}
          friendProfileImage={friendProfileImage}
          isYou={isYou}
          user={user}
          date={date}
        />
      );
  }
}
export default MessageComponent;
