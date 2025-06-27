const express = require('express');
const multer = require('multer');
const { Client } = require('whatsapp-web.js');
const fs = require('fs');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(__dirname));

app.post('/upload', upload.single('image'), async (req, res) => {
    const phone = req.body.phone;
    const imagePath = req.file.path;
    const pairingData = JSON.parse(fs.readFileSync('pairing_file.json')); // ඔබේ pairing file
    const client = new Client({ authStrategy: new LocalAuth({ clientId: pairingData.clientId }) });

    client.on('qr', (qr) => res.json({ qrCode: qr }));
    client.on('ready', async () => {
        await client.setProfilePicture(fs.readFileSync(imagePath));
        console.log('DP updated for', phone);
    });

    client.initialize();
});

app.listen(3000, () => console.log('Server on port 3000'));
