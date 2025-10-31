// api/tobase64.js (Modular handler for the endpoint, though not strictly needed yet)
// You can require this in index.js if you want to modularize
module.exports = (req, res) => {
  const text = req.query.text;
  if (!text) {
    return res.status(400).json({ error: 'Missing "text" query parameter' });
  }
  const base64 = Buffer.from(text).toString('base64');
  res.json({ original: text, base64 });
};