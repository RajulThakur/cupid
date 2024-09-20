import { CreateRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import ImageUploadButton from "./ImageUploadButton";

function ProfileEdit() {

  return (
    <div>
      <div className='relative w-32 h-32'>
        <Avatar sx={{ width: "8rem", height: "8rem" }} />
        <ImageUploadButton/>
      </div>
    </div>
  );
}

export default ProfileEdit;
