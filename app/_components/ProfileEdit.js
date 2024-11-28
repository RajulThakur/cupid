'use client';
import {storage} from '@/app/_firebase/firebase';
import {CreateRounded} from '@mui/icons-material';
import {Avatar, CircularProgress} from '@mui/material';
import {getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';

function ProfileEdit({id}) {
  const [url, setUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    async function postImage() {
      const response = await fetch(`/api/v1/image`, {
        method: 'POST',
        body: JSON.stringify({id, newImageURL: url}),
      });
      const data = await response.json();
    }
    postImage();
  }, [url, id]);

  async function handleClick() {
    fileInputRef.current?.click();
  }

  async function handleUpload(e) {
    if (!e.target.files?.[0]) return;

    setIsUploading(true);
    const storageRef = ref(storage, `profile_photos/${id}`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setIsUploading(false);
      },
      () => {
        setIsUploading(false);
        setUploadProgress(0);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  }
  return (
    <div>
      <div className="relative h-32 w-32">
        {url ? (
          <div className="h-32 w-32 overflow-hidden relative">
            <Image
              className="rounded-full object-cover"
              fill
              sizes="auto"
              alt="profile photo"
              src={url}
            />
          </div>
        ) : (
          <Avatar sx={{width: '8rem', height: '8rem'}} />
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-accent-tint-500 opacity-90 backdrop-blur-sm">
            <CircularProgress
              variant="determinate"
              value={uploadProgress}
              sx={{color: '#3a4a32'}}
            />
            <div className="absolute text-xs">{Math.round(uploadProgress)}%</div>
          </div>
        )}
        <span
          className="absolute bottom-0 right-0 rounded-2xl bg-accent-tint-500 p-2 opacity-90"
          onClick={handleClick}>
          <CreateRounded sx={{fill: '#3a4a32'}} />
          <input
            ref={fileInputRef}
            className="absolute hidden h-0 w-0 overflow-hidden"
            type="file"
            onChange={handleUpload}
            accept="images/*"
            multiple={false}
          />
        </span>
      </div>
    </div>
  );
}

export default ProfileEdit;
