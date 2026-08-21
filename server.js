import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Rewrite handler for /undangan-resepsi as specified in vercel.json
app.get('/undangan-resepsi*', (req, res) => {
  const subPath = req.originalUrl.replace(/^\/undangan-resepsi/, '');
  res.redirect(301, `https://luxury-undangan-resepsi.vercel.app${subPath}`);
});

// Serve static assets from project root and public folder
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for root or SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

export default app;
