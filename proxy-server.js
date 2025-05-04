const express = require('express');
const axios = require('axios');
const cors = require('cors'); // To allow cross-origin requests

const app = express();

app.use(cors()); // Enable CORS for all requests

// Proxy route for radar images
app.get('/proxy/radar/:site/:product/:timestamp.png', async (req, res) => {
    const { site, product, timestamp } = req.params;
    // Construct URL for the radar image based on site, product, and timestamp
    const url = `https://radar.weather.gov/ridge/standard/${site}/${product}_${timestamp}.png`;

    try {
        // Fetch the radar image using axios
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        res.set('Content-Type', 'image/png');
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching radar image:', error);
        res.status(500).send('Failed to fetch radar image');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Proxy server running on http://localhost:3000');
});

