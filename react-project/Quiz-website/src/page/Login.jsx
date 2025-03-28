import { useState } from "react";
import { Button, Box, Typography, FormControl, TextField, Alert } from "@mui/material";
import { useNavigate ,Link } from "react-router-dom";
import useAxiosPost from "../hook/useAxoisPost";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorM, setErrorM] = useState('');

  const { response, loading, error, postData } = useAxiosPost();

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  handleSubmit;
  async function handleSubmit(){
    if (!user || !password) {
      setErrorM("Please enter both username and password.");
      return;
    }

    setErrorM('');  // Clear any previous error messages
    await postData('/login', { user, password });

    console.log("Response:", response);  // Log the response from the backend
    console.log("Error:", error);  // Log any errors

    if (response) {
      const role = response.role;
      console.log(role);
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/setting');
      }
    } else if (error) {
      setErrorM(error.message || "Something went wrong, please try again.");
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom mt={3} fontWeight='bold'>
        Login
      </Typography>

      <Box mt={3}>
        <FormControl fullWidth size="small">
          <TextField
            label="Username"
            onChange={handleUserChange}
            type="text"
            value={user}
            required
          />
        </FormControl>
      </Box>

      <Box mt={3}>
        <FormControl fullWidth size="small">
          <TextField
            label="Password"
            onChange={handlePasswordChange}
            type="password"
            value={password}
            required
          />
        </FormControl>
      </Box>
      {/* Show error message if there's any */}
      {(error || errorM) && (
        <Box mt={2}>
          <Alert severity="error">{error || errorM}</Alert>
        </Box>
      )}

      <Box mt={3}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>

      <Box textAlign='right'>
        <Link to="/signup" style={{ color: "blue" }}>
          <Typography mt={2}>Don't have an account?</Typography>

        </Link>
      </Box>
    </>
  );
}

export default Login;
