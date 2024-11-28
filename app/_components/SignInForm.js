'use client';
import Link from 'next/link';
import {useState} from 'react';
import {useFormStatus} from 'react-dom';
import {signInSchema} from '../_lib/zod';
import InputField from './InputField';
import LogoBold from './LogoBold';
import PasswordField from './PasswordField';
import handleSignIn from '@/_actions/handleSignIn';
import {ZodError} from 'zod';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const {pending} = useFormStatus();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isError, setIsError] = useState(false);
  const handleChange = (e) => {
    setErrorMsg({...errorMsg, [e.target.name]: ''});
    setIsError(false);
  };
  const handleSubmit = async (event) => {
    try {
      setIsLoading(true);
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      await signInSchema.parseAsync({email, password});
      const response = await handleSignIn({email, password});
      console.log('response', response);
      if (response) {
        router.push('/direct/menu/inbox');
      }
    } catch (error) {
      let errorObj = {};
      if (error instanceof ZodError) {
        errorObj = {...error?.format(), type: 'zod'};
      } else {
        errorObj = {...error, type: 'error', message: error.message};
      }
      setErrorMsg(errorObj);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-5 px-7"
      onSubmit={handleSubmit}>
      <LogoBold />
      <span className="select-none font-semibold text-accent-shade-700">Login with the Email</span>
      <InputField
        label="Email"
        name="email"
        handleChange={handleChange}
        ErrorMsg={errorMsg}
        disabled={pending || isLoading}
      />
      <div className="flex flex-col gap-1">
        <PasswordField
          name="password"
          handleChange={handleChange}
          setErrorMsg={setErrorMsg}
          ErrorMsg={errorMsg}
        />
        {isError && errorMsg?.type === 'error' && (
          <div className="mt-1 rounded-md bg-red-100 px-2 py-1 text-sm text-red-500">
            {errorMsg.message}
          </div>
        )}
      </div>
      <Link
        className="text-base transition-all hover:text-accent-shade-600 hover:underline"
        href="/signup">
        New Account
      </Link>
      <button
        type="submit"
        className={`w-full rounded-xl bg-accent-tint-700 py-3 text-base font-light tracking-wide text-accent-shade-700 ${
          isLoading || isError ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'
        }`}
        disabled={pending || isLoading || isError}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
