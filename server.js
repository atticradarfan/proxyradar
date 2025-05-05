const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/proxy/radar/:site/:product/:timestamp', async (req, res) => {
  const { site, product, timestamp } = req.params;
  const url = `https://noaa-nexrad-level3.s3.amazonaws.com/composite/${site}/${product}/${timestamp}.gif`;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.set('Content-Type', 'image/gif');
    res.send(response.data);
  } catch (err) {
    console.error('Radar fetch error:', err.message);
    res.status(404).send('Radar image not found.');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});




