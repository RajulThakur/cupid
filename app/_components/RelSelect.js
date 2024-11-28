'use client';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import FormHelperText from '@mui/material/FormHelperText';

const status = [
  'Happily Married',
  'Pta nahi bagwan jane',
  'Single',
  'In a Relationship',
  'Complicated',
  'Open to Relationships',
  'Married',
  'In an Open Relationship',
];

export default function RelSelect({disabled, isError, ErrorMsg, setErrorMsg}) {
  const [relStatus, setRelStatus] = React.useState('');
  const handleChange = (event) => {
    setRelStatus(event.target.value);
    setErrorMsg({...isError, relationship: ''});
  };
  return (
    <FormControl
      fullWidth
      error={Boolean(isError?.relationship)}>
      <InputLabel id="relationship-label">Relationship</InputLabel>
      <Select
        labelId="relationship-label"
        id="relationship-select-label"
        value={relStatus}
        label="Relationship"
        name="relationshipStatus"
        onChange={handleChange}
        disabled={disabled}>
        {status.map((relsta) => (
          <MenuItem
            value={relsta}
            key={relsta}>
            {`${relsta}`}
          </MenuItem>
        ))}
      </Select>
      {isError?.relationship && <FormHelperText>{ErrorMsg?.relationship?._errors}</FormHelperText>}
    </FormControl>
  );
}
