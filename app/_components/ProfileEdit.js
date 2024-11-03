"use client";
import { CreateRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useRef, useState } from "react";
import { useEdgeStore } from "../_lib/edgestore";
import { uploadToDB } from "../_lib/uploadToDB";

function ProfileEdit({id}) {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const { edgestore } = useEdgeStore();
  const fileInputRef = useRef(null);

  async function handleUpload() {
    // Access the selected files from the input
    fileInputRef.current.click();
  }

  async function handleClick(e) {
    setFile(e.target.files?.[0]);
    setFile(async (currentFile) => {
      const res = await edgestore.publicFiles.upload({
        file: currentFile,
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });
      setUrl(res.url);
      await uploadToDB(res.url, id);
      return currentFile;
    });
  }
  return (
    <div>
      <div className="relative h-32 w-32">
        <Avatar sx={{ width: "8rem", height: "8rem" }} src={url} />
        <span
          className="absolute bottom-0 right-0 rounded-2xl bg-accent-tint-500 p-2 opacity-95"
          onClick={handleUpload}
        >
          <CreateRounded sx={{ fill: "#adde95" }} />
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
