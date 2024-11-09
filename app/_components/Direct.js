"use client";
import {
  MicNoneOutlined,
  PhotoOutlined,
  SendRounded
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../_helper/Config";
import MessageComponent from "./Message";

function Direct({ data }) {
  const { userid, myusername, friendusername, name, to } = data;
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [socket, setSocket] = useState(null);
  const bottomAuto = useRef(null);
  const [file, setFile] = useState(null);
  const inputFile = useRef(null);
  const [yourProfileImage, setYourProfileImage] = useState(null);
  const [friendProfileImage, setFriendProfileImage] = useState(null);

  useEffect(() => {
    const isBrowser = typeof window !== "undefined";
    const wsURL = `wss://cupid-5f6c3fabade7.herokuapp.com:46597/`;
    const newSocket = isBrowser ? new WebSocket(wsURL) : null;
    // Get the messages
    async function getMessages() {
      const res = await fetch(
        `${BASE_URL}/messages?usernameA=${myusername}&usernameB=${friendusername}&user1=${userid}&user2=${to}`,
      );
      const data = await res.json();
      setMessages(data?.messages || []);
    }
    // Get the profile images
    async function getImages(){
      const res = await fetch(`${BASE_URL}/getimage?id=${userid}`);
      const data = await res.json();
      setYourProfileImage(data.image);
      const res2 = await fetch(`${BASE_URL}/getimage?id=${to}`);
      const data2 = await res2.json();
      setFriendProfileImage(data2.image);
    }
    getMessages();
    getImages();
    // Connect to the server
    if (newSocket) {
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
    }
    newSocket.onclose = async () => {
      await fetch(`${BASE_URL}/updateStatus`, {
        method: "POST",
        body: JSON.stringify({ userId: userid, isOnline: false }),
      });
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



  const handleSubmit = async () => {
    if (value.trim()) {
      // Prevent empty messages from being submitted
      setMessages([
        ...messages,
        { message: value, isYou: true, from: userid, createdAt: new Date(),msgType: "text" },
      ]);
      // Send the message to the server
      setValue("");
      await fetch(`${BASE_URL}/messages`, {
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
      // Check socket state before sending
      if (socket && socket.readyState === WebSocket.OPEN) {
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
      } else {
        console.error("WebSocket is not open. Ready state: ", socket.readyState);
      }
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
      <div className="flex flex-1 flex-col gap-2 pr-6 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
        
        {messages.map((message, index) => (
          <MessageComponent
            key={message._id || index}
            msgType={message.msgType}
            yourProfileImage={yourProfileImage}
            friendProfileImage={friendProfileImage}
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
              sx={{ fontSize: "2rem", "&path": { strokeWidth: "0.5px" }, "&:hover": { color: "rgb(154, 198, 133)" } }}
            />
            <input
              type="file"
              ref={inputFile}
              accept="image/*,video/*,audio/*"
              className="hidden"
            />
            <button
              onClick={(e) => {
                inputFile.current.click();
              }}
            >
              <PhotoOutlined
                sx={{ fontSize: "2rem", "&path": { strokeWidth: "0.5px" }, "&:hover": { color: "rgb(154, 198, 133)" } }}
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
