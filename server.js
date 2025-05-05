const express = require('express');
const loaders_nexrad = require('loaders_nexrad');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/proxy/radar/:site/:product/:timestamp.png', async (req, res) => {
    const { site, product, timestamp } = req.params;

    try {
        // Fetch and render the radar image using loaders_nexrad
        await loaders_nexrad.quick_level_3_plot(site, product, (buffer) => {
            res.setHeader('Content-Type', 'image/png');
            res.send(buffer);
        }, timestamp);
    } catch (err) {
        console.error('Error serving radar image:', err);
        res.status(500).send('Radar image fetch failed.');
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Proxy server running on port ${port}`);
});

