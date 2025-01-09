'use client';
import {database} from '@/app/_firebase/firebase';
import {ref} from 'firebase/database';
import {RecoilRoot} from 'recoil';
import Chat from './Chat';
import InputBar from './Input';
import {UserIdProvider} from '../_context/UserIDContext';

function Direct({data}) {
  const {userid, name, messageID} = data;
  const messagesRef = ref(database, messageID);

  return (
    <div className="px-1 py-2">
      <RecoilRoot>
        <UserIdProvider
          id={userid}
          messagesRef={messagesRef}
          chatID={messageID}>
          <Chat
            name={name}
            userid={userid}
          />
          <InputBar />
        </UserIdProvider>
      </RecoilRoot>
    </div>
  );
}
export default Direct;
