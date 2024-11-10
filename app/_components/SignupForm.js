'use client'
import { Checkbox } from "@mui/material";
import InputField from "./InputField";
import LogoBold from "./LogoBold";
import PasswordField from "./PasswordField";
import Username from "./Username";
import { useState } from 'react';
import handleSignUp from "@/_actions/handleSignUp";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    try {
      const userid = await handleSignUp(formData);
      setIsLoading(false);
      router.push(`/info?id=${userid}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
        className="flex flex-col items-center gap-8 px-7"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col items-center">
          <LogoBold />
          <span className="select-none font-semibold text-accent-shade-700">
            Continue with the Email
          </span>
        </div>
        <div className="flex flex-col items-center gap-[2px]">
          <input
            type="text"
            hidden
            aria-hidden
            defaultValue="signup"
            name="formType"
          />
          <InputField label="Email" name="email" />
          <Username label="Username" name="username" />

          <PasswordField name="password" />
          <div className="self-start">
            <Checkbox aria-label="Checkbox" name="checkbox" />
            <span>
              I agree to <a>terms & conditions</a>
            </span>
          </div>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-accent-tint-700 py-3 text-xl font-semibold tracking-wider text-accent-shade-700"
          disabled={isLoading}
        >
          {isLoading ? <span className="spinner"></span> : 'Next'}
        </button>
  </form>
  );
}