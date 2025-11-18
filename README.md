# CimaNow Stremio Addon 🎬

Arabic streaming addon for Stremio that provides content from CimaNow.cc

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm start
```

The addon will be available at: `http://localhost:7000/manifest.json`

### 3. Install in Stremio

1. Open **Stremio** desktop app
2. Click the **puzzle icon** (Addons) at the top
3. Scroll down and paste this URL: `http://localhost:7000/manifest.json`
4. Click **Install**
5. Browse Arabic movies and series! 🎉

## 🧪 Testing

Test the scraper before running:

```bash
npm test
```

This will:
- Fetch the homepage
- Parse movie listings
- Display a sample result

## 📝 Development

For auto-restart on file changes:

```bash
npm run dev
```

## 🔧 Important: Update Selectors

⚠️ **The CSS selectors may need adjustment!**

1. Open https://cimanow.cc in your browser
2. Press **F12** to open DevTools
3. Inspect a movie card element
4. Find the CSS classes used (e.g., `.MovieBlock`, `.film-item`, etc.)
5. Update the selectors in `scraper.js`:

```javascript
const selectors = [
  '.YourActualClass',  // Replace with real class names
  '.MovieBlock',
  // ...
];
```

## 📂 File Structure

```
stremio-cimanow-addon/
├── index.js        # Main addon server & handlers
├── scraper.js      # Web scraping logic
├── config.js       # Configuration
├── test.js         # Test script
├── package.json    # Dependencies
├── .gitignore      # Git ignore rules
└── README.md       # This file
```

## 📡 API Endpoints

Once running, these endpoints are available:

- **Manifest**: `http://localhost:7000/manifest.json`
- **Movie Catalog**: `http://localhost:7000/catalog/movie/cimanow-movies.json`
- **Series Catalog**: `http://localhost:7000/catalog/series/cimanow-series.json`
- **Meta**: `http://localhost:7000/meta/{type}/{id}.json`
- **Stream**: `http://localhost:7000/stream/{type}/{id}.json`

## 🐛 Troubleshooting

### No movies showing up

1. Run `npm test` to check scraping
2. Check console logs for errors
3. Update CSS selectors in `scraper.js`
4. Verify site is accessible

### Site blocking requests

- The site uses CloudFlare protection
- Headers are already configured
- May need residential proxy for production

### Streams not playing

- Some streams are iframe embeds (Stremio handles these)
- Some may require external player
- Check stream URLs in console logs

## 📦 Deployment Options

### Option 1: Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Option 2: Railway.app

1. Push to GitHub
2. Connect repo in Railway
3. Deploy automatically

### Option 3: Heroku

```bash
git init
heroku create
git push heroku main
```

### Option 4: Cloudflare Workers

For better CloudFlare bypass, consider rewriting as a Worker.

## 🔍 How It Works

1. **Catalog Handler**: Scrapes movie/series listing pages
2. **Meta Handler**: Extracts detailed info for a specific title
3. **Stream Handler**: Finds video sources (iframes, m3u8, mp4)
4. **Caching**: Results cached for 6 hours to reduce requests

## 🛠️ Configuration

Edit `config.js`:

```javascript
module.exports = {
  BASE_URL: 'https://cimanow.cc/',
  CACHE_TTL: 21600,  // Cache duration in seconds
  REQUEST_TIMEOUT: 15000,  // Request timeout
};
```

## ⚠️ Legal Notice

This addon is for **educational purposes only**. Ensure you have the legal right to access and stream content.

## 📄 License

MIT License - Feel free to modify and distribute
