import AudioComponent from "./AudioComponent";
import ImageComponent from "./ImageComponent";
import TextComponent from "./TextComponent";
function MessageComponent({
  message,
  isYou = true,
  user = "You",
  date,
  msgType
}) {
  if(msgType === "image"){
    return <ImageComponent message={message} />
  }
  else if(msgType === "text"){
    return <TextComponent message={message} isYou={isYou} user={user} date={date} />
  }
  else if(msgType === "audio"){
    return <AudioComponent message={message} />
  }
}
export default MessageComponent;