"use client";
import { useRef } from "react";
import { CreateRounded } from "@mui/icons-material";

function ImageUploadButton() {
  const fileInputRef = useRef(null);

  function handleClick(e) {
    // Access the selected files from the input
    console.log(e.target.files);
  }

  function handleButtonClick() {
    // Trigger a click on the hidden file input
    fileInputRef.current.click();
  }

  return (
    <button
      className="bg-accent-tint-500 p-2 rounded-2xl absolute right-0 bottom-0 opacity-95"
      onClick={handleButtonClick}
    >
      <CreateRounded sx={{ fill: "#adde95" }} />
      <input
        ref={fileInputRef}
        className="absolute h-0 w-0 overflow-hidden"
        type="file"
        onChange={handleClick}
        multiple
        accept="images/*"
      />
    </button>
  );
}

export default ImageUploadButton;