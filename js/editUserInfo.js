function showUserInfoForEdit() {
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
      document.getElementById('regUsername').value = data.username;
      // document.getElementById('regPassword').value = data.password;
      document.getElementById('regEmail').value = data.email;
      document.getElementById('regPhone').value = data.phone;
      document.getElementById('regSex').value = data.sex;
      document.getElementById('regNationality').value = data.nationality;
      // document.getElementById('regBirthday').value = data.birthday;
      let birthdayElem = document.getElementById('regBirthday');
      let birthdayValue = data.birthday;
      let birthdayDate = new Date(birthdayValue);

      // 使用 toLocaleDateString() 方法只显示日期部分
      let formattedDate = birthdayDate.toLocaleDateString();
      if (formattedDate !== '1900/1/1' || formattedDate !== '1970/1/1') {
        birthdayElem.textContent = formattedDate;
      }

    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const editEvent = document.querySelector('#edit-button');

editEvent.addEventListener('click', async (event) => {
  event.preventDefault();
  let form = document.getElementById('editForm');
  const formData = new FormData(form);

  const response = await fetch('http://localhost:3000/PHP/editUserInfo.php', {
    method: 'POST',
    body: formData
  }).then(() => {
    alert('Edit successful');
    // location.reload();

    // const result = response.json();
    // alert(result)
    // if (result.success) {
    //   // document.getElementById('preview').src = URL.createObjectURL(form.image.files[0]);
    //   alert('Edit successful');
    // } else {
    //   console.error(result.error);
    // }
  });


});

// 提交时检测手机号码
function validatePhoneNumber() {
  var phoneNumber = document.getElementById("phone").value;
  if (phoneNumber.length !== 11) {
    alert("Please enter a valid 11-digit phone number.");
    return false;
  }
  return true;
}

// 手机号码检测
function checkPhoneNumber() {
  var phoneNumber = document.getElementById("phone").value;
  if (phoneNumber.length !== 11) {
    alert("Please enter a valid 11-digit phone number.");
    return false;
  }
  return true;
}