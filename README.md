# 🏖️ Discord Falling Sand Game

A multiplayer falling sand physics simulator that runs as a Discord Activity! Play with friends in voice channels and watch elements interact in real-time.

## 🎮 Features

- **22 Different Materials** including sand, water, lava, fire, plants, and more
- **Real-time Multiplayer** - everyone draws on the same canvas
- **Complex Interactions** - watch elements transform and react
  - Fire melts glass into lava
  - Seeds grow into trees on dirt
  - Lava consumes and transforms materials
  - Water + dirt = mud, acid dissolves things, and much more!
- **Synchronized Physics** - all players see the same simulation

## 🚀 Quick Start for Developers

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/falling-sand-discord.git
cd falling-sand-discord
```

### 2. Set Up Backend

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit .env and add your Discord credentials
# Get these from https://discord.com/developers/applications
nano .env
```

Your `.env` should look like:
```env
DISCORD_CLIENT_ID=your_actual_client_id
DISCORD_CLIENT_SECRET=your_actual_client_secret
BACKEND_URL=http://localhost:3000
```

### 3. Set Up Frontend

```bash
# Copy config template
cp config.example.js config.js

# Edit config.js and add your Client ID
nano config.js
```

Your `config.js` should look like:
```javascript
const CONFIG = {
    DISCORD_CLIENT_ID: 'your_actual_client_id',
    BACKEND_URL: 'http://localhost:3000'
};
```

### 4. Run Locally

```bash
# Start the backend
npm start

# In another terminal, serve the frontend (using any static file server)
npx http-server . -p 8080

# Or use Python
python -m http.server 8080
```

Visit `http://localhost:8080/falling-sand.html`

## 📦 Deployment

### Backend (Railway/Render/Heroku)

1. Push your code to GitHub (secrets will be in `.env` which is gitignored)
2. Connect your repo to Railway/Render
3. Add environment variables in the platform:
   - `DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
4. Deploy!

### Frontend (GitHub Pages)

1. Create `config.js` with your production values:
```javascript
const CONFIG = {
    DISCORD_CLIENT_ID: 'your_client_id',
    BACKEND_URL: 'https://your-backend.railway.app'
};
```

2. Commit `config.js` to a **separate private repository** or **encrypt it**
3. Use GitHub Actions to inject it during build (see below)

#### Option 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Create config.js
        run: |
          echo "const CONFIG = {" > config.js
          echo "  DISCORD_CLIENT_ID: '${{ secrets.DISCORD_CLIENT_ID }}'," >> config.js
          echo "  BACKEND_URL: '${{ secrets.BACKEND_URL }}'" >> config.js
          echo "};" >> config.js
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

Then add secrets in GitHub:
- Settings → Secrets → Actions
- Add `DISCORD_CLIENT_ID` and `BACKEND_URL`

#### Option 2: Manual Upload

1. Create `config.js` locally (DON'T commit it)
2. Build your site with the config
3. Upload to GitHub Pages manually

### Configure Discord Activity

1. Go to https://discord.com/developers/applications
2. Your app → **Activities** tab
3. Add URL mapping:
   - Prefix: `/`
   - Target: `https://yourusername.github.io/falling-sand-discord/falling-sand.html`
4. Save!

## 🔐 Security Notes

**IMPORTANT**: Never commit these files with real credentials:
- ❌ `.env` - Backend secrets (gitignored)
- ❌ `config.js` - Frontend config with Client ID (gitignored)

**What's safe to commit**:
- ✅ `.env.example` - Template without real values
- ✅ `config.example.js` - Template without real values
- ✅ `.gitignore` - Prevents committing secrets

**Client ID vs Client Secret**:
- Client ID: Can be public (embedded in frontend), but we still hide it for cleanliness
- Client Secret: MUST be private (backend only, never in frontend code)

## 🎨 Material Interactions

### Fire & Heat
- Fire + Wood/Oil/Plant → Burns
- Fire + Glass → Heats → Melts into Lava
- Fire + Water → Steam
- Fire + Gunpowder → Explosion!

### Lava
- Lava + Glass → More Lava
- Lava + Metal → Melts
- Lava + Water → Stone

### Plants
- Seed + Dirt + Water → Tree grows!
- Plant + Water + Dirt → Spreads
- Acid + Plant → Gas

### Chemistry
- Water + Dirt → Mud
- Salt + Water → Salt Water
- Acid + Water → Dilutes
- Concrete + Water → Hardens to Stone

...and many more!

## 📝 File Structure

```
falling-sand-discord/
├── falling-sand.html      # Main game file
├── discord-backend.js     # OAuth backend
├── package.json           # Dependencies
├── .env.example           # Environment template
├── config.example.js      # Frontend config template
├── .gitignore            # Prevents committing secrets
├── DEPLOYMENT_GUIDE.md   # Detailed deployment guide
└── README.md             # This file
```

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript, HTML5 Canvas
- **Backend**: Node.js, Express
- **Discord**: Embedded App SDK
- **Hosting**: GitHub Pages + Railway/Render

## 🤝 Contributing

Contributions welcome! Feel free to:
- Add new materials
- Improve physics interactions
- Optimize performance
- Enhance multiplayer sync

## 📄 License

MIT License - feel free to use this for your own Discord servers!

## 🐛 Issues?

If you run into problems:
1. Check your Discord credentials are correct
2. Verify backend is running and accessible
3. Check browser console for errors
4. Make sure OAuth redirects are configured

## 🎉 Have Fun!

Build volcanoes, grow forests, create chain reactions, and watch the chaos unfold with friends! 🌋🌳💧🔥
