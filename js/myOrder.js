// Load the cart items when the page loads
function fetchCartItems() {
  fetch('http://localhost:3000/PHP/getCartItems.php')
    .then(response => response.json())
    .then(displayCartItems);
};


// Display the cart items
function displayCartItems(items) {
  const container = document.getElementById('cartContainer');
  container.innerHTML = '';
  let totalNum = 0;

  for (let item of items) {
    let cartItem = document.createElement('div');
    cartItem.className = 'cartItem';
    if (item.status != 2) {
      console.log(item.status)
      continue;
    }
    // BUG: 下面这个请求被浏览器拦截了，目前用另外的方式解决
    let cartItemClickHandler = () => {
      // Send a request to increase the visit count
      fetch('http://localhost:3000/PHP/increaseVisited.php', {
        method: 'POST',
        body: JSON.stringify({ artworkId: item.id })
      });
      // Open the artwork detail page
      window.location.href = 'artworkDetail.html?id=' + item.id;
    };
    cartItem.onclick = cartItemClickHandler;

    let image = document.createElement('img');
    image.src = '/PHP/' + item.image;
    image.style.width = '100px';
    image.style.height = '100px';
    cartItem.appendChild(image);

    let name = document.createElement('h2');
    name.className = 'name';
    name.textContent = item.name;
    cartItem.appendChild(name);


    let price = document.createElement('p');
    price.className = 'price';
    price.textContent = '$' + item.price;
    cartItem.appendChild(price);

    container.appendChild(cartItem);

    totalNum++;
  }
  let total = document.getElementById('total');
  total.textContent = 'Total: ' + totalNum;
}

