'use client';
import {get, limitToLast, off, onValue, orderByChild, query} from 'firebase/database';
import {useEffect, useRef, useState} from 'react';
import {useRecoilState} from 'recoil';
import {MessageState} from '../_atom/Atoms';
import MessageComponent from './Message';
import {useUserIDContext} from '../_context/UserIDContext';
export default function Chat({userid, name}) {
  const [yourProfileImage, setYourProfileImage] = useState(null);
  const [friendProfileImage, setFriendProfileImage] = useState(null);
  const [messages, setMessages] = useRecoilState(MessageState);
  const bottomAuto = useRef(null);
  const {messagesRef} = useUserIDContext();
  useEffect(() => {
    const msgQuery = query(messagesRef, orderByChild('createdAt'), limitToLast(1));
    onValue(msgQuery, (snapshot) => {
      const messagesData = snapshot.val();

      const lastMessage = messagesData[Object.keys(messagesData)[0]];

      setMessages((prev) => {
        if (lastMessage.from !== userid) {
          // if the last message is not from the user, add it to the messages
          return [
            ...prev,
            {
              isYou: false,
              message: lastMessage.value,
              msgType: lastMessage.msgType,
              createdAt: lastMessage.createdAt,
              _id: Object.keys(messagesData)[0],
            },
          ];
        }
        return prev;
      });
    });
    return () => {
      off(msgQuery);
    };
  }, [userid, messagesRef, setMessages]);

  useEffect(() => {
    const messagesQuery = query(messagesRef, orderByChild('createdAt'), limitToLast(20));
    async function fetchMessages() {
      const snapshot = await get(messagesQuery);
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesList = Object.entries(messagesData)
          .map(([key, value]) => ({
            ...value,
            _id: key,
            message: value.value,
            msgType: value.msgType,
            createdAt: value.createdAt,
            isYou: value.from === userid,
          }))
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setMessages(messagesList);
      }
    }
    fetchMessages();
    return () => {
      off(messagesQuery);
    };
  }, [userid, messagesRef, setMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      bottomAuto.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);
  return (
    <div className="flex max-h-[calc(100dvh-56px)] flex-1 snap-y flex-col gap-2 overflow-y-scroll scroll-smooth scrollbar-hide md:pr-2 lg:pr-5 xl:pr-6">
      {messages.map((message, index) => (
        <MessageComponent
          key={message._id || message.id}
          msgType={message.msgType}
          yourProfileImage={yourProfileImage}
          friendProfileImage={friendProfileImage}
          message={message.message}
          user={message.from === userid ? 'You' : name}
          isYou={message.from === userid}
          date={message.createdAt}
        />
      ))}
      <div ref={bottomAuto} />
    </div>
  );
}
