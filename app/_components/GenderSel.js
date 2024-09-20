import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

function GenderSel() {
  return (
    <>
      <FormLabel id='radio-buttons-group-label'>Gender</FormLabel>
      <RadioGroup
        row
        aria-labelledby='radio-buttons-group-label'
        defaultValue='female'
        name='radio-buttons-group'>
        <FormControlLabel
          value='female'
          control={<Radio />}
          label='Female'
        />
        <FormControlLabel
          value='male'
          control={<Radio />}
          label='Male'
        />
        <FormControlLabel
          value='other'
          control={<Radio />}
          label='Other'
        />
      </RadioGroup>
    </>
  );
}

export default GenderSel;
