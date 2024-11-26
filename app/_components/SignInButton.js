import Image from 'next/image';
// import { signInActionGoogle } from "../_lib/action";

function SignInButton({src, label, style}) {
  return (
    <form>
      <button
        className={`flex items-center gap-6 border text-lg ${style} rounded-lg px-10 py-4 font-medium`}>
        <Image
          src={src}
          alt={`${label} logo`}
          height="24"
          width="24"
        />
        <span>Continue with {label}</span>
      </button>
    </form>
  );
}

export default SignInButton;
