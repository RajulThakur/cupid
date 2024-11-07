"use client";
import { Badge } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#9ac685",
    color: "#9ac685",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}));
function StyledAvatar({ alt, src, style, isOnline = false }) {
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant={isOnline ? "dot" : "standard"}
    >
      <Avatar alt={alt} src={src} sx={style} />
    </StyledBadge>
  );
}

export default StyledAvatar;
