import { Avatar, Badge } from "@mui/material";

function InboxNav() {
  return (
    <div>
      <nav>
        <div>
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            className="relative z-10 h-16 w-16 rounded-full"
          >
            <span className="absolute bottom-0 right-0 z-20 h-4 w-4 rounded-full border-2 border-white bg-green-500">
              {/* Ripple animation */}
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            </span>
          </Avatar>
        </div>
      </nav>
      <header></header>
    </div>
  );
}

export default InboxNav;
