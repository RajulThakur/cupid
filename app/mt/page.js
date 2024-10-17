"use client";
import { Avatar } from "@mui/material";
import { useEffect, useState,useRef } from "react";
import MessageComponent from "../_components/Message";

function Direct() {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [socket,setSocket] = useState(null);
  const bottomAuto=useRef(null);
  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    const newSocket =isBrowser ? new WebSocket("ws://localhost:8080") : null;

    newSocket.onopen = () => {
      console.log("Connected to the server");
    };
    setSocket(newSocket);
    
    return () => {
      newSocket.close();
    };
  }, []);

useEffect(()=>{
  if(socket){
    socket.onmessage = (event) => {
      setMessages([...messages, { message: event.data, isYou: false ,user:"Chatbot"}]);
    };
  }
},[messages,socket])

useEffect(()=>{
  bottomAuto.current.scrollIntoView({behavior:"smooth"});
},[messages])

  const handleSubmit = () => {
    if (value.trim()) {  // Prevent empty messages from being submitted
      setMessages([...messages, { message: value, isYou: true }]);
      socket.send(value);
      setValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { // Shift+Enter for a new line, Enter to submit
      handleSubmit();
    }
  };

  return (
    <div className="flex h-svh flex-col py-4 px-4">
      <nav className="flex justify-between">
        <Avatar />
      </nav>

      <div className="flex flex-1 flex-col gap-2 overflow-y-scroll">
        {messages.map((message, index) => (
          <MessageComponent
            key={index}
            text={message.message}
            user={message.user}
            isYou={message.isYou}
          />
        ))}
        <div ref={bottomAuto}/>
      </div>

      <div className="flex gap-4 justify-between items-center">
        <textarea
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={value}
          className="h-10 rounded-lg flex-1 resize-none px-8 py-2 focus:outline-none"
          placeholder="Type your message..."
          rows="2"
          maxLength="1000"
        />
        <button
          onClick={handleSubmit}
          className="bg-accent-shade-900 text-background rounded-lg px-4 py-2"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Direct;