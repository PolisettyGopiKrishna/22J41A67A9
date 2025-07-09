import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box
} from "@mui/material";
import axios from "axios";

const URLShortener = () => {
  const [urls, setUrls] = useState([{ url: "", validity: "", shortcode: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newUrls = [...urls];
    newUrls[index][name] = value;
    setUrls(newUrls);
  };

  const handleSubmit = async () => {
    const newResults = [];

    for (const entry of urls) {
      try {
        // Client-side validation
        if (!/^https?:\/\/.+\..+/.test(entry.url)) {
          alert("Invalid URL: " + entry.url);
          return;
        }

        const response = await axios.post("http://localhost:5000/shorturls", {
          url: entry.url,
          validity: entry.validity ? parseInt(entry.validity) : 30,
          shortcode: entry.shortcode
        });

        newResults.push(response.data);
      } catch (err) {
        alert("Error shortening URL: " + err.response?.data?.error || err.message);
      }
    }

    setResults(newResults);
  };

  const addMore = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: "", validity: "", shortcode: "" }]);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Shorten URLs (Max 5)
      </Typography>

      {urls.map((entry, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Original URL"
              name="url"
              value={entry.url}
              onChange={(e) => handleChange(index, e)}
              required
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Validity (mins)"
              name="validity"
              type="number"
              value={entry.validity}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Custom Shortcode"
              name="shortcode"
              value={entry.shortcode}
              onChange={(e) => handleChange(index, e)}
            />
          </Grid>
        </Grid>
      ))}

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Shorten URLs
        </Button>
        <Button variant="outlined" onClick={addMore} disabled={urls.length >= 5}>
          Add URL
        </Button>
      </Box>

      {results.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="subtitle1">Shortened URLs:</Typography>
          {results.map((res, i) => (
            <Typography key={i}>
              <strong>{res.shortLink}</strong> (Expires: {res.expiry})
            </Typography>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default URLShortener;
