import handleSignIn from "@/actions/handleSignIn";
import Link from "next/link";
import InputField from "../_components/InputField";
import PasswordField from "../_components/PasswordField";
import SignUpNav from "../_components/SignUpNav";
import LogoBold from "../_components/LogoBold";

function SigninPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-3 py-3">
      <SignUpNav heading="Login" />
      <form
        className="flex flex-col items-center gap-5 px-7"
        action={handleSignIn}
      >
        <h1 className="text-7xl font-semibold tracking-wide">
          <LogoBold />
        </h1>
        <span className="select-none font-semibold text-accent-shade-700">
          Login with the Email
        </span>
        <InputField label="Email" name="email" />
        <PasswordField name="password" />
        <Link
          className="text-base transition-all hover:text-accent-shade-600 hover:underline"
          href="/signup"
        >
          New Account
        </Link>
        <button className="w-full rounded-xl bg-accent-tint-700 py-3 text-xl font-semibold tracking-wider text-accent-shade-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default SigninPage;
