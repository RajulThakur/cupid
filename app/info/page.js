import { Button, FormControl, TextField } from "@mui/material";
import GenderSel from "../_components/GenderSel";
import InputField from "../_components/InputField";
import ProfileEdit from "../_components/ProfileEdit";
import RelSelect from "../_components/RelSelect";
import SignUpNav from "../_components/SignUpNav";

function SignupPage() {
  return (
    <div className='flex flex-col px-3 h-svh items-center justify-between py-3'>
      <SignUpNav />
      <div className='flex flex-col gap-5 items-center px-7'>
        <ProfileEdit />
        <div className='flex gap-2'>
          <InputField label='First Name' />
          <InputField label='Last Name' />
        </div>
        <InputField label='Username' />
        <FormControl fullWidth>
          <GenderSel />
        </FormControl>
        <RelSelect />
        <TextField
        fullWidth
          id='filled-multiline-static'
          label='Bio'
          multiline
          rows={4}
          placeholder='Something you like'
          variant='filled'
        />
      </div>
      <button className='w-full py-3 tracking-wider bg-accent-tint-700 rounded-xl font-semibold text-xl text-accent-shade-700'>
        Next
      </button>
    </div>
  );
}

export default SignupPage;
