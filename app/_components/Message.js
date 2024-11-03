import AudioComponent from "./AudioComponent";
import ImageComponent from "./ImageComponent";
import TextComponent from "./TextComponent";
function MessageComponent({
  message,
  isYou = true,
  user = "You",
  date,
  msgType,
  yourProfileImage,
  friendProfileImage,
}) {
  if(msgType === "image"){
    return <ImageComponent message={message} yourProfileImage={yourProfileImage} friendProfileImage={friendProfileImage} />
  }
  else if(msgType === "text"){
    return <TextComponent message={message} isYou={isYou} user={user} date={date} yourProfileImage={yourProfileImage} friendProfileImage={friendProfileImage} />
  }
  else if(msgType === "audio"){
    return <AudioComponent message={message} yourProfileImage={yourProfileImage} friendProfileImage={friendProfileImage} />
  }
}
export default MessageComponent;