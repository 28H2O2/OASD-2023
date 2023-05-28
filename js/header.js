function loadHeader() {
  document.getElementById("header").innerHTML = `
    <div class="logo">
      <a href="index.html"><h1>Art Gallery</h1></a>
    </div>
    <nav>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="index.html">Home</a></li>
        <li><span id="shoppingCart"><a href="shoppingCart.html">ShoppingCart</a></span></li>
        <li ><span id="loginButton"><a href="login.html">Login</a></span></li>
        <li><span id="logoutButton" ><a href="login.html" onclick="Logout()">Logout</a></span></li>
        <li><a href="cart.html"><i class="fas fa-shopping-cart"></i></a></li>
        <li class="dropdown">
        <span id="dropdown">
          <a href="javascript:void(0)" class="dropbtn"><i class="fas fa-user"></i> <span id="username" style="display: none;"></span> <span class="caret"></span></a>
          <div class="dropdown-content">
            <a href="http://localhost:3000/HTML/userInfo.html">Profile</a>
            <a href="#">Settings</a>
            <a href="#">Log out</a>
          </div>
        </span>
        </li>
      </ul>
    </nav>
    <link rel="stylesheet" type="text/css" href="../CSS/header.css">
  `;

  document.getElementById("footer").innerHTML = `
    <div class="info">       
      <p>&copy; 2023 Art Gallery. All Rights Reserved.</p>        
    </div>   
  `;
};
// 加载用户名
document.addEventListener('DOMContentLoaded', function () {
  // 创建 XMLHttpRequest 对象
  var xhr = new XMLHttpRequest();

  // 设置请求的 URL 和方法
  xhr.open('GET', 'http://localhost:3000/PHP/getUsername.php');

  // 设置请求完成后的回调函数
  xhr.onload = function () {
    if (xhr.status === 200) {
      // 将用户名存储在 span 元素中
      if (xhr.responseText == '') {
        document.getElementById('username').textContent = "未登录";
        document.getElementById('dropdown').style.display = "none";
        document.getElementById('loginButton').style.display = "inline";
        document.getElementById('logoutButton').style.display = "none";
        document.getElementById('shoppingCart').style.display = "none";
      } else {  //* 如果已经登录，则隐藏登录按钮，显示用户名
        document.getElementById('loginButton').style.display = "none";
        document.getElementById('logoutButton').style.display = "inline";
        var username = document.getElementById('username')
        username.style.display = "inline";
        username.textContent = xhr.responseText;

        // document.getElementById('username').textContent = xhr.responseText;
      }
    };
  }
  // 发送 AJAX 请求
  xhr.send();
});

// 处理logout按钮
function Logout() {
  // 添加 click 事件处理程序
  document.getElementById('logoutButton').addEventListener('click', function (event) {
    // 阻止默认行为
    event.preventDefault();

    // 创建 XMLHttpRequest 对象
    var xhr = new XMLHttpRequest();

    // 设置请求的 URL 和方法
    xhr.open('GET', 'http://localhost:3000/PHP/logout.php');

    // 设置请求完成后的回调函数
    xhr.onload = function () {
      if (xhr.status === 200) {
        // 重定向到登录页面
        window.location.href = 'login.html';
        // alert("Logout successful.");
      }
    };

    // 发送 AJAX 请求
    xhr.send();
  });


}

