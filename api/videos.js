
const CHANNEL_ID = 'UCIFDpPTBFAtVk8OYBNWs1fA';
const CHANNEL_VIDEOS_URL = 'https://www.youtube.com/@hlsoft_sistemacomercial/videos';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

function decodeEntities(s) {
  return String(s)
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

async function viaApi(key) {
  const uploads = 'UU' + CHANNEL_ID.slice(2);
  const out = [];
  let token = '';
  for (let i = 0; i < 10; i++) {
    const url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=' +
      uploads + '&key=' + encodeURIComponent(key) + (token ? '&pageToken=' + token : '');
    const r = await fetch(url);
    if (!r.ok) throw new Error('api ' + r.status);
    const d = await r.json();
    (d.items || []).forEach(function (it) {
      const sn = it.snippet;
      if (sn && sn.resourceId && sn.resourceId.videoId && sn.title !== 'Private video' && sn.title !== 'Deleted video') {
        out.push({ id: sn.resourceId.videoId, title: sn.title });
      }
    });
    token = d.nextPageToken;
    if (!token) break;
  }
  return out;
}

function parseChannelPage(html) {
  const out = [];
  const seen = {};
  const re = /"videoRenderer":\{"videoId":"([\w-]{11})"/g;
  let m;
  while ((m = re.exec(html))) {
    const id = m[1];
    if (seen[id]) continue;
    const chunk = html.slice(m.index, m.index + 3000);
    const t = chunk.match(/"title":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"/);
    if (!t) continue;
    let title = t[1];
    try { title = JSON.parse('"' + t[1] + '"'); } catch (e) { /* mantém o texto cru */ }
    seen[id] = 1;
    out.push({ id: id, title: title });
  }
  return out;
}

async function viaPage() {
  const r = await fetch(CHANNEL_VIDEOS_URL, {
    headers: { 'user-agent': UA, 'accept-language': 'pt-BR,pt;q=0.9', cookie: 'CONSENT=YES+1; SOCS=CAI' }
  });
  if (!r.ok) throw new Error('page ' + r.status);
  return parseChannelPage(await r.text());
}

function parseRss(xml) {
  const out = [];
  const re = /<entry>[\s\S]*?<yt:videoId>([\w-]{11})<\/yt:videoId>[\s\S]*?<title>([\s\S]*?)<\/title>/g;
  let m;
  while ((m = re.exec(xml))) out.push({ id: m[1], title: decodeEntities(m[2]) });
  return out;
}

async function viaRss() {
  const r = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=' + CHANNEL_ID);
  if (!r.ok) throw new Error('rss ' + r.status);
  return parseRss(await r.text());
}

async function getVideos() {
  let videos = [];
  const key = process.env.YT_API_KEY;
  if (key) { try { videos = await viaApi(key); } catch (e) { /* segue para o próximo método */ } }
  if (!videos.length) { try { videos = await viaPage(); } catch (e) { /* segue */ } }
  try {
    const rss = await viaRss();
    const seen = {};
    videos.forEach(function (v) { seen[v.id] = 1; });
    rss.forEach(function (v) { if (!seen[v.id]) { seen[v.id] = 1; videos.push(v); } });
  } catch (e) { /* sem RSS, devolve o que tiver */ }
  return videos;
}

module.exports = async function handler(req, res) {
  const videos = await getVideos();
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(JSON.stringify({ videos: videos }));
};

module.exports.parseChannelPage = parseChannelPage;
module.exports.parseRss = parseRss;
