window.onload = function () {
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
            <a href="profile.html">Profile</a>
            <a href="#">Settings</a>
            <a href="#">Log out</a>
          </div>
        </span>
        </li>
      </ul>
    </nav>
  `;

  document.getElementById("footer").innerHTML = `
    <div class="info">       
      <p>&copy; 2023 Art Gallery. All Rights Reserved.</p>        
    </div>   
  `;
};


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

