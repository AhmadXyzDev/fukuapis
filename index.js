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

app.get('/api/sunoraimaker', async (req, res) => {
  const { description, title = "Fuku", mood = "Sad", style = "Akustik" } = req.query;

  // Validasi input
  if (!description) {
    return res.status(400).json({
      status: false,
      status_code: 400,
      message: 'Missing "description" parameter'
    });
  }

  try {
    // Buat URL API Nekolabs
    const apiUrl = `https://api.nekolabs.web.id/ai/sunora/create?description=${encodeURIComponent(description)}&title=${encodeURIComponent(title)}&mood=${encodeURIComponent(mood)}&style=${encodeURIComponent(style)}`;
    console.log("[DEBUG] Nekolabs Sunora URL:", apiUrl);

    // Fetch ke API Nekolabs
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("[DEBUG] Nekolabs Sunora raw response:", data);

    // Kirim response
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
    // Jika error saat fetch
    res.status(500).json({
      status: false,
      status_code: 500,
      message: "Not found",
      error: error.message
    });
  }
});

app.get('/api/sunoaimaker', async (req, res) => {
  const { description } = req.query;

  if (!description) {
    return res.status(400).json({
      status: false,
      status_code: 400,
      message: 'Missing "description" parameter'
    });
  }

  try {
    const apiUrl = `https://api.nekolabs.web.id/ai/suno-v4/create?description=${encodeURIComponent(description)}`;
    console.log("[DEBUG] fuku Suno URL:", apiUrl);

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("[DEBUG] Fuku Suno raw response:", data);

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
      message: "Gagal menghubungi API Nekolabs (Suno)",
      error: error.message
    });
  }
});

global.egg = "15";
global.nestid = "5";
global.loc = "1";
global.domain = "https://free-panel.brengsek.my.id";
global.apikey = "ptla_6ZMn9lZBwYNQTcGNq41N0mqmf8fbWudtSfmTQpl3nVI";
global.capikey = "ptlc_IymvSfGTtwpTv8ubSd3jnU1pfUaLRFNcHX2e9u1rVcy";

