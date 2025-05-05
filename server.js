const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

// Enable CORS to allow frontend to fetch from this server
app.use(cors());

// Simple proxy route to fetch radar images from AWS
app.get('/proxy/radar/:site/:product/:timestamp.png', async (req, res) => {
    const { site, product, timestamp } = req.params;

    // Construct the AWS URL for the radar image
    const radarUrl = `https://noaa-nexrad-level2.s3.amazonaws.com/${site}/${timestamp}.png`;
    console.log(`Fetching radar image from: ${radarUrl}`);

    try {
        // Fetch the radar image as an array buffer
        const response = await axios.get(radarUrl, { responseType: 'arraybuffer' });

        // Set the appropriate content type for the image
        res.set('Content-Type', 'image/png');

        // Send the image data to the frontend
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching radar image:', error);
        res.status(500).send('Failed to fetch radar image');
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Proxy server running on http://localhost:3000');
});



