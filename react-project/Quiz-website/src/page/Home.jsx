import { Button, Typography ,Box} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  function handleLogin(){
    navigate('/login');
  }
  function handleSignUp(){
    navigate('/signup');
  }
  return (
    <>
    <Typography variant='h1' mb={3}>Home Page</Typography>
    <Box mt={3}>

      <Button onClick={handleLogin} fullWidth variant='contained'>
        Login
      </Button>
    </Box>
    <Box mt={3}>

      <Button onClick={handleSignUp} fullWidth variant='contained'>
        Sign up
      </Button>
    </Box>
    </>
    
  )
}

export default Home