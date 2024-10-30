"use client";
import { BackspaceRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import bcrypt from "bcryptjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function LockPage() {
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
  const styles = "px-5 py-6 text-2xl ";
  const inputStyle =
    "h-12 w-12 rounded-lg caret-transparent focus:outline-accent-shade-500 text-center border-2 border-slate-200 p-3 text-2xl active:border-accent-shade-300";
  const inputRef = useMemo(
    () => [input1, input2, input3, input4],
    [input1, input2, input3, input4],
  );
  const handleClick = useCallback(
    (e) => {
      if (e === "Backspace" && pin.length > 0) {
        inputRef[pin.length - 1].current.focus();
        inputRef[pin.length - 1].current.value = "";
        setPin((prev) => prev.slice(0, -1));
      } else if (isFinite(e) && pin.length < 4) {
        inputRef[pin.length].current.focus();
        inputRef[pin.length].current.value = e;
        setPin((prev) => {
          const newPin = prev + e;
          if (newPin.length === 4) {
            setTimeout(async () => {
              if (isConfirm) {
                const isMatch = bcrypt.compareSync(newPin, hashPin);
                if (isMatch) {
                  await fetch(`/api/user`, {
                    method: "PATCH",
                    body: JSON.stringify({ pin: hashPin,id }),
                  });
                }
              }
              if (setup) {
                const hashedPin = bcrypt.hashSync(newPin, 7);
                router.push(`/lock?id=${id}&pin=${hashedPin}&isconfirm=true`);
              }
              setPin("");
              inputRef.forEach((input) => {
                input.current.value = "";
              });
              inputRef[3].current.blur();
            }, 100);
          }
          return newPin;
        });
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

  return (
    <div className="flex h-svh flex-col justify-between px-3">
      <section className="flex flex-col gap-10">
        <nav className="flex justify-between py-2">
          <Avatar />
          <Avatar />
        </nav>
        <section className="flex flex-col items-center justify-center">
          <p className="text-2xl">
            Hi, <span>Priyanka</span>
          </p>
          <span className="text-sm">Enter Cupid PIN</span>
        </section>
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
            onClick={() => handleClick(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button className={styles} onClick={() => {}}>
          .
        </button>
        <button className={styles} onClick={() => handleClick(0)}>
          0
        </button>
        <button className={styles} onClick={() => handleClick("Backspace")}>
          <BackspaceRounded
            sx={{ fill: "#4d6342", height: "25px", width: "25px" }}
          />
        </button>
      </section>
    </div>
  );
}

export default LockPage;
