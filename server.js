const express = require('express');
const loaders_nexrad = require('loaders_nexrad'); // Make sure this is installed
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/radar-frame/:site/:product/:timestamp', async (req, res) => {
    const { site, product, timestamp } = req.params;

    try {
        const buffer = await loaders_nexrad.fetch_level_3_file(site, product, timestamp);
        loaders_nexrad.quick_level_3_plot(site, product, (plotBuffer) => {
            res.set('Content-Type', 'image/png');
            res.send(plotBuffer);
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to load radar image');
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
});

