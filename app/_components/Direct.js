'use client';
import {MicNoneOutlined, PhotoOutlined, SendRounded} from '@mui/icons-material';
import {
  get,
  limitToLast,
  off,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  set,
} from 'firebase/database';
import {useEffect, useRef, useState} from 'react';
import {database} from '../_firebase/firebase';
import MessageComponent from './Message';
import isOnlyEmojis from '../_helper/isOnlyEmoji';

function Direct({data}) {
  const {userid, myusername, friendusername, name, to} = data;
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState('');
  const bottomAuto = useRef(null);
  const inputFile = useRef(null);
  const [yourProfileImage, setYourProfileImage] = useState(null);
  const [friendProfileImage, setFriendProfileImage] = useState(null);

  let userA = userid,
    userB = to;

  if (userid < to) {
    [userA, userB] = [userB, userA];
  }
  const messagesRef = ref(database, `${userA}_${userB}`);
  useEffect(() => {
    const messagesQuery = query(
      ref(database, `${userA}_${userB}`),
      orderByChild('createdAt'),
      limitToLast(20)
    );
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
  }, [userA, userB, userid]);

  useEffect(() => {
    if (messages.length > 0) {
      bottomAuto.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [messages]);

  useEffect(() => {
    const msgQuery = query(
      ref(database, `${userA}_${userB}`),
      orderByChild('createdAt'),
      limitToLast(1)
    );
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
  }, [userA, userB, userid]);
  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.visualViewport?.height || window.innerHeight;
      setViewportHeight(newHeight);
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize); // Fallback for unsupported browsers

    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  async function handleSubmit() {
    const isOnlyEmoji = isOnlyEmojis(value);
    console.log(isOnlyEmoji);
    if (value.trim()) {
      setMessages([
        ...messages,
        {
          message: value,
          isYou: true,
          from: userid,
          createdAt: new Date(),
          msgType: isOnlyEmoji ? 'emoji' : 'text',
        },
      ]);
      setValue('');
      push(messagesRef, {
        from: userid,
        msgType: isOnlyEmoji ? 'emoji' : 'text',
        value: value,
        createdAt: new Date().toISOString(),
      });
    }
  }
  const handleChange = (e) => {
    const {value} = e.target;
    const length = value.length;
    if (value[length - 1] === '\n') {
      handleSubmit();
    } else {
      setValue(value);
    }
  };

  return (
    <div className="px-1 py-2">
      <div className="scrollbar-hide max-h-[calc(100dvh-56px)] flex flex-1 snap-y flex-col gap-2 overflow-y-scroll scroll-smooth md:pr-6">
        {messages.map((message, index) => (
          <MessageComponent
            key={message._id || index}
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

      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between gap-4 rounded-full bg-white px-4 py-2 shadow-sm">
        <textarea
          onChange={handleChange}
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
              sx={{
                fontSize: '2rem',
                '&path': {strokeWidth: '0.5px'},
                '&:hover': {color: 'rgb(154, 198, 133)'},
              }}
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
              }}>
              <PhotoOutlined
                sx={{
                  fontSize: '2rem',
                  '&path': {strokeWidth: '0.5px'},
                  '&:hover': {color: 'rgb(154, 198, 133)'},
                }}
              />
            </button>
          </div>
        )}
        {value && (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-lg bg-accent-shade-900 px-4 py-2 text-background">
            <span>Send </span>
            <SendRounded />
          </button>
        )}
      </div>
    </div>
  );
}
export default Direct;
