// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/proxy/radar/:site/:product/:timestamp', async (req, res) => {
  const { site, product, timestamp } = req.params;

  // Example URL:
  // https://noaa-nexrad-level3.s3.amazonaws.com/2025/05/04/KLWX/N0Q/KLWX_N0Q_20250504_2348
  const year = timestamp.slice(0, 4);
  const month = timestamp.slice(4, 6);
  const day = timestamp.slice(6, 8);
  const hourmin = timestamp.slice(9); // 2348

  const awsUrl = `https://noaa-nexrad-level3.s3.amazonaws.com/${year}/${month}/${day}/${site}/${product}/${site}_${product}_${timestamp}`;

  try {
    const response = await axios.get(awsUrl, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(response.data);
  } catch (err) {
    res.status(404).send('Radar image not found');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});




