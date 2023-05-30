// 图片预览
document.getElementById('image').addEventListener('change', function () {
  var reader = new FileReader();
  reader.onload = function (e) {
    document.getElementById('preview').src = e.target.result;
  };
  reader.readAsDataURL(this.files[0]);
});

const form = document.getElementById('issueForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const response = await fetch('http://localhost:3000/PHP/editArtwork.php', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();

  if (result.success) {
    document.getElementById('preview').src = URL.createObjectURL(form.image.files[0]);
    alert('Issue successful');
  } else {
    console.error(result.error);
  }
});
