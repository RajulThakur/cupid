import InputField from "../_components/InputField";
import PasswordField from "../_components/PasswordField";
import SignUpNav from "../_components/SignUpNav";

function SigninPage() {
  return (
    <div className="flex h-svh flex-col items-center justify-between px-3 py-3">
      <SignUpNav heading="Login"/>
      <div className="flex flex-col items-center gap-5 px-7">
        <h1 className="from-accent-tint-900 text-7xl font-semibold tracking-wide">
          Cupid
        </h1>
        <span className="font-semibold text-accent-tint-700">Continue with the Email</span>
        <InputField label="Email" />
        <PasswordField />
      </div>
      <button className="w-full rounded-xl bg-accent-tint-700 py-3 text-xl font-semibold tracking-wider text-accent-shade-700">
        Login
      </button>
    </div>
  );
}

export default SigninPage;
