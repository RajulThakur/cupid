'use client';
import {Checkbox} from '@mui/material';
import InputField from './InputField';
import bcrypt from 'bcryptjs';
import LogoBold from './LogoBold';
import PasswordField from './PasswordField';
import FeedbackInput from './FeedbackInput';
import {useState} from 'react';
import handleSignUp from '@/_actions/handleSignUp';
import {useRouter} from 'next/navigation';
import {signUpSchema} from '../_lib/zod';

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      const email = event.target.email.value;
      const username = event.target.username.value;
      const password = event.target.password.value;
      await signUpSchema.parseAsync({
        email,
        username,
        password,
      });
      const hashedPassword = bcrypt.hashSync(password, 9);
      const userid = await handleSignUp({email, username, password: hashedPassword});
      router.push(`/info?id=${userid}`);
    } catch (error) {
      console.log(error?.format() || error.message);
      setIsError(true);
      setErrorMsg(error?.format() || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-8 px-7"
      onSubmit={onSubmit}>
      <div className="flex flex-col items-center">
        <LogoBold />
        <span className="select-none font-semibold text-accent-shade-700">
          Continue with the Email
        </span>
      </div>
      <div className="flex h-auto flex-col items-center gap-3 transition-all duration-300">
        <input
          type="text"
          hidden
          aria-hidden
          defaultValue="signup"
          name="formType"
        />
        <FeedbackInput
          errorMsg={errorMsg?.email}
          setError={setIsError}
          setErrorMsg={setErrorMsg}
          label="Email"
          name="email"
        />
        <FeedbackInput
          errorMsg={errorMsg?.username}
          setError={setIsError}
          setErrorMsg={setErrorMsg}
          label="Username"
          name="username"
        />

        <PasswordField
          name="password"
          errorMsg={errorMsg?.password}
          setErrorMsg={setErrorMsg}
          setError={setIsError}
        />
        <div className="self-start">
          <Checkbox
            aria-label="Checkbox"
            name="checkbox"
          />
          <span>
            I agree to <a>terms & conditions</a>
          </span>
        </div>
      </div>
      <button
        type="submit"
        className={`w-full rounded-xl bg-accent-tint-400 py-3 text-xl font-semibold tracking-wider text-accent-shade-700 ${
          isLoading || isError ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        } `}
        disabled={isLoading || isError}>
        {isLoading ? <span className="spinner"></span> : 'Next'}
      </button>
    </form>
  );
}
