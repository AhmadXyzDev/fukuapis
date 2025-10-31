const express = require('express');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

let config;
try {
  config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
} catch {
  config = { endpoints: [] };
}

app.get('/api/tobase64', (req, res) => {
  const text = req.query.text;
  if (!text) return res.status(400).json({ status: false, message: 'Missing "text" query parameter' });
  const base64 = Buffer.from(text, 'utf-8').toString('base64');
  res.json({ status: true, status_code: 200, metode: "GET", result: { status: true, MadeBy: "AhmadXyz-Fukushima", aselinya: text, base64 } });
});

app.get('/api/ytmp3', async (req, res) => {
  const url = req.query.url;
  const quality = req.query.quality || 128;
  if (!url) return res.status(400).json({ status: false, status_code: 400, error: 'Missing "url" query parameter' });

  try {
    const apiUrl = `https://api.vreden.my.id/api/v1/download/youtube/audio?url=${encodeURIComponent(url)}&quality=${quality}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (!data || !data.result || !data.result.download) return res.status(500).json({ status: false, status_code: 500, error: 'Failed to fetch audio from API' });

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
          duration: { seconds: result.metadata.duration.seconds, timestamp: result.metadata.duration.timestamp },
          ago: result.metadata.ago,
          views: result.metadata.views,
          author: { name: result.metadata.author.name, url: result.metadata.author.url }
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

if (config.endpoints && Array.isArray(config.endpoints)) {
  config.endpoints.forEach(endpoint => {
    try {
      const handler = require(`./api/${endpoint.name}`);
      app[endpoint.method](`/api/${endpoint.name}`, handler);
    } catch {}
  });
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`FukuAPI running on http://localhost:${port}`));