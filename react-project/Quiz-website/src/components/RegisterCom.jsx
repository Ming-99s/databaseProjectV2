import React from 'react';
import { FormControl, TextField, Box } from "@mui/material";
import { useDispatch } from 'react-redux';
import { handleNameChange, handlePasswordChange, handleEmailChange } from '../redux/action'; // Import actions

function RegisterCom({ label, type }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;

    // Dispatch action based on the label (field)
    if (label === "Username") {
      dispatch(handleNameChange(value));
    } else if (label === "Email") {
      dispatch(handleEmailChange(value));
    } else if (label === "Password") {
      dispatch(handlePasswordChange(value));
    }
  };

  return (
    <Box mt={3}>
      <FormControl fullWidth>
        <TextField
          label={label}
          type={type}
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  );
}

export default RegisterCom;
