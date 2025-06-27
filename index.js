const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;

// Make sure uploads folder exists
const uploadDir = path.join(__dirname, 'public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/upload', upload.single('photo'), (req, res) => {
  const phone = req.body.phone;
  const filePath = req.file ? '/uploads/' + req.file.filename : null;

  console.log('Received number:', phone);
  console.log('Saved file at:', filePath);

  res.send(`
    <h2>✅ DP submitted for: ${phone}</h2>
    <p>🖼️ Image saved at: <code>${filePath}</code></p>
    <a href="/">🔙 Go Back</a>
  `);
});

app.listen(PORT, () => {
  console.log('✅ Server running on port', PORT);
});
