'use client';
import {storage} from '@/app/_firebase/firebase';
import PhotoIcon from '@/app/_icons/Photo';
import {push} from 'firebase/database';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {useRef} from 'react';
import {useSetRecoilState} from 'recoil';
import {circularProgress, MessageState} from '../_atom/Atoms';
import {useUserIDContext} from '../_context/UserIDContext';

export default function FileUpload() {
  const inputFile = useRef(null);
  const setMessages = useSetRecoilState(MessageState);
  const setCircleProgress = useSetRecoilState(circularProgress);
  const {messagesRef, userID, chatID} = useUserIDContext();

  async function handleUpload(e) {
    if (!e.target?.files?.[0]) return;
    for (const file of e.target.files) {
      const fileType = file.type.split('/')[0];
      const fileName = file.name;
      const uniqueFileName = `/${fileType}/${chatID}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, uniqueFileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const messageID = Date.now();

      // Track upload state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: messageID,
          message: {
            fileType,
            fileName,
            cancelUpload: () => uploadTask.cancel(),
          },
          isYou: true,
          from: userID,
          createdAt: new Date(),
          msgType: 'upload',
        },
      ]);

      try {
        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setCircleProgress(progress);
            },
            (error) => reject(error),
            () => resolve()
          );
        });

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Update with successful upload
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === messageID ? {...msg, message: downloadURL, msgType: fileType} : msg
          )
        );

        await push(messagesRef, {
          from: userID,
          msgType: fileType,
          value: downloadURL,
          createdAt: new Date().toISOString(),
        });
      } catch (error) {
        console.error(`Upload canceled or failed for ${file.name}:`, error);

        // Remove the canceled upload
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageID));
      }
    }
  }

  return (
    <>
      <input
        type="file"
        ref={inputFile}
        onChange={handleUpload}
        accept="image/*,video/*,audio/*"
        className="hidden"
        multiple
      />
      <button
        onClick={() => inputFile.current.click()}
        className="rounded p-2 hover:bg-gray-300">
        <PhotoIcon size='md' />
      </button>
    </>
  );
}
