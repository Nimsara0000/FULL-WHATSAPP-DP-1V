
const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "dp_" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Ensure uploads directory exists
const fs = require("fs");
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

app.post("/upload", upload.single("dp"), (req, res) => {
  const phone = req.body.phone;
  const dpPath = req.file.path;

  console.log("Received number:", phone);
  console.log("Saved DP at:", dpPath);

  // Simulate payment and automation trigger
  res.send(\`
    <h2>Payment successful ✅</h2>
    <p>WhatsApp Number: \${phone}</p>
    <p>DP uploaded: \${req.file.filename}</p>
    <p>Automation running... (simulate)</p>
    <a href="/">Back</a>
  \`);
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
