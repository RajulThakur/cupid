import { TextField } from "@mui/material";

function InputField({ label,name }) {
  return (
    <TextField
      id='outlined-basic'
      label={label}
      name={name || label}
      variant='outlined'
      fullWidth
    />
  );
}

export default InputField;
