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

app.get('/api/*', async (req, res) => {
    const endpoint = req.params[0]; // Extract everything after '/api/'
    const queryParams = req.query;

    console.log(`Received endpoint: ${endpoint}`);
    console.log(`Query parameters:`, queryParams);

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, {
            params: { ...queryParams, api_key: TMDB_API_KEY }
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
