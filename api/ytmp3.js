const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const url = req.query.url;
  const quality = req.query.quality || 128;

  if (!url) {
    return res.status(400).json({
      status: false,
      status_code: 400,
      error: 'Missing "url" query parameter'
    });
  }

  try {
    const apiUrl = `https://api.vreden.my.id/api/v1/download/youtube/audio?url=${encodeURIComponent(url)}&quality=${quality}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data || !data.result || !data.result.download) {
      return res.status(500).json({
        status: false,
        status_code: 500,
        error: 'Failed to fetch audio from API'
      });
    }

    const result = data.result;

    res.json({
      status: true,
      status_code: 200,
      creator: "AhmadXyz-Fukushima",
      result: {
        status: true,
        methode: "GET",
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
    res.status(500).json({
      status: false,
      status_code: 500,
      error: err.message
    });
  }
};