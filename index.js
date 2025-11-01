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

app.get("/api/imagen", async (req, res) => {
  const { prompt, ratio } = req.query;

  if (!prompt) {
    return res.status(400).json({
      success: false,
      message: 'Missing "prompt" query parameter'
    });
  }

  try {
    const apiUrl = `https://api.nekolabs.web.id/ai/imagen/3?prompt=${encodeURIComponent(prompt)}&ratio=${encodeURIComponent(ratio || "1:1")}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    res.json({
      success: true,
      madeBy: "AhmadXyz-Fukusima",
      result: data.result,
      ratio: ratio || "1:1",
      time: data.responseTime || "unknown"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.get("/api/brat", (req, res) => {
  const { text } = req.query;

  if (!text) return res.status(400).send("Missing 'text' query parameter");

  const url = `https://api.nekolabs.web.id/canvas/brat/v1?text=${encodeURIComponent(text)}`;
  res.redirect(url);
});

app.get('/api/chatbot', async (req, res) => {
  const { name = "Fuku", prompt = "Nama kamu adalah Fuku", query } = req.query;

  if (!query) {
    return res.status(400).json({
      status: false,
      status_code: 400,
      message: 'Missing "query" parameter'
    });
  }

  try {
    const apiUrl = `https://api.nekolabs.web.id/ai/chatbot?name=${encodeURIComponent(name)}&instruction=${encodeURIComponent(prompt)}&question=${encodeURIComponent(query)}`;
    console.log("[DEBUG] Nekolabs URL:", apiUrl);

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("[DEBUG] Nekolabs raw response:", data);

    res.json({
      status: data.success,
      status_code: 200,
      result: data.result,
      timestamp: data.timestamp,
      responseTime: data.responseTime,
      source: "FUKU-API",
      madeBy: "AhmadXyz-Fukushima"
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      status_code: 500,
      message: "Gagal menghubungi API Nekolabs",
      error: error.message
    });
  }
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