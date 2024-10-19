"use client";
import {
  MicNoneOutlined,
  MicNoneRounded,
  PhotoOutlined,
  SendRounded,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MessageComponent from "./Message";

function Direct({ userid, to, name }) {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [socket, setSocket] = useState(null);
  const bottomAuto = useRef(null);
  console.log(name);
  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    const newSocket = isBrowser ? new WebSocket("ws://localhost:8080") : null;

    newSocket.onopen = () => {
      newSocket.send(JSON.stringify({ type: "connection", user: userid, to }));
      console.log("Connected to the server");
    };
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userid, to]);

  useEffect(() => {
    if (socket) {
      console.log(socket);
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { message, from } = data;
        setMessages([...messages, { message, isYou: false, user: from }]);
      };
    }
  }, [messages, socket]);

  useEffect(() => {
    bottomAuto.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = () => {
    if (value.trim()) {
      // Prevent empty messages from being submitted
      setMessages([...messages, { message: value, isYou: true }]);
      socket.send(
        JSON.stringify({
          type: "message",
          message: value,
          user: userid,
          to,
        }),
      );
      setValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Shift+Enter for a new line, Enter to submit
      handleSubmit();
    }
  };

  return (
    <div className="flex h-svh flex-col px-4 py-4">
      <nav className="flex justify-between">
        <Avatar />
      </nav>

      <div className="flex flex-1 flex-col gap-2 overflow-y-scroll">
        {messages.map((message, index) => (
          <MessageComponent
            key={index}
            text={message.message}
            user={message.isYou ? "You" : name}
            isYou={message.isYou}
          />
        ))}
        <div ref={bottomAuto} />
      </div>

      <div className=" flex items-center justify-between gap-4 rounded-full shadow-sm bg-white px-4 py-2">
        <textarea
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={value}
          className="h-10 flex-1 resize-none px-8 py-2 focus:outline-none"
          placeholder="Type your message..."
          rows="2"
          maxLength="1000"
        />
        {!value && (
          <div className="flex items-center gap-2">
            <MicNoneOutlined className="stroke-1" sx={{ fontSize: "2rem","&path":{strokeWidth:"0.5px"} }} />
            <PhotoOutlined sx={{ fontSize: "2rem","&path":{strokeWidth:"0.5px"} }} />
          </div>
        )}
        {value && (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-lg bg-accent-shade-900 px-4 py-2 text-background"
          >
            <span>Send </span>
            <SendRounded />
          </button>
        )}
      </div>
    </div>
  );
}

export default Direct;
