import React, { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';
import RegisterCom from '../components/RegisterCom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAxiosPost from '../hook/useAxoisPost';

function SignUp() {
  const navigator = useNavigate();
  const { Username, Password, Email } = useSelector((state) => state);
  const [message, setMessage] = useState('');
  const { response, loading, error, postData } = useAxiosPost();

  const handleClick = () => {
    // Check if all fields are provided
    if (!Username || !Password || !Email) {
      setMessage('Please fill out all fields');
      return;
    }

    // Trigger the API call only when the user clicks the Register button
    if (!loading) {
      postData('/signup', { username: Username, email: Email, password: Password });
    }
  };

  useEffect(() => {
    // Handle response or error after API call is completed
    if (response) {
      setMessage('User has been registered successfully!');
      navigator('/setting'); // Redirect after success
    } else if (error) {
      setMessage(`Error: ${error}`);
    }
  }, [response, error, navigator]);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <RegisterCom label="Username" type="text" required />
      <RegisterCom label="Email" type="email" required />
      <RegisterCom label="Password" type="password" required />

      <Box mt={3}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleClick}
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </Box>

      <Typography variant="body1" color="error" mt={2}>
        {message}
      </Typography>
    </>
  );
}

export default SignUp;
