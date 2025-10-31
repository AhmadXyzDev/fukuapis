// index.js (Main server file)
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Load config if needed (for future endpoints)
let config;
try {
  config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
} catch (err) {
  config = { endpoints: [] };
}

// API endpoint for tobase64 (GET method)
app.get('/api/tobase64', (req, res) => {
  const text = req.query.text;

  if (!text) {
    return res.status(400).json({
      status: false,
      message: 'Missing "text" query parameter'
    });
  }

  const base64 = Buffer.from(text, 'utf-8').toString('base64');

  res.json({
    status: true,
    madeBy: "AhmadXyz-Fukushima",
    aselinya: text,
    base64
  });
});

app.get('/api/ytmp3', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ status: false, status_code: 400, error: 'Missing "url" query parameter' });

  try {
    const apiUrl = `https://api.vreden.my.id/api/v1/download/youtube/audio?url=${encodeURIComponent(url)}&quality=128`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const result = data.result;

    res.json({
      status: true,
      status_code: 200,
      metode: "GET",
      result: {
        status: true,
        MadeBy: "AhmadXyz-Fukushima",
        metadata: {
          type: "video",
          videoId: result.metadata.videoId,
          url: result.metadata.url,
          title: result.metadata.title,
          description: result.metadata.description,
          image: result.metadata.image,
          thumbnail: result.metadata.thumbnail,
          seconds: result.metadata.duration.seconds,
          timestamp: result.metadata.duration.timestamp,
          duration: {
            seconds: result.metadata.duration.seconds,
            timestamp: result.metadata.duration.timestamp
          },
          ago: result.metadata.ago,
          views: result.metadata.views,
          author: {
            name: result.metadata.author.name,
            url: result.metadata.author.url
          }
        },
        download: {
          status: true,
          quality: result.download.quality,
          availableQuality: result.download.availableQuality,
          url: result.download.url,
          filename: result.download.filename
        }
      }
    });
  } catch (err) {
    res.status(500).json({ status: false, status_code: 500, error: err.message });
  }
});

app.get('/api/status', (req, res) => {
  const now = new Date();

  res.json({
    status: true,
    status_code: 200,
    service: "Fukushima API",
    status_message: "Active",
    server_time: now.toISOString(), // waktu UTC
    server_timestamp: now.getTime(), // timestamp ms
    local_time: now.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
    info: {
      message: "API berjalan normal",
      uptime: process.uptime() // detik sejak server start
    }
  });
});

// For future endpoints from config.json, you can add logic here to dynamically load them
// Example: config.endpoints.forEach(endpoint => app[endpoint.method]('/api/' + endpoint.name, require('./api/' + endpoint.name)));

// Catch-all route to serve index.html for SPA-like behavior
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`FukuAPI running on http://localhost:${port}`);
});