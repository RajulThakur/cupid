"use client";
import { SearchRounded } from "@mui/icons-material";
import { TextField } from "@mui/material";
import InboxNavHeader from "./InboxNavHeader";
import StyledAvatar from "./StyledAvatar";



function InboxNav() {
  return (
    <div className="flex gap-2 flex-col">
      <nav className="flex items-center justify-between py-2">
        <StyledAvatar alt="Rajul"/>
        <TextField sx={{display:"none"}} variant="standard" />
        <button>
          <SearchRounded />
        </button>
      </nav>
      <InboxNavHeader />
    </div>
  );
}

export default InboxNav;
