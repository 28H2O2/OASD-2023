function showUserInfo() {
  console.log("window.onload");
  fetch('http://localhost:3000/PHP/getUserInfo.php', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById('showUsername').textContent = data.username;
      document.getElementById('email').textContent = data.email;
      document.getElementById('phone').textContent = data.phone;
      document.getElementById('sex').textContent = data.sex;
      document.getElementById('nationality').textContent = data.nationality;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}