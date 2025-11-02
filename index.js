// index.js (Main server file)
const express = require('express');
const path = require('path');
const crypto = require('crypto');
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

global.egg = "15";
global.nestid = "5";
global.loc = "1";
global.domain = "https://fukushima.brengsek.my.id";
global.apikey = "ptla_4wKuCS4EI99hCWynTPfNyxYYot7Ky56ydJFon8736WO";

app.get('/api/cpanel', async (req, res) => {
  const { username, paket } = req.query;
  if (!username || !paket) {
    return res.status(400).json({ status: false, error: 'Missing username or paket query parameter' });
  }

  let ram, disk, cpu;
  switch (paket.toLowerCase()) {
    case "1gb": ram = "1000"; disk = "1000"; cpu = "40"; break;
    case "2gb": ram = "2000"; disk = "1000"; cpu = "60"; break;
    case "3gb": ram = "3000"; disk = "2000"; cpu = "80"; break;
    case "4gb": ram = "4000"; disk = "2000"; cpu = "100"; break;
    case "5gb": ram = "5000"; disk = "3000"; cpu = "120"; break;
    case "6gb": ram = "6000"; disk = "3000"; cpu = "140"; break;
    case "7gb": ram = "7000"; disk = "4000"; cpu = "160"; break;
    case "8gb": ram = "8000"; disk = "4000"; cpu = "180"; break;
    case "9gb": ram = "9000"; disk = "5000"; cpu = "200"; break;
    case "10gb": ram = "10000"; disk = "5000"; cpu = "220"; break;
    case "unlimited":
    case "unli": ram = "0"; disk = "0"; cpu = "0"; break;
    default: return res.status(400).json({ status: false, error: 'Paket tidak valid' });
  }

  try {
    const email = username + "@gmail.com";
    const password = username + crypto.randomBytes(2).toString('hex');

    // Buat user di panel
    const userRes = await fetch(`${global.domain}/api/application/users`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${global.apikey}`
      },
      body: JSON.stringify({
        email,
        username,
        first_name: username,
        last_name: "Server",
        language: "en",
        password
      })
    });

    const userData = await userRes.json();
    if (userData.errors) return res.status(500).json({ status: false, error: userData.errors[0] });

    const userId = userData.attributes.id;

    // Buat server
    const serverRes = await fetch(`${global.domain}/api/application/servers`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${global.apikey}`
      },
      body: JSON.stringify({
        name: username,
        description: `Server dibuat oleh API`,
        user: userId,
        egg: parseInt(global.egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: "npm start",
        environment: {},
        limits: {
          memory: ram,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu
        },
        feature_limits: {
          databases: 5,
          backups: 5,
          allocations: 5
        },
        deploy: {
          locations: [parseInt(global.loc)],
          dedicated_ip: false,
          port_range: []
        }
      })
    });

    const serverData = await serverRes.json();
    if (serverData.errors) return res.status(500).json({ status: false, error: serverData.errors[0] });

    return res.json({
      status: true,
      username,
      password,
      paket,
      ram,
      cpu,
      disk,
      server_id: serverData.attributes.id
    });
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
  }
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

app.get("/api/brat", async (req, res) => {
  const { text } = req.query;

  if (!text) {
    return res.json({
      status: true,
      creator: "FUKU-AHMADXYZ",
      result: "tolol text nya mana anjing"
    });
  }

  try {
    const apiUrl = `https://api.nekolabs.web.id/canvas/brat/v1?text=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const buffer = await response.buffer();

    res.set("Content-Type", "image/png");
    res.send(buffer);
  } catch (err) {
    res.status(500).json({
      status: false,
      creator: "FUKU-AHMADXYZ",
      result: "Terjadi kesalahan"
    });
  }
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