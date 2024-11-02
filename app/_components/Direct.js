"use client";
import {
  MicNoneOutlined,
  PhotoOutlined,
  SendRounded,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MessageComponent from "./Message";
import { useEdgeStore } from "../_lib/edgestore";

function Direct({ data }) {
  const { userid, myusername, friendusername, name, to } = data;
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [socket, setSocket] = useState(null);
  const bottomAuto = useRef(null);
  const [file, setFile] = useState(null);
  const { edgeStore } = useEdgeStore();
  const inputFile = useRef(null);
  // Connect to the server
  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    const newSocket = isBrowser ? new WebSocket("ws://localhost:8080") : null;
    async function getMessages() {
      const res = await fetch(
        `/api/messages?usernameA=${myusername}&usernameB=${friendusername}&user1=${userid}&user2=${to}`,
      );
      const data = await res.json();
      setMessages(data?.messages || []);
    }
    getMessages();
    newSocket.onopen = () => {
      newSocket.send(
        JSON.stringify({
          type: "connection",
          user: userid,
          to,
          createdAt: new Date(),
        }),
      );
    };
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [userid, to, myusername, friendusername]);

  // Receive messages from the server
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const { message, from, msgType, createdAt } = data;
        // Add the message to the messages array
        setMessages([
          ...messages,
          { message, isYou: false, user: from, createdAt, msgType },
        ]);
      };
    }
  }, [messages, socket]);

  // Scroll to the bottom of the messages
  useEffect(() => {
    bottomAuto.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileClick = (e) => {
    console.log(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (value.trim()) {
      // Prevent empty messages from being submitted
      setMessages([
        ...messages,
        { message: value, isYou: true, from: userid, createdAt: new Date(),msgType: "text" },
      ]);
      // Send the message to the server
      setValue("");
      await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          usernameA: myusername,
          usernameB: friendusername,
          user1: userid,
          user2: to,
          from: userid,
          message: value,
          msgType: "text",
        }),
      });
      socket.send(
        JSON.stringify({
          type: "message",
          msgType: "text",
          message: value,
          user: userid,
          to,
          createdAt: new Date(),
        }),
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Prevent default Enter behavior
      e.preventDefault();
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
            key={message._id || index}
            msgType={message.msgType}
            message={message.message}
            user={message.from === userid ? "You" : name}
            isYou={message.from === userid}
            date={message.createdAt}
          />
        ))}
        <div ref={bottomAuto} />
      </div>

      <div className="flex items-center justify-between gap-4 rounded-full bg-white px-4 py-2 shadow-sm">
        <textarea
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={value}
          className="h-auto flex-1 resize-none overflow-y-auto px-8 py-2 focus:outline-none"
          placeholder="Type your message..."
          rows="1"
          maxLength="1000"
        />
        {!value && (
          <div className="flex items-center gap-2">
            <MicNoneOutlined
              className="stroke-1"
              sx={{ fontSize: "2rem", "&path": { strokeWidth: "0.5px" } }}
            />
            <input
              type="file"
              ref={inputFile}
              accept="image/*,video/*,audio/*"
              onClick={handleFileClick}
              className="hidden"
            />
            <button
              className="rounded-full hover:bg-accent-shade-100"
              onClick={(e) => {
                inputFile.current.click();
              }}
            >
              <PhotoOutlined
                sx={{ fontSize: "2rem", "&path": { strokeWidth: "0.5px" } }}
              />
            </button>
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
