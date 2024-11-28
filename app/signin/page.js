import SignUpNav from '../_components/SignUpNav';
import SignInForm from '../_components/SignInForm';
export const metadata = {
  title: 'Login',
  description: 'Login to your account',
};
function SigninPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-3 py-3">
      <SignUpNav heading="Login" />
      <SignInForm />
    </div>
  );
}

export default SigninPage;
