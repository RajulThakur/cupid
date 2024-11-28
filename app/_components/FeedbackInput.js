'use client';
import {TextField} from '@mui/material';
import {useEffect, useState} from 'react';
import {BASE_URL} from '../_helper/Config';
import useDebounce from '../_hooks/Debouncing';

function FeedbackInput({name, label, errorMsg = '', setError, setErrorMsg}) {
  const [value, setValue] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const debounceSearch = useDebounce(value);
  const handleChange = (e) => {
    setValue(e.target.value.trim());
    setIsAvailable(true);
    setErrorMsg((prev) => ({...prev, [name]: null}));
    setError(false);
  };

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch(`${BASE_URL}/verify/check_${name}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({[name]: debounceSearch}),
        });

        const result = await response.json();
        console.log(result);
        if (!result.available) {
          console.log('not available');
          setIsAvailable(false);
        }
      } catch (error) {
        setIsAvailable(false);
        console.error('Error checking username:', error);
      }
    };
    check();
  }, [debounceSearch, name, setError]);

  return (
    <TextField
      error={!isAvailable || errorMsg?._errors?.[0]}
      helperText={(!isAvailable ? `${label} is already taken` : '') || errorMsg?._errors?.[0]}
      value={value}
      onChange={handleChange}
      label={label}
      name={name || label}
      variant="outlined"
      slotProps={{
        formHelperText: {
          sx: {
            fontSize: '10px',
            marginLeft: '1px',
          },
        },
      }}
      fullWidth
    />
  );
}

export default FeedbackInput;
