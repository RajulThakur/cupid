import handleSignUp from "@/actions/handleSignUp";
import { Checkbox } from "@mui/material";
import { redirect } from "next/navigation";
import InputField from "../_components/InputField";
import PasswordField from "../_components/PasswordField";
import SignUpNav from "../_components/SignUpNav";
import LogoBold from "../_components/LogoBold";
import Username from "../_components/Username";

async function handleClick(formdata) {
  "use server";
  const data = await handleSignUp(formdata);
  console.log(data);
  redirect(`/info?id=${data}`);
}

function SignupPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-3 py-3">
      <SignUpNav heading="Signup" />
      <form
        className="flex flex-col items-center gap-8 px-7"
        action={handleClick}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-7xl font-semibold tracking-wide text-accent-shade-900">
            <LogoBold />
          </h1>
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

        <button className="w-full rounded-xl bg-accent-tint-700 py-3 text-xl font-semibold tracking-wider text-accent-shade-700">
          Next
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
