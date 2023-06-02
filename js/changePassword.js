const changePasswordEvent = document.querySelector('#changePasswordButton');

changePasswordEvent.addEventListener('click', async (event) => {
  event.preventDefault();
  const currentPassword = document.getElementById('currentPassword').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmNewPassword = document.getElementById('confirmNewPassword').value;

  // get the user's birthday from PHP session
  // let userBirthday = "<?php echo $_SESSION['birthday']->format('Ymd'); ?>";
  let userBirthday = document.getElementById('regBirthday').textContent;
  const dateObj = new Date(userBirthday);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  const userBirthdayString = `${year}${month}${day}`;
  console.log(userBirthdayString);

  if (newPassword !== confirmNewPassword) {
    alert('New passwords do not match');
    return;
    // return false;
  }

  if (newPassword.includes(userBirthdayString)) {
    alert('New password should not contain your birthday');
    return;
    // return false;
  }
  changePassword(currentPassword, newPassword);

  // return true;    
})

// function validatechangePasswordForm() {

// }


function changePassword(currentPassword, newPassword) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://localhost:3000/PHP/changePassword.php', true);

  // 创建一个FormData对象
  let formData = new FormData();
  formData.append("currentPassword", currentPassword);
  formData.append("newPassword", newPassword);

  // 注册一个加载结束事件，以便在请求结束后处理响应
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      // 请求成功时执行这里的代码
      alert(xhr.responseText);
    } else {
      // 请求失败时执行这里的代码
      console.error("Failed to change password:", xhr.statusText);
    }
  };

  // 发送FormData对象
  xhr.send(formData);
}
