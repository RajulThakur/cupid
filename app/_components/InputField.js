import { TextField } from "@mui/material";

function InputField({ label }) {
  return (
    <TextField
      id='outlined-basic'
      label={label}
      name={label}
      variant='outlined'
      fullWidth
    />
  );
}

export default InputField;
