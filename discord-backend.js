// Simple Express server for Discord OAuth with WebSocket support for multiplayer
// Install dependencies: npm install express cors node-fetch dotenv ws

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { WebSocketServer } = require('ws');
const http = require('http');

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
const server = http.createServer(app);

// WebSocket server for real-time multiplayer
const wss = new WebSocketServer({ server });

// Store all connected clients and game rooms
const rooms = new Map();

wss.on('connection', (ws) => {
  console.log('New WebSocket connection');
  let currentRoom = 'default';
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      // Join room
      if (data.type === 'JOIN') {
        currentRoom = data.room || 'default';
        if (!rooms.has(currentRoom)) {
          rooms.set(currentRoom, new Set());
        }
        rooms.get(currentRoom).add(ws);
        ws.send(JSON.stringify({ type: 'JOINED', room: currentRoom }));
        console.log(`Client joined room: ${currentRoom}`);
        return;
      }
      
      // Broadcast message to all clients in the same room
      if (rooms.has(currentRoom)) {
        rooms.get(currentRoom).forEach(client => {
          if (client !== ws && client.readyState === 1) {
            client.send(JSON.stringify(data));
          }
        });
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });
  
  ws.on('close', () => {
    // Remove from room
    if (rooms.has(currentRoom)) {
      rooms.get(currentRoom).delete(ws);
      if (rooms.get(currentRoom).size === 0) {
        rooms.delete(currentRoom);
      }
    }
    console.log('WebSocket connection closed');
  });
});

server.listen(PORT, () => {
  console.log(`Discord OAuth server running on port ${PORT}`);
  console.log(`WebSocket server ready for multiplayer`);
  console.log(`Client ID: ${CLIENT_ID.substring(0, 10)}...`);
});
