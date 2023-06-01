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
  let totalPrice = 0;

  for (let item of items) {
    let cartItem = document.createElement('div');
    cartItem.className = 'cartItem';
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
    cartItem.appendChild(image);

    let name = document.createElement('h2');
    name.className = 'name';
    name.textContent = item.name;
    cartItem.appendChild(name);

    let status = document.createElement('p');
    status.className = 'status';
    status.textContent = item.status == 1 ? 'SOLD OUT' : '';
    status.style.color = 'red';
    cartItem.appendChild(status);

    let price = document.createElement('p');
    price.className = 'price';
    price.textContent = '$' + item.price;
    cartItem.appendChild(price);

    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function (event) {
      // Disable the cart item click handler
      cartItem.onclick = null;
      if (confirm('Are you sure you want to remove this item from your cart?') === false) {
        return;
      }
      event.preventDefault(); // 阻止默认的跳转行为
      fetch('http://localhost:3000/PHP/removeFromCart.php', {
        method: 'POST',
        body: JSON.stringify({ itemId: item.id })
      })
        .then(() => {
          // Refresh the cart items
          fetch('http://localhost:3000/PHP/getCartItems.php')
            .then(response => response.json())
            .then(displayCartItems);
        });
    };
    cartItem.appendChild(removeButton);

    container.appendChild(cartItem);
    if (item.status == 1) {
      continue; // Skip the sold out items
    }
    totalPrice += parseInt(item.price);
    console.log(`totalPrice: ${totalPrice}`);
  }
  let total = document.getElementById('total');
  total.textContent = 'Total: $' + totalPrice;
}

// Handle the checkout button click
document.getElementById('checkoutButton').onclick = function () {
  if (confirm('Are you sure you want to checkout?') === false) {
    return;
  }
  fetch('http://localhost:3000/PHP/checkout.php')
    .then(response => response.json())
    .then(result => {
      if (result.success) {
        alert('Checkout successful!');
        // Clear the cart
        document.getElementById('cartContainer').innerHTML = '';
        displayCartItems([]);
      } else {
        alert('Checkout failed: ' + result.message);
      }
    });
};
