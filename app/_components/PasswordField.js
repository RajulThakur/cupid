'use client';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';
import {useState} from 'react';

function PasswordField({name, ErrorMsg, handleChange}) {
  const [showPassword, setShowPassword] = useState(false);
  const error = !!ErrorMsg?.[name]?._errors?.[0];
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      error={error}>
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        name={name}
        onChange={handleChange}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {error && <FormHelperText>{ErrorMsg?.[name]?._errors?.[0]}</FormHelperText>}
    </FormControl>
  );
}

export default PasswordField;
