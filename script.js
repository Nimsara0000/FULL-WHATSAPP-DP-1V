document.getElementById('dpForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const image = document.getElementById('image').files[0];
    const phone = document.getElementById('phone').value;
    const formData = new FormData();
    formData.append('image', image);
    formData.append('phone', phone);
    const response = await fetch('/upload', { method: 'POST', body: formData });
    const data = await response.json();
    if (data.qrCode) {
        QRCode.toCanvas(document.getElementById('qrCode'), data.qrCode, { width: 200 }, (err) => {
            if (err) console.error(err);
        });
    }
});
