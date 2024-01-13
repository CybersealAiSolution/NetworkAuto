import React from 'react';
import {Container,Typography,Button} from '@mui/material';
import { Button as ButtonJoy } from "@mui/joy";
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  let navigate = useNavigate();

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
      <Typography variant="h2" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! Page not found.
      </Typography>
      <Typography variant="body1">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <ButtonJoy
        type="button"
        variant="outlined"
          
        sx={{
          mt: 3,
          backgroundColor: "#000",
          color: "white",
          "&:hover": {
            backgroundColor: "black",
            color: "white",
          },
        }}
        onClick={() => navigate('/')} 
      >
        Go to Homepage
      </ButtonJoy>
      
    </Container>
  );
};

export default NotFoundPage;
