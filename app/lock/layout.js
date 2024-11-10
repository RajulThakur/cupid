"use client";
import { BackspaceRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import bcrypt from "bcryptjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BASE_URL } from "../_helper/Config";

function LockLayout({ children }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const setup = searchParams.get("setup");
  const hashPin = searchParams.get("pin");
  const isConfirm = searchParams.get("isconfirm");
  const [pin, setPin] = useState("");
  const input1 = useRef(null);
  const input2 = useRef(null);
  const input3 = useRef(null);
  const input4 = useRef(null);
  const styles = "px-5 py-6 text-2xl relative overflow-hidden group z-10 rounded-full flex items-center justify-center";
  const inputStyle =
    "h-12 w-12 rounded-lg caret-transparent focus:outline-accent-shade-500 text-center border-2 border-slate-200 p-3 text-2xl active:border-accent-shade-300";
  const inputRef = useMemo(
    () => [input1, input2, input3, input4],
    [input1, input2, input3, input4],
  );
  const handleClick = useCallback(
    (e) => {
      if (e === "Backspace" && pin.length > 0) {
        const currentRef = inputRef[pin.length - 1].current;
        if (currentRef) {
          currentRef.focus();
          currentRef.value = "";
          setPin((prev) => prev.slice(0, -1));
        }
      } else if (isFinite(e) && pin.length < 4) {
        const currentRef = inputRef[pin.length].current;
        if (currentRef) {
          currentRef.focus();
          currentRef.value = e;
          setPin((prev) => {
            const newPin = prev + e;
            if (newPin.length === 4) {
              setTimeout(async () => {
                if (isConfirm) {
                  const isMatch = await bcrypt.compare(newPin, hashPin);
                  if (isMatch) {
                    await fetch(`${BASE_URL}/user`, {
                      method: "PATCH",
                      body: JSON.stringify({ pin: hashPin, id }),
                    });
                    router.push(`/`);
                  }
                }
                if (setup) {
                  const hashedPin = bcrypt.hashSync(newPin, 7);
                  router.push(`/lock?id=${id}&pin=${hashedPin}&isconfirm=true`);
                }
                setPin("");
                inputRef.forEach((input) => {
                  if (input.current) {
                    input.current.value = "";
                  }
                });
                if (inputRef[3].current) {
                  inputRef[3].current.blur();
                }
              }, 100);
            }
            return newPin;
          });
        }
      }
    },
    [pin, inputRef, setup, id, isConfirm, hashPin, router],
  );
  useEffect(() => {
    function handleKeyDown(e) {
      handleClick(e.key);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClick]);

  const handleRipple = useCallback((e) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");
    
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    
    const container = button.querySelector('.ripple-container');
    container.appendChild(circle);
  }, []);

  return (
    <div className="flex h-svh flex-col justify-between px-3">
      <section className="flex flex-col gap-10">
        <nav className="flex justify-between py-2">
          <Avatar />
        </nav>
        {children}
        <section className="flex justify-center gap-2">
          {Array.from({ length: 4 }, (_, i) => (
            <input
              maxLength="1"
              ref={inputRef[i]}
              className={inputStyle}
              type="password"
              key={i}
            />
          ))}
        </section>
      </section>
      <section className="grid grid-cols-3">
        {Array.from({ length: 9 }, (_, i) => (
          <button
            className={styles}
            key={`button${i + 1}`}
            onClick={(e) => {
              handleRipple(e);
              handleClick(i + 1);
            }}
          >
            <span className="ripple-container absolute inset-0 overflow-hidden -z-10" />
            {i + 1}
          </button>
        ))}
        <button 
          className={styles} 
          onClick={(e) => handleRipple(e)}
        >
          <span className="ripple-container absolute inset-0 overflow-hidden -z-10" />
          .
        </button>
        <button 
          className={styles} 
          onClick={(e) => {
            handleRipple(e);
            handleClick(0);
          }}
        >
          <span className="ripple-container absolute inset-0 overflow-hidden -z-10" />
          0
        </button>
        <button 
          className={styles} 
          onClick={(e) => {
            handleRipple(e);
            handleClick("Backspace");
          }}
        >
          <span className="ripple-container absolute inset-0 overflow-hidden -z-10" />
          <BackspaceRounded
            sx={{ fill: "#4d6342", height: "25px", width: "25px" }}
          />
        </button>
      </section>
    </div>
  );
}

export default LockLayout;
