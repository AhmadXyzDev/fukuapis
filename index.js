// index.js (Main server file)
const express = require('express');
const path = require('path');
const { fromBuffer } = require('file-type');
const FormData = require("form-data");
const axios = require("axios");
const crypto = require('crypto');
const cheerio = require('cheerio');
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
global.domain = "https://fukushima.privateeserverr.my.id";
global.apikey = "ptla_rr5ll4S3bSMgaee2wlD6OT3TK8yVUm0ddk8W11idwnf";
global.capikey = "ptlc_tKqcJQhrT9UMtJZvacR3QTqZIN72NrYYoXjWKCuchXs";

const aksesCount = {
  proc: 0, // max 5 kali
  "pantat": null, // unlimited
  "bulitai": null,
  "scritpkuanj": null
};
app.get('/api/cpanel', async (req, res) => {
  const username = req.query.username;
  const paket = req.query.paket;
  const akses = req.query.akses;
  const keyType = req.query.key || "apikey"; // default pakai apikey

const tokenPln = ['babibune', 'arahkuc', 'bulucombik'];
if (!akses || !tokenPln.includes(akses)) {
  return res.status(401).json({ status: false, error: 'Yah:)... key salah atau voucher telah mencapai batas! silahkan buy akses ke +6281527100923 - ahmadXyz' });
}

if (akses === "proc") {
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

app.get('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'en-US-AdamMultilingualNeural', speed = 1, pitch = 0 } = req.query;

    if (!text) return res.status(400).json({ status: false, message: 'Parameter "text" wajib diisi' });

    const { data: voices } = await axios.get('https://raw.githubusercontent.com/rynn-k/idk/refs/heads/main/json/ondoku-voice.json');
    if (!voices.includes(voice)) {
      return res.status(400).json({ 
        status: false, 
        message: `Voice tidak valid. Gunakan salah satu dari:\n${voices.join(', ')}`
      });
    }

    if (speed < 0.3 || speed > 4) return res.status(400).json({ status: false, message: 'Min speed: 0.3, Max speed: 4' });
    if (pitch < -20 || pitch > 20) return res.status(400).json({ status: false, message: 'Min pitch: -20, Max pitch: 20' });

    const rynn = await axios.post('https://ondoku3.com/en');
    const $ = cheerio.load(rynn.data);
    const token = $('input[name="csrfmiddlewaretoken"]').attr('value');

    const form = new FormData();
    form.append('text', text);
    form.append('voice', voice);
    form.append('speed', speed.toString());
    form.append('pitch', pitch.toString());

    const { data } = await axios.post('https://ondoku3.com/en/text_to_speech/', form, {
      headers: {
        cookie: rynn.headers['set-cookie'].join('; '),
        origin: 'https://ondoku3.com',
        referer: 'https://ondoku3.com/en/',
        'x-csrftoken': token,
        'x-requested-with': 'XMLHttpRequest',
        ...form.getHeaders()
      }
    });

    res.json({
      status: true,
      api: 'Fuku-APi',
      service: 'Ondoku TTS',
      status_code: 200,
      voice,
      speed,
      pitch,
      result: data
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      status_code: 500,
      message: error.message
    });
  }
});

app.get('/api/qwentts', async (req, res) => {
  try {
    const { text, voice = 'Dylan' } = req.query
    const _voice = ['Dylan', 'Sunny', 'Jada', 'Cherry', 'Ethan', 'Serena', 'Chelsie']

    if (!text) return res.status(400).json({ status: false, message: 'Parameter "text" wajib diisi' })
    if (!_voice.includes(voice)) return res.status(400).json({ status: false, message: `Voice tidak valid. Gunakan salah satu dari: ${_voice.join(', ')}` })

    const session_hash = Math.random().toString(36).substring(2)

    await axios.post('https://qwen-qwen-tts-demo.hf.space/gradio_api/queue/join?', {
      data: [text, voice],
      event_data: null,
      fn_index: 2,
      trigger_id: 13,
      session_hash
    })

    const { data } = await axios.get(`https://qwen-qwen-tts-demo.hf.space/gradio_api/queue/data?session_hash=${session_hash}`)

    let result = null
    const lines = data.split('\n\n')
    for (const line of lines) {
      if (line.startsWith('data:')) {
        const d = JSON.parse(line.substring(6))
        if (d.msg === 'process_completed') {
          result = d.output.data[0].url
          break
        }
      }
    }

    if (!result) throw new Error('Gagal memproses TTS dari server Qwen')

    res.json({
      status: true,
      api: 'Fuku-APi',
      status_code: 200,
      service: 'Qwen TTS',
      voice,
      result
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      status_code: 500,
      message: error.message
    })
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

class GridPlus {
  constructor() {
    this.ins = axios.create({
      baseURL: 'https://api.grid.plus/v1',
      headers: {
        'user-agent': 'Mozilla/5.0 (Android 15; Mobile; SM-F958; rv:130.0) Gecko/130.0 Firefox/130.0',
        'X-AppID': '808645',
        'X-Platform': 'h5',
        'X-Version': '8.9.7',
        'X-SessionToken': '',
        'X-UniqueID': this.uid(),
        'X-GhostID': this.uid(),
        'X-DeviceID': this.uid(),
        'X-MCC': 'id-ID',
        sig: `XX${this.uid() + this.uid()}`
      }
    });
  }

  uid() {
    return crypto.randomUUID().replace(/-/g, '');
  }

  form(dt) {
    const form = new FormData();
    Object.entries(dt).forEach(([key, value]) => {
      form.append(key, String(value));
    });
    return form;
  }

  async upload(buff, method) {
    try {
      if (!Buffer.isBuffer(buff)) throw new Error('data is not buffer!');
      const { mime, ext } = (await fromBuffer(buff)) || {};
      const d = await this.ins.post('/ai/web/nologin/getuploadurl', this.form({
        ext, method
      })).then(i => i.data);
      await axios.put(d.data.upload_url, buff, {
        headers: {
          'content-type': mime
        }
      });
      return d.data.img_url;
    } catch (e) {
      throw new Error('Gagal upload gambar ke GridPlus');
    }
  }

  async task({ path, data, sl = () => false }) {
    const [start, interval, timeout] = [Date.now(), 3000, 60000];
    return new Promise(async (resolve, reject) => {
      const check = async () => {
        if (Date.now() - start > timeout) {
          return reject(new Error(`Polling timed out`));
        }
        try {
          const dt = await this.ins({
            url: path,
            method: data ? 'POST' : 'GET',
            ...(data ? { data } : {})
          });
          if (!!dt.errmsg?.trim()) {
            reject(new Error(`API Error: ${dt.errmsg}`));
          }
          if (!!sl(dt.data)) {
            return resolve(dt.data);
          }
          setTimeout(check, interval);
        } catch (error) {
          reject(error);
        }
      };
      check();
    });
  }

  async edit(buff, prompt) {
    try {
      const up = await this.upload(buff, 'wn_aistyle_nano');
      const dn = await this.ins.post('/ai/nano/upload', this.form({
        prompt, url: up
      })).then(i => i.data);
      if (!dn.task_id) throw new Error('Task ID tidak ditemukan');
      const res = await this.task({
        path: `/ai/nano/get_result/${dn.task_id}`,
        sl: (dt) => dt.code === 0 && !!dt.image_url,
      });
      return res.image_url;
    } catch (e) {
      throw new Error('Gagal memproses AI: ' + e.message);
    }
  }
}

// ------------------- API /api/nanobanana -------------------
app.get("/api/nanobanana", async (req, res) => {
  const { prompt, image, apikeyFuku } = req.query;
  const validKeys = ["mbwq", "xyz123", "ahmadkey"];

  if (!apikeyFuku || !validKeys.includes(apikeyFuku)) {
    return res.status(403).json({
      status: false,
      creator: "FUKU-AHMADXYZ",
      message: "Apikey tidak valid atau tidak disertakan.",
    });
  }

  if (!image) {
    return res.status(400).json({
      status: false,
      creator: "FUKU-AHMADXYZ",
      message: "tolol link gambarnya mana",
    });
  }
  try {
    const response = await fetch(image);
    if (!response.ok) {
      return res.status(404).json({
        status: false,
        creator: "FUKU-AHMADXYZ",
        message: "404 Not Found - Gagal ambil gambar dari URL",
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const nano = new GridPlus();
    const img = await nano.edit(buffer, prompt || "stylize masterpiece");

    if (!img) {
      return res.status(500).json({
        status: false,
        creator: "FUKU-AHMADXYZ",
        message: "Terjadi kesalahan internal saat memproses gambar.",
      });
    }

    return res.json({
      status: true,
      creator: "FUKU-AHMADXYZ",
      prompt: prompt || "stylize masterpiece",
      result: img,
    });
  } catch {
    return res.status(500).json({
      status: false,
      creator: "FUKU-AHMADXYZ",
      message: "Terjadi kesalahan saat memproses NanoBanana",
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