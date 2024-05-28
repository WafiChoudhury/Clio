
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.get('/oembed', async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('URL is required');
  }
  try {
    const response = await axios.get(`https://www.reddit.com/oembed?url=${encodeURIComponent(url)}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).send('Error fetching embed data');
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
