// Load the cart items when the page loads
window.onload = function () {
    fetch('/PHP/getCartItems.php')
        .then(response => response.json())
        .then(displayCartItems);
};

// Display the cart items
function displayCartItems(items) {
    const container = document.getElementById('cartContainer');
    container.innerHTML = '';

    for (let item of items) {
        let cartItem = document.createElement('div');
        cartItem.className = 'cartItem';

        let image = document.createElement('img');
        image.src = '/PHP/' + item.image;
        cartItem.appendChild(image);

        let name = document.createElement('p');
        name.className = 'name';
        name.textContent = item.name;
        cartItem.appendChild(name);

        let price = document.createElement('p');
        price.className = 'price';
        price.textContent = 'Price: ' + item.price;
        cartItem.appendChild(price);

        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function () {
            fetch('/PHP/removeFromCart.php', {
                method: 'POST',
                body: JSON.stringify({ itemId: item.id })
            })
                .then(() => {
                    // Refresh the cart items
                    fetch('/PHP/getCartItems.php')
                        .then(response => response.json())
                        .then(displayCartItems);
                });
        };
        cartItem.appendChild(removeButton);

        container.appendChild(cartItem);
    }
}

// Handle the checkout button click
document.getElementById('checkoutButton').onclick = function () {
    fetch('/PHP/checkout.php')
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert('Checkout successful!');
                // Clear the cart
                document.getElementById('cartContainer').innerHTML = '';
            } else {
                alert('Checkout failed: ' + result.message);
            }
        });
};
