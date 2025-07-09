import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import axios from "axios";

const URLStatistics = () => {
  const [shortcode, setShortcode] = useState("");
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/shorturls/${shortcode}`);
      setStats(res.data);
    } catch (err) {
      alert("Error fetching statistics: " + err.response?.data?.error || err.message);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        URL Shortener Statistics
      </Typography>

      <Box sx={{ mb: 2 }}>
        <TextField
          label="Enter Shortcode"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          fullWidth
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={fetchStats}>
          Get Stats
        </Button>
      </Box>

      {stats && (
        <Box>
          <Typography variant="subtitle1">Original URL: {stats.originalUrl}</Typography>
          <Typography>ShortLink: {stats.shortLink}</Typography>
          <Typography>Created At: {stats.createdAt}</Typography>
          <Typography>Expiry: {stats.expiry}</Typography>
          <Typography>Total Clicks: {stats.clicks}</Typography>

          <Typography variant="subtitle2" sx={{ mt: 2 }}>
            Click Data:
          </Typography>
          <List>
            {stats.clickData.map((click, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={`Time: ${click.timestamp}`}
                  secondary={`Referrer: ${click.referrer}, Location: ${click.location}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default URLStatistics;
