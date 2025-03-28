import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container,Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import '../index.css'
function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#FFA500", boxShadow: "none" ,alignItems:'center'}}>
        <Toolbar sx={{ justifyContent: "space-between", maxWidth:'1200px'}}>
          <Box component='img' src="/image/logo.png" width='5%'>

          </Box>
          {/* Navigation Links */}
          <Box>
              <Button
                sx={{ color: "#fff", fontSize: "14px", textTransform: "capitalize", mx: 1 }}
                onClick={() => navigate(`/`)}
              >Home
              </Button>
              <Button
                sx={{ color: "#fff", fontSize: "14px", textTransform: "capitalize", mx: 1 }}
                onClick={() => navigate(`/login`)}
              >Log in
              </Button>
              <Button
                variant="contained"
                sx={{ color: "#ffff", fontSize: "14px", textTransform: "capitalize", mx: 1 ,borderRadius:'20px',backgroundColor:'#2B3990'}}
                onClick={() => navigate(`/sign up`)}
              >Sign Up
              </Button>
            
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Box display="flex" alignItems="center" justifyContent="space-between" height='100vh'>
          {/* Left Section: Text */}
          <Box display="flex" justifyContent='space-between' alignItems='center' gap='50px'>
            {/* left Section: Image */}



            <Box sx={{width:'50%', textAlign:'left'}} >
              <Typography variant="h2" sx={{ fontWeight: "bold", color: "#2B3990" }}>
                <span style={{ color: "#FFA500" }}>QUIZ</span> NOW
              </Typography>
              <Typography variant="h6" sx={{ color: "#6C757D", mt: 2}}>
                The versatile data collection tool for professionals. Typeform makes asking easy & answering refreshing.
              </Typography>
              <Button
                variant="contained" onClick={() => navigate('/signup')}
                sx={{ mt: 3, borderRadius: "30px", fontSize: "18px", padding: "10px 25px", backgroundColor: "#FFA500" }}
              >
                  <Typography fontWeight='bold'>Let's do it!</Typography>
              </Button>
            </Box>
            <Box className="heroImage" component="img" src="/image/17786964_5898772.png" alt="Quiz Illustration" sx={{ width: "60%" }} />
          </Box>

          
        </Box>
      </Container>
    </>
  );
}

export default Home;
