const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Allow CORS for all origins (you can restrict this later)
app.use(cors());

// TMDB API Key
const TMDB_API_KEY = process.env.TMDB_API_KEY; // Use environment variable and revoke original API key

if (!TMDB_API_KEY) {
    console.error('Error: TMDB_API_KEY is not defined in environment variables.');
    process.exit(1); // Exit the server if no API key
}

// Hardcoded Proxy Endpoint for /search/multi
app.get('/api/search/multi', async (req, res) => {
    const queryParams = req.query;

    try {
        const response = await axios.get('https://api.themoviedb.org/3/search/multi', {
            params: { ...queryParams, api_key: TMDB_API_KEY },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch data from TMDB' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
