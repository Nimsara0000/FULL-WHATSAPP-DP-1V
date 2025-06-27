<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WhatsApp DP Updater</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>WhatsApp DP Updater</h1>
        <form id="dpForm" enctype="multipart/form-data">
            <input type="file" id="image" accept="image/*" required>
            <input type="text" id="phone" placeholder="WhatsApp Number" required>
            <button type="submit">Generate QR Code</button>
        </form>
        <div id="qrCode"></div>
    </div>
    <script src="script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/qrcode@1.4.4/build/qrcode.min.js"></script>
</body>
</html>
