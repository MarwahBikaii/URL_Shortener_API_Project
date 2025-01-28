const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://marwabikai:q2u4fR!Y9Q-.d_M@urlshortener.k7zgc.mongodb.net/?retryWrites=true&w=majority&appName=URLShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// Define the URL schema
const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
});

// Create the URL model
const Url = mongoose.model('Url', urlSchema);

// Create a new short URL
app.post('/api/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortUrl = shortid.generate();

    const newUrl = new Url({ originalUrl, shortUrl });
    await newUrl.save();

    res.json({ originalUrl, shortUrl });
});

// Redirect to the original URL
app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (url) {
        return res.redirect(url.originalUrl);
    } else {
        return res.status(404).send('URL not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});