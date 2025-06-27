const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Upload folder
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Random code generator
function generateCode(length = 6) {
  return crypto.randomBytes(length).toString('hex').substring(0, length);
}

// Storage config with custom filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const code = req.body.code;
    const ext = path.extname(file.originalname);
    cb(null, `${code}${ext}`);
  }
});
const upload = multer({ storage });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Home form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Upload handler
app.post('/upload', upload.single('photo'), (req, res) => {
  const phone = req.body.phone;
  const code = req.body.code;
  const ext = path.extname(req.file.originalname);

  const photoUrl = `/p/${code}`;
  res.send(`
    <h2>✅ Pair Code Created for ${phone}</h2>
    <p>🔗 Share this link: <a href="${photoUrl}">${photoUrl}</a></p>
    <p><img src="/uploads/${code}${ext}" width="200"/></p>
    <a href="/">🔙 Back</a>
  `);
});

// View photo by code
app.get('/p/:code', (req, res) => {
  const code = req.params.code;

  // Search for any file with code.*
  const files = fs.readdirSync(uploadDir);
  const match = files.find(file => file.startsWith(code));

  if (match) {
    res.send(`
      <h2>👤 WhatsApp DP for Code: ${code}</h2>
      <img src="/uploads/${match}" width="300"/>
    `);
  } else {
    res.status(404).send('<h3>❌ Photo not found</h3>');
  }
});

app.listen(PORT, () => {
  console.log('✅ Server running on port', PORT);
});
