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
      // animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  // "@keyframes ripple": {
  //   "0%": {
  //     transform: "scale(.8)",
  //     opacity: 1,
  //   },
  //   "100%": {
  //     transform: "scale(2.4)",
  //     opacity: 0,
  //   },
  // },
}));
function StyledAvatar({ alt, src, style }) {
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
    >
      <Avatar alt={alt} src={src} sx={style} />
    </StyledBadge>
  );
}

export default StyledAvatar;
