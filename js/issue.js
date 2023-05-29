document.getElementById('image').addEventListener('change', function () {
  var reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('preview').src = e.target.result;
  };
  reader.readAsDataURL(this.files[0]);
});

document.getElementById('issueForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var formData = new FormData(this);
  fetch('http://localhost:3000/PHP/issueArtwork.php', {
    method: 'POST',
    body: formData,
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        alert('Issue failed: ' + data.error);
      } else {
        alert('Issue successful');
      }
    });
});
