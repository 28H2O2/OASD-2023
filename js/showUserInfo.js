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
      // document.getElementById('birthday').textContent = data.birthday;
      let birthdayElem = document.getElementById('birthday');
      let birthdayValue = data.birthday;
      let birthdayDate = new Date(birthdayValue);

      // 使用 toLocaleDateString() 方法只显示日期部分
      let formattedDate = birthdayDate.toLocaleDateString();
      birthdayElem.textContent = formattedDate;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}