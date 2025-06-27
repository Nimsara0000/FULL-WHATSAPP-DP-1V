<form id="dpForm" action="/upload" method="post" enctype="multipart/form-data">
  <label>📞 Phone Number:</label><br>
  <input type="text" name="phone" required><br><br>

  <label>🖼️ Upload DP Image:</label><br>
  <input type="file" name="photo" accept="image/*" required><br><br>

  <input type="hidden" name="code" id="code">
  <button type="submit">🚀 Submit</button>
</form>

<script>
  document.getElementById("dpForm").addEventListener("submit", function (e) {
    const code = Math.random().toString(36).substring(2, 8);
    document.getElementById('code').value = code;
  });
</script>
