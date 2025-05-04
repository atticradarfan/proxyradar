const express = require('express');
const axios = require('axios');
const cors = require('cors'); // <--- NEW

const app = express();

app.use(cors()); // <--- NEW

// Proxy route
app.get('/proxy/radar/:site/:product/:timestamp.png', async (req, res) => {
    const { site, product, timestamp } = req.params;
    const url = `https://radar.weather.gov/ridge/standard/${site}/${product}_${timestamp}.png`;

    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        res.set('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching radar image:', error);
        res.status(500).send('Failed to fetch radar image');
    }
});

app.listen(3000, () => {
    console.log('Proxy server running on http://localhost:3000');
});

