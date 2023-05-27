function switchForm() {
  // 获取登录表单和注册表单的 DOM 元素
  var loginForm = document.getElementById('loginForm');
  var registerForm = document.getElementById('registerForm');

  // 切换登录表单的显示状态
  if (loginForm.style.display === 'none') {
    loginForm.style.display = 'block';
  } else {
    loginForm.style.display = 'none';
  }

  // 切换注册表单的显示状态
  if (registerForm.style.display === 'none') {
    registerForm.style.display = 'block';
  } else {
    registerForm.style.display = 'none';
  }
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
// 提交时检测手机号码
function validatePhoneNumber() {
  var phoneNumber = document.getElementById("phone").value;
  if (phoneNumber.length !== 11) {
    alert("Please enter a valid 11-digit phone number.");
    return false;
  }
  return true;
}
// 密码强度检测
const passwordInput = document.getElementById('regPassword');
const passwordStrengthMeter = document.querySelector('.password-strength-meter');
const passwordStrengthFill = document.querySelector('.strength-meter-fill');
const passwordStrengthText = document.querySelector('#password-strength-text');

function updatePasswordStrength() {
  const password = passwordInput.value;
  const passwordStrength = calculatePasswordStrength(password);

  passwordStrengthFill.style.width = `${passwordStrength}%`;
  passwordStrengthText.innerText = getPasswordStrengthText(passwordStrength);
}

function getPasswordStrengthText(strength) {
  if (strength < 40) {
    return "Weak - Passwords should include numbers, upper and lower case letters, and special characters.";
  } else if (strength < 60) {
    return "Fair";
  } else if (strength < 80) {
    return "Good";
  } else if (strength < 100) {
    return "Strong";
  } else {
    return "Very strong";
  }
}

function calculatePasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) {
    strength += 1;
  }
  if (password.match(/[a-z]+/)) {
    strength += 1;
  }
  if (password.match(/[A-Z]+/)) {
    strength += 1;
  }
  if (password.match(/[0-9]+/)) {
    strength += 1;
  }
  if (password.match(/[^a-zA-Z0-9]+/)) {
    strength += 1;
  }
  return strength * 20;
}
// 监听密码输入框的输入事件
passwordInput.addEventListener('input', updatePasswordStrength);
// 登录和注册表单的提交
window.onload = function () {
  var loginForm = document.getElementById('loginForm');
  var registerForm = document.getElementById('registerForm');
  // 登录表单的提交
  loginForm.onsubmit = function (e) {
    e.preventDefault();

    var xhr = new XMLHttpRequest();
    var formData = new FormData(loginForm);
    formData.append('login', true);  // 添加登录请求的标识符

    xhr.open('POST', 'http://localhost:3000/PHP/login.php', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        // 登录成功后的操作
        console.log("Login response: ", xhr.responseText);
        if (xhr.responseText === "Login successful.") {
          alert("Login successful.");
          // 跳转到主页
          window.location.href = "http://localhost:3000/HTML/index.html";
        } else {
          alert(xhr.responseText);
        }
      } else {
        // 登录失败的操作
        console.log("Login failed.");
      }
    };
    xhr.send(formData);
  };
  // 注册表单的提交
  registerForm.onsubmit = function (e) {
    e.preventDefault();

    var xhr = new XMLHttpRequest();
    var formData = new FormData(registerForm);
    formData.append('register', true);  // 添加注册请求的标识符

    xhr.open('POST', 'http://localhost:3000/PHP/login.php', true);
    xhr.onload = function () {
      if (xhr.status === 200) {
        // 注册成功后的操作
        // if (xhr.responseText === "Registration successful.") {
        // 	alert("Registration successful.");
        // 	// 切换到登录表单
        // 	switchForm();
        // } else if (xhr.responseText === "Username already exists. Please choose another one!") {
        // 	alert("Username already exists. Please choose another one!");
        // } else if (xhr.responseText === "Passwords do not match.") {
        // 	alert('Passwords do not match!');
        // }
        alert(xhr.responseText);
        console.log("Registration response: ", xhr.responseText);

      } else {
        // 注册失败的操作
        console.log("Registration failed.");
      }
    };
    xhr.send(formData);
  };
};