const aksesCount = {
  promo123: 0, // max 5 kali
  "12eXyx": null, // unlimited
  "kodeahi": null,
  "tokenLain": null
};
app.get('/api/cpanel', async (req, res) => {
  const username = req.query.username;
  const paket = req.query.paket;
  const akses = req.query.akses;
  const keyType = req.query.key || "apikey"; // default pakai apikey

const tokenPln = ['12eXyx', 'kodeahi', 'tokenLain'];
if (!akses || !tokenPln.includes(akses)) {
  return res.status(401).json({ status: false, error: 'Beli Akses? Yuk Pm Admin, +6281527100923' });
}

if (akses === "promo123") {
    if (aksesCount.promo123 >= 5) {
      return res.status(403).json({ status:false, error:"Promo habis" });
    }
    aksesCount.promo123++; // tambah hitungan
  }
  if(!username || !paket) 
    return res.status(400).json({ status:false, error:"Missing username or paket query parameter" });

  // Pilih API key
  const apiKey = keyType === "capikey" ? global.capikey : global.apikey;

  // Tentukan limits berdasarkan paket
  let ram, disk, cpu;
  switch(paket.toLowerCase()){
    case "1gb": ram="1000"; disk="1000"; cpu="40"; break;
    case "2gb": ram="2000"; disk="1000"; cpu="60"; break;
    case "3gb": ram="3000"; disk="2000"; cpu="80"; break;
    case "4gb": ram="4000"; disk="2000"; cpu="100"; break;
    case "5gb": ram="5000"; disk="3000"; cpu="120"; break;
    case "6gb": ram="6000"; disk="3000"; cpu="140"; break;
    case "7gb": ram="7000"; disk="4000"; cpu="160"; break;
    case "8gb": ram="8000"; disk="4000"; cpu="180"; break;
    case "9gb": ram="9000"; disk="5000"; cpu="200"; break;
    case "10gb": ram="10000"; disk="5000"; cpu="220"; break;
    case "unlimited":
    case "unli": ram="0"; disk="0"; cpu="0"; break;
    default: return res.status(400).json({ status:false, error:"Paket tidak valid" });
  }

  const email = username + "@fukuapis.dev.id";
  const password = username + crypto.randomBytes(2).toString('hex');

  try {
    // Buat user
    const userRes = await fetch(`${global.domain}/api/application/users`, {
      method:"POST",
      headers:{
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json"
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
    if(userData.errors) return res.status(500).json({ status:false, error:JSON.stringify(userData.errors[0]) });
    const usr_id = userData.attributes.id;

    // Buat server
    const eggRes = await fetch(`${global.domain}/api/application/nests/${global.nestid}/eggs/${global.egg}`, {
      method:"GET",
      headers:{
        "Authorization":"Bearer " + apiKey,
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    });
    const eggData = await eggRes.json();
    const startup_cmd = eggData.attributes.startup;

    const serverRes = await fetch(`${global.domain}/api/application/servers`, {
      method:"POST",
      headers:{
        "Authorization":"Bearer " + apiKey,
        "Content-Type":"application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify({
        name: username,
        description: `Dibuat Oleh Website Api By AhmadXyz`,
        user: usr_id,
        egg: parseInt(global.egg),
        docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
        startup: startup_cmd,
        environment: { INST:"npm", USER_UPLOAD:"0", AUTO_UPDATE:"0", JS_FILE:"index.js", CMD_RUN:"npm start" },
        limits: { memory: ram, swap:0, disk:disk, io:500, cpu:cpu },
        feature_limits: { databases:5, backups:5, allocations:5 },
        deploy:{ locations:[parseInt(global.loc)], dedicated_ip:false, port_range:[] }
      })
    });

    const serverData = await serverRes.json();
    if(serverData.errors) return res.status(500).json({ status:false, error:JSON.stringify(serverData.errors[0]) });

    return res.json({
      status: true,
      username,
      password,
      paket,
      ram,
      cpu,
      disk,
      server_id: serverData.attributes.id,
      domain: global.domain
    });

  } catch(err){
    console.error(err);
    return res.status(500).json({ status:false, error: err.message });
  }
});

app.get('/api/listserverpnl', async (req, res) => {
  const keyType = req.query.key || "apikey";
  const apiKey = keyType === "capikey" ? global.capikey : global.apikey;

  try {
    const serverRes = await fetch(`${global.domain}/api/application/servers`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    const serverData = await serverRes.json();
    if(serverData.errors) return res.status(500).json({ status:false, error: JSON.stringify(serverData.errors[0]) });

    const listServer = serverData.data.map(s => ({
      id: s.attributes.id,
      name: s.attributes.name,
      username: s.attributes.user,
      egg: s.attributes.egg,
      memory: s.attributes.limits.memory,
      disk: s.attributes.limits.disk,
      cpu: s.attributes.limits.cpu,
      created_at: s.attributes.created_at
    }));

    return res.json({
      status: true,
      total: listServer.length,
      servers: listServer
    });

  } catch(err){
    return res.status(500).json({ status:false, error: err.message });
  }
});

app.get('/api/delsrv', async (req, res) => {
  const { id, aksesKey } = req.query;
  const allowedKeys = ['admin1', 'dftr'];
  if (!aksesKey || !allowedKeys.includes(aksesKey)) return res.status(401).json({ status: false, error: 'Invalid aksesKey' });
  if (!id) return res.status(400).json({ status: false, error: 'Missing id parameter' });

  const apiKey = global.apikey;

  try {
    const infoRes = await fetch(`${global.domain}/api/application/servers/${id}`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Accept": "application/json"
      }
    });

    const infoData = await infoRes.json();
    if (!infoRes.ok || infoData.errors) return res.status(404).json({ status: false, error: 'Server tidak ditemukan' });

    const serverName = infoData.attributes.name;

    const delRes = await fetch(`${global.domain}/api/application/servers/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    if (delRes.status === 204) {
      return res.json({ status: true, message: `Server ${serverName} (ID ${id}) berhasil dihapus` });
    } else {
      const errData = await delRes.json();
      return res.status(500).json({ status: false, error: errData });
    }
  } catch (err) {
    return res.status(500).json({ status: false, error: err.message });
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