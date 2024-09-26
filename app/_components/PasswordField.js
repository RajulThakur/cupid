"use client";
import { FunctionsSharp, Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";

function PasswordField({name}) {
  const [showPassword, setshowPassword] = useState(false);
  function handleClick() {
    setshowPassword((curr) => (curr = !curr));
  }
  const handleMouseEnter = (event) => {
    event.preventDefault();
  };
  return (
    <FormControl fullWidth
      variant='outlined'>
      <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
      <OutlinedInput
        id='outlined-adornment-password'
        name={name}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClick}
              onMouseDown={handleMouseEnter}
              onMouseUp={handleMouseEnter}
              edge='end'>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label='Password'
      />
    </FormControl>
  );
}

export default PasswordField;
