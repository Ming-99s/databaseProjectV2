import { useState } from "react";
import { Button, Box, Typography, FormControl, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAxiosPost from "../hook/useAxoisPost";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const { response, loading, error, postData } = useAxiosPost();  // Destructure postData here

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    if (!user || !password) {
      alert("Please enter both username and password.");
      return;
    }
  
    await postData('/login', { user, password });
  
    console.log("Response:", response);  // Log the response from the backend
    console.log("Error:", error);  // Log any errors
  
    if (response) {
      const { role } = response;
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/setting');
      }
    }
  
    if (error) {
      alert("Error: " + error);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
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

      <Box mt={3}>
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}  // Disable the button during loading
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Box>

      {/* Show error message if there's any */}
      {error && (
        <Box mt={2} color="red">
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}
    </>
  );
}

export default Login;
