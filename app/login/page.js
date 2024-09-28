import handleSignIn from "@/actions/handleSignIn";
import Link from "next/link";
import InputField from "../_components/InputField";
import PasswordField from "../_components/PasswordField";
import SignUpNav from "../_components/SignUpNav";

function SigninPage() {
  return (
    <div className="flex h-dvh relative flex-col justify-center px-3 py-3">
      <SignUpNav heading="Login" />
      <form className=" justify-center flex flex-col items-center gap-5 px-7" action={handleSignIn}>
        <h1 className="from-accent-tint-900 text-7xl font-semibold tracking-wide">
          Cupid
        </h1>
        <input
          type="text"
          hidden
          aria-hidden
          defaultValue="signup"
          name="form-type"
        />
        <span className="font-semibold text-accent-tint-700">
          Continue with the Email
        </span>
        <InputField label="Email" />
        <PasswordField />
        <Link className="hover:text-accent-shade-600 text-base hover:underline transition-all " href="/signup">Create new Account</Link>
        <button className="w-full rounded-xl bg-accent-tint-700 py-3 text-xl font-semibold tracking-wider text-accent-shade-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default SigninPage;
