"use client";
import { CreateRounded } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import { useRef, useState } from "react";
import { useEdgeStore } from "../_lib/edgestore";
import { uploadToDB } from "../_lib/uploadToDB";

function ProfileEdit({ id, disabled }) {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const { edgestore } = useEdgeStore();
  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  async function handleUpload() {
    // Access the selected files from the input
    fileInputRef.current.click();
  }

  async function handleClick(e) {
    setFile(e.target.files?.[0]);
    setIsUploading(true);
    setFile(async (currentFile) => {
      const res = await edgestore.publicFiles.upload({
        file: currentFile,
        onProgressChange: (progress) => {
          setUploadProgress(progress);
        },
      });
      setUrl(res.url);
      await uploadToDB(res.url, id);
      setIsUploading(false);
      return currentFile;
    });
  }
  return (
    <div>
      <div className="relative h-32 w-32">
        {url ? (
          <Avatar sx={{ width: "8rem", height: "8rem" }} src={url} />
        ) : (
          <Avatar sx={{ width: "8rem", height: "8rem" }} />
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm opacity-90  rounded-full bg-accent-tint-500">
            <CircularProgress
              variant="determinate"
              value={uploadProgress}
              sx={{ color: "#3a4a32" }}
            />
            <div className="absolute text-xs">
              {Math.round(uploadProgress)}%
            </div>
          </div>
        )}
        <span
          className="absolute bottom-0 right-0 rounded-2xl bg-accent-tint-500 p-2 opacity-90 "
          onClick={handleUpload}
        >
          <CreateRounded sx={{ fill: "#3a4a32" }} />
          <input
            ref={fileInputRef}
            className="absolute hidden h-0 w-0 overflow-hidden"
            type="file"
            onChange={handleClick}
            accept="images/*"
          />
        </span>
      </div>
    </div>
  );
}

export default ProfileEdit;
