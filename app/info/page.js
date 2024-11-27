'use client';

import {useState} from 'react';
import {FormControl} from '@mui/material';
import GenderSel from '../_components/GenderSel';
import InputField from '../_components/InputField';
import ProfileEdit from '../_components/ProfileEdit';
import RelSelect from '../_components/RelSelect';
import SignUpNav from '../_components/SignUpNav';
import handleInfo from '@/_actions/handleInfo';
import {useRouter} from 'next/navigation';
import {InfoSchema} from '../_lib/zod';

function SignupPage({searchParams}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    setErrorMsg({...errorMsg, [e.target.name]: ''});
    setError(false);
  };
  return (
    <div className="flex h-svh flex-col items-center justify-center px-3 py-3">
      <SignUpNav heading="Info" />
      <form
        className="flex flex-col items-center gap-5 px-7"
        action={async (formData) => {
          try {
            setIsSubmitting(true);
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const gender = formData.get('gender');
            const relationship = formData.get('relationshipStatus');
            const bio = formData.get('bio');
            await InfoSchema.parseAsync({
              firstName,
              lastName,
              gender,
              relationship,
              bio,
            });
            await handleInfo({firstName, lastName, gender, relationship, bio});
            router.push(`/lock?id=${searchParams.id}&setup=true`);
          } catch (error) {
            setError(true);
            setErrorMsg(error?.format() || error.message);
          } finally {
            setIsSubmitting(false);
          }
        }}>
        <ProfileEdit
          disabled={isSubmitting}
          id={searchParams.id}
        />
        <div className="flex gap-2">
          <InputField
            label="First Name"
            name="firstName"
            ErrMessage={errorMsg}
            disabled={isSubmitting}
            handleChange={handleChange}
          />
          <InputField
            label="Last Name"
            name="lastName"
            ErrMessage={errorMsg}
            disabled={isSubmitting}
            handleChange={handleChange}
          />
        </div>
        <FormControl fullWidth>
          <GenderSel disabled={isSubmitting} />
        </FormControl>
        <RelSelect
          disabled={isSubmitting}
          isError={errorMsg}
          ErrMessage={errorMsg}
          setErrorMsg={setErrorMsg}
        />
        <InputField
          label="Bio"
          name="bio"
          ErrMessage={errorMsg}
          handleChange={handleChange}
          multiline
          rows={4}
          placeholder="Something you like"
          variant="filled"
          disabled={isSubmitting}
        />
        <button
          type="submit"
          disabled={isSubmitting || error}
          className={`w-full rounded-xl bg-accent-tint-400 py-3 text-xl font-semibold tracking-wider text-accent-shade-700 disabled:opacity-50 ${
            isSubmitting || error ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}>
          {isSubmitting ? (
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></span>
          ) : (
            'Signup'
          )}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
