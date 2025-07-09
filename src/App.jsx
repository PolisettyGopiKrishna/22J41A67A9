import React from "react";
import { Container, Typography, Divider } from "@mui/material";
import URLShortener from '.components/URLShortener';
import URLStatistics from './components/URLStatistics';
import './App.css';

const App = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom align="center">
        URL Shortener Microservice
      </Typography>
      <URLShortener />
      <Divider sx={{ my: 4 }} />
      <URLStatistics />
    </Container>
  );
};

export default App;
