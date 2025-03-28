import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAxois from "../hook/useAxois";
function AdminDashboard() {
  const navigate = useNavigate();
  const { response, loading, error } = useAxois({ url: '/users' }); // Custom hook for fetching data
  const [users, setUsers] = useState([]); // State to store fetched users
  const [show, setShow] = useState(false);

  // Handle the "Show All Users" button click
  const handleShowAllUsers = () => {
    setShow(true);
    if (response) {
      setUsers(response); // Assuming response contains user data
    }
  };

  function closeUser(){
    setShow(false);
  }
  // Navigate to the CreateQuiz page
  function handleCreateQuiz() {
    navigate("/createquiz");
  }

  function handletoHomePage(){
    navigate('/');
  }

  return (
    <>
      <Typography variant="h3" mt={3} mb={3} fontWeight='bold' textAlign="center">Admin Dashboard</Typography>

      <Box>
        <Button fullWidth variant="contained" onClick={handleCreateQuiz}>
          Createquiz
        </Button>
      </Box>

      <Box mt={3}>
        <Button fullWidth variant="contained" onClick={handleShowAllUsers}>
          Show All Users
        </Button>
      </Box>
      <Box mt={3}>
        <Button fullWidth variant="contained" onClick={handletoHomePage}>
          Back to Home Page
        </Button>
      </Box>

      {/* Show users if 'show' is true */}
      {show && (
        <Box mt={3}>
          {users.length > 0 ? (
            users.map((user) => (
              <Box key={user.id} mt={2} p={2} border="1px solid #ccc" borderRadius={2}>
                <Typography variant="h6">Username: {user.username}</Typography>
                <Typography variant="body1">ID: {user.id}</Typography>
                <Typography variant="body1">Email: {user.email}</Typography>
              </Box>
            ))
          ) : (
            <Typography mt={2} color="red">
              No users found.
            </Typography>
          )}
          <Box mt={3} mb={3}>
            <Button onClick={closeUser} variant="contained" fullWidth>
              Close
            </Button>
          </Box>
        </Box>
        
      )}
    </>
  );
}

export default AdminDashboard;
