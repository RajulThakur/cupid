'use client';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';

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

export default function RelSelect() {
  const [relStatus, setRelStatus] = React.useState('');
  const handleChange = (event) => {
    setRelStatus(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="relationship-label">Relationship</InputLabel>
      <Select
        labelId="relationship-label"
        id="relationship-select-label"
        value={relStatus}
        label="Relationship"
        name="relationshipStatus"
        onChange={handleChange}>
        {status.map((relsta) => (
          <MenuItem
            value={relsta}
            key={relsta}>
            {`${relsta}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
