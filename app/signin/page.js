import SignInForm from '../_components/SignInForm';
import SignUpNav from '../_components/SignUpNav';
export const metadata = {
  title: 'Sign in',
  description: 'Sign in to your account',
};
function SigninPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-3 py-3">
      <SignUpNav heading="Sign in" />
      <SignInForm />
    </div>
  );
}

export default SigninPage;
