window.onload = function () {
    document.getElementById("header").innerHTML = `
    <div class="logo">
      <a href="index.html"><h1>Art Gallery</h1></a>
    </div>
    <nav>
      <ul>
        <li><a href="about.html">About</a></li>
        <li><a href="index.html">Home</a></li>
        <li><a href="login.html">Login</a></li>
        <li><a href="cart.html"><i class="fas fa-shopping-cart"></i></a></li>
        <li class="dropdown">
          <a href="javascript:void(0)" class="dropbtn"><i class="fas fa-user"></i> User<span class="caret"></span></a>
          <div class="dropdown-content">
            <a href="profile.html">Profile</a>
            <a href="#">Settings</a>
            <a href="#">Log out</a>
          </div>
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
