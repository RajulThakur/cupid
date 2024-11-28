import {TextField} from '@mui/material';

function InputField({label, name, ErrorMsg = '', handleChange, ...props}) {
  const error = Boolean(ErrorMsg?.[name]?._errors?.[0]);
  return (
    <TextField
      onChange={handleChange}
      error={error}
      helperText={error ? ErrorMsg?.[name]?._errors?.[0] : ''}
      id="outlined-basic"
      label={label}
      name={name || label}
      variant="outlined"
      fullWidth
      slotProps={{
        formHelperText: {
          sx: {
            fontSize: '10px',
            marginLeft: '1px',
          },
        },
      }}
      {...props}
    />
  );
}

export default InputField;
