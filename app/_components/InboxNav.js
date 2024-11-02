"use client";
import { CloseRounded, LockOpenOutlined, LockOutlined, SearchRounded } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../_hooks/Debouncing";
import InboxNavHeader from "./InboxNavHeader";
import RequestUser from "./RequestUser";
import StyledAvatar from "./StyledAvatar";
import { useSession } from "next-auth/react";

function InboxNav() {
  const session = useSession();
  const email = session?.data?.user?.email;

  console.log('email',email);
  const [inputValue, setInputValue] = useState("");
  const [name, setName] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const inputRef = useRef(null);
  const debouncedSearch = useDebounce(inputValue, 500);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const searchContainerRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);

  // Updated mock user list with avatar URLs

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowOverlay(true);
  };
  useEffect(() => {
    async function fetchUsers() {
      if (!debouncedSearch) return;
      const response = await fetch("/api/search_username", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: debouncedSearch }),
      });
      const { users } = await response.json();
      setFilteredUsers(users);
    }
    fetchUsers();
  }, [debouncedSearch]);

  const clearInput = () => {
    setInputValue("");
    setShowOverlay(false);
    inputRef.current.focus();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowOverlay(false);
        
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    setShowOverlay(true);
  };

  const handleBlur = () => {
    
  };

  return (
    <div className="flex flex-col gap-2">
      <nav className="flex items-center gap-2 py-2">
        {!showOverlay && !inputValue && <div className="flex items-center gap-2 flex-row">
            <StyledAvatar alt="Rajul" />
            <p className="text-sm font-semibold hidden md:block">{name}</p>
          </div>}
        <div
          ref={searchContainerRef}
          className={`relative mx-auto flex-grow transition-all duration-200 ease-in-out ${
            showOverlay || inputValue ? 'w-full' : 'max-w-screen-md'
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Search"
            className={`w-full rounded-lg border border-gray-300 py-2 ${!showOverlay && !inputValue ? "px-10" : "px-3"} placeholder:font-extralight placeholder:tracking-wide focus:outline-none`}
          />
          {!showOverlay && !inputValue && (
            <SearchRounded
              sx={{ fill: "black", fontSize: "1.5rem" }}
              className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-400"
            />
          )}

          {(showOverlay || inputValue) && (
            <button
              onClick={clearInput}
              className="absolute right-2 top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-gray-200 p-1"
            >
              <CloseRounded
                className="text-gray-500"
                style={{ fontSize: "0.85rem" }}
              />
            </button>
          )}

          {/* Overlay search results */}
          {showOverlay && inputValue && (
            <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-80 overflow-y-auto rounded-b-lg bg-white shadow-lg">
              {filteredUsers.length > 0 ? (
                <ul className="py-2">
                  {filteredUsers.map((user) => (
                    <RequestUser key={user._id} user={user} />
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-2 text-gray-500">No users found</p>
              )}
            </div>
          )}
        </div>
        {!showOverlay && !inputValue && (
          <button className="text-base font-semibold hover:bg-accent-tint-400 rounded-full p-2 transition-all duration-200 ease-in-out"> {isLocked ? <LockOutlined /> : <LockOpenOutlined />}</button>
        )}
      </nav>
      <InboxNavHeader />
    </div>
  );
}

export default InboxNav;
