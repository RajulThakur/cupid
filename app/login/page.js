import LoginForm from "../_components/LoginForm";
import SignUpNav from "../_components/SignUpNav";

function SigninPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-3 py-3">
      <SignUpNav heading="Login" />
      <LoginForm />
    </div>
  );
}

export default SigninPage;
