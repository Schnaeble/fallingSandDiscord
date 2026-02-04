// Simple Express server for Discord OAuth
// Install dependencies: npm install express cors node-fetch dotenv

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

// Load from environment variables (set these in your hosting platform or .env file)
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

// Validate environment variables
if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('ERROR: DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET must be set in environment variables');
  process.exit(1);
}

// Token endpoint for Discord OAuth
app.post('/.proxy/api/token', async (req, res) => {
  try {
    const { code } = req.body;
    
    const response = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Token exchange error:', error);
    res.status(500).json({ error: 'Token exchange failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Discord OAuth server running on port ${PORT}`);
  console.log(`Client ID: ${CLIENT_ID.substring(0, 10)}...`);
});
