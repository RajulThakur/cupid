"use client";
import {
  CloseRounded,
  LockOpenOutlined,
  LockOutlined,
  SearchRounded,
  LogoutOutlined,
  MoreVert,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import useDebounce from "../_hooks/Debouncing";
import InboxNavHeader from "./InboxNavHeader";
import RequestUser from "./RequestUser";
import StyledAvatar from "./StyledAvatar";
import { useSession, signOut } from "next-auth/react";
import AdditonalInfo from "./AdditonalInfo";
import { BASE_URL } from "../_helper/Config";

function InboxNav() {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isLocked, setIsLocked] = useState(false);
  const inputRef = useRef(null);
  const debouncedSearch = useDebounce(inputValue, 500);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const searchContainerRef = useRef(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Updated mock user list with avatar URLs

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowOverlay(true);
  };
  useEffect(() => {
    async function fetchUsers() {
      if (!debouncedSearch) return;
      const response = await fetch(`${BASE_URL}/search_username`, {
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
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowOverlay(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocus = () => {
    setShowOverlay(true);
    setShowMobileMenu(false);
  };

  useEffect(() => {
    if (session.status === "authenticated") {
      setUserData(session.data.user);
      setIsLoading(false);
    }
  }, [session]);

  return (
    <div className="flex flex-col gap-2">
      <nav className="flex items-center gap-2 py-2">
        {!showOverlay && !inputValue && (
          <div className="flex flex-row items-center gap-2">
            <StyledAvatar alt={userData?.name} src={userData?.image} />
            <div className="flex flex-col justify-center">
              {userData?.name.split(" ").map((name) => {
                return (
                  <div
                    key={name}
                    className={`hidden text-sm font-semibold md:block ${isLoading && "block h-4 w-32 animate-pulse rounded bg-accent-tint-200"}`}
                  >
                    {name}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div
          ref={searchContainerRef}
          className={`relative mx-auto flex-grow transition-all duration-200 ease-in-out ${
            showOverlay || inputValue ? "w-full" : "max-w-screen-md"
          }`}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
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
            <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-80 origin-top transform animate-slideDown overflow-y-auto rounded-b-lg bg-white shadow-lg transition-all duration-500 ease-out">
              {filteredUsers.length > 0 ? (
                <ul className="py-2">
                  {filteredUsers.map((user) => (
                    <RequestUser key={user.id} user={user} />
                  ))}
                </ul>
              ) : (
                <p className="px-4 py-2 text-gray-500">No users found</p>
              )}
            </div>
          )}
        </div>
        {!showOverlay && !inputValue && (
          <>
            {/* Desktop menu */}
            <div className="hidden md:flex">
              <button className="group relative rounded-full p-2 text-base font-light transition-all duration-200 ease-in-out hover:bg-accent-tint-400">
                {isLocked ? <LockOutlined /> : <LockOpenOutlined />}
                <AdditonalInfo>Lock</AdditonalInfo>
              </button>
              <button
                onClick={() =>
                  signOut({
                    callbackUrl: "/login",
                    redirect: true,
                  })
                }
                className="group relative rounded-full p-2 text-base font-light transition-all duration-200 ease-in-out hover:bg-accent-tint-400"
              >
                <LogoutOutlined />
                <AdditonalInfo>Sign out</AdditonalInfo>
              </button>
            </div>

            {/* Mobile menu */}
            <div className="relative md:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="rounded-full p-2 text-base font-light transition-all duration-200 ease-in-out hover:bg-accent-tint-400"
              >
                <MoreVert />
              </button>

              {/* Mobile menu overlay */}
              {showMobileMenu && (
                <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg bg-white shadow-lg">
                  <div className="flex flex-col py-2">
                    <button
                      className="flex items-center gap-2 px-4 py-2 hover:bg-accent-tint-400"
                      onClick={() => setIsLocked(!isLocked)}
                    >
                      {isLocked ? <LockOutlined /> : <LockOpenOutlined />}
                      <span>Lock</span>
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 hover:bg-accent-tint-400"
                      onClick={() =>
                        signOut({
                          callbackUrl: "/login",
                          redirect: true,
                        })
                      }
                    >
                      <LogoutOutlined />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
      <InboxNavHeader />
    </div>
  );
}

export default InboxNav;
