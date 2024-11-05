"use client";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { BASE_URL } from "../_helper/Config";
import useDebounce from "../_hooks/Debouncing";

function Username({ name, label }) {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const debounceSearch = useDebounce(value);
  const handleChange = (e) => {
    setValue(e.target.value.trim());
    setIsError(false);
  };

  useEffect(() => {
    const check = async () => {
      try {
        const response = await fetch(`${BASE_URL}/check_username`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: debounceSearch }),
        });

        const result = await response.json();
        if (!result.available) setIsError(true);
      } catch (error) {
        console.error("Error checking username:", error);
      }
    };
    check();
  }, [debounceSearch]);

  return (
    <TextField
      error={isError}
      helperText={isError ? "Username is already taken" : " "}
      value={value}
      onChange={handleChange}
      label={label}
      name={name || label}
      variant="outlined"
      slotProps={{ formHelperText: { sx: {
        fontSize:"10px",
        marginLeft:"1px"
      } } }}
      fullWidth
    />
  );
}

export default Username;
