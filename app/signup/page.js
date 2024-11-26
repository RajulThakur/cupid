import SignupForm from '../_components/SignupForm';
import SignUpNav from '../_components/SignUpNav';

export const metadata = {
  title: 'Signup',
  description: 'Create an account',
};

function SignupPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-3 py-3">
      <SignUpNav heading="Signup" />
      <SignupForm />
    </div>
  );
}

export default SignupPage;
