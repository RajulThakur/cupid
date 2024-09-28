import handleInfo from "@/actions/handleInfo";
import { FormControl, TextField } from "@mui/material";
import GenderSel from "../_components/GenderSel";
import InputField from "../_components/InputField";
import ProfileEdit from "../_components/ProfileEdit";
import RelSelect from "../_components/RelSelect";
import SignUpNav from "../_components/SignUpNav";
import { redirect } from "next/navigation";

function SignupPage() {
  // Get headers

  return (
    <div className="flex h-svh flex-col items-center justify-center px-3 py-3">
      <SignUpNav heading="Info" />
      <form
        className="flex flex-col items-center gap-5 px-7"
        action={async (formData) => {
          "use server";
          await handleInfo(formData);
          redirect('/')
        }}
      >
        <ProfileEdit />
        <div className="flex gap-2">
          <InputField label="First Name" name="firstName" />
          <InputField label="Last Name" name="lastName" />
        </div>
        <FormControl fullWidth>
          <GenderSel />
        </FormControl>
        <RelSelect />
        <TextField
          fullWidth
          id="filled-multiline-static"
          label="Bio"
          name="bio"
          multiline
          rows={4}
          placeholder="Something you like"
          variant="filled"
        />
        <button className="w-full rounded-xl bg-accent-tint-700 py-3 text-xl font-semibold tracking-wider text-accent-shade-700">
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
