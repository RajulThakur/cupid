"use client";

import { useState, use } from "react";
import { FormControl, TextField } from "@mui/material";
import GenderSel from "../_components/GenderSel";
import InputField from "../_components/InputField";
import ProfileEdit from "../_components/ProfileEdit";
import RelSelect from "../_components/RelSelect";
import SignUpNav from "../_components/SignUpNav";
import { EdgeStoreProvider } from "../_lib/edgestore";
import handleInfo from "@/_actions/handleInfo";
import { useRouter } from "next/navigation";

function SignupPage(props) {
  const searchParams = use(props.searchParams);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  return (
    <div className="flex h-svh flex-col items-center justify-center px-3 py-3">
      <SignUpNav heading="Info" />
      <form
        className="flex flex-col items-center gap-5 px-7"
        action={async (formData) => {
          setIsSubmitting(true);
          try {
            await handleInfo(formData);
            setIsSubmitting(false);
            router.push(`/lock?id=${searchParams.id}&setup=true`);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <EdgeStoreProvider>
          <ProfileEdit disabled={isSubmitting} id={searchParams.id} />
        </EdgeStoreProvider>
        <div className="flex gap-2">
          <InputField label="First Name" name="firstName" disabled={isSubmitting} />
          <InputField label="Last Name" name="lastName" disabled={isSubmitting} />
        </div>
        <FormControl fullWidth>
          <GenderSel disabled={isSubmitting} />
        </FormControl>
        <RelSelect disabled={isSubmitting} />
        <TextField
          fullWidth
          id="filled-multiline-static"
          label="Bio"
          name="bio"
          multiline
          rows={4}
          placeholder="Something you like"
          variant="filled"
          disabled={isSubmitting}
        />
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full rounded-xl bg-accent-tint-700 py-3 text-xl font-semibold tracking-wider text-accent-shade-700 disabled:opacity-50"
        >
          {isSubmitting ? <span className="spinner"></span> : "Signup"}
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
