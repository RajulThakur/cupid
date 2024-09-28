import handleSignUp from "@/actions/handleSignUp";
import { Checkbox } from "@mui/material";
import { redirect } from "next/navigation";
import InputField from "../_components/InputField";
import PasswordField from "../_components/PasswordField";
import SignUpNav from "../_components/SignUpNav";

async function handleClick(formdata) {
  "use server";
  const data=await handleSignUp(formdata);
  redirect(`/info?id=${data}`);
}

function SignupPage() {
  return (
    <div className="flex h-svh flex-col items-center justify-center px-3 py-3">
      <SignUpNav heading="Signup" />
      <form
        className="flex flex-col items-center gap-5 px-7"
        action={handleClick}
      >
        <h1 className="text-accent-shade-900 text-7xl font-semibold tracking-wide">
          Cupid
        </h1>
        <span className="font-semibold text-accent-shade-700">
          Continue with the Email
        </span>
        <input
          type="text"
          hidden
          aria-hidden
          defaultValue="signup"
          name="formType"
        />
        <InputField label="Email" />
        <PasswordField name="password" />
        <div className="self-start">
          <Checkbox aria-label="Checkbox" name="checkbox" />
          <span>
            I agree to <a>terms & conditions</a>
          </span>
        </div>

        <button className="w-full rounded-xl bg-accent-tint-700 py-3 text-xl font-semibold tracking-wider text-accent-shade-700">
          Next
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
