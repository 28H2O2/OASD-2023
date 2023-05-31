document.getElementById('addToCartButton').addEventListener('click', async function () {
    const response = await fetch(`http://localhost:3000/PHP/addToCart.php?id=${id}`, { method: 'POST' });
    const result = await response.json();

    if (result.success) {
        alert('Successfully added to cart!');
    } else {
        console.error(result.error);
        alert('Failed to add to cart!');
    }
});


const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function getArtworkDetail() {
    const response = await fetch(`http://localhost:3000/PHP/getArtworkDetail.php?id=${id}`);
    const result = await response.json();

    if (result.success) {
        const artwork = result.artwork;
        document.getElementById('artworkImage').src = 'http://localhost:3000/PHP/' + artwork.image;
        document.getElementById('artworkName').textContent = artwork.name;
        document.getElementById('artworkAuthor').textContent = 'Author: ' + artwork.author;
        document.getElementById('artworkPrice').textContent = 'Price: ' + artwork.price;
        document.getElementById('artworkStatus').textContent = 'Status: ' + (artwork.status === '0' ? 'Available' : 'Sold Out');
        document.getElementById('artworkDate').textContent = 'Release Time: ' + new Date(artwork.releaseTime).toLocaleDateString();
        document.getElementById('artworkUsername').textContent = 'Publisher: ' + artwork.username;
        document.getElementById('artworkYear').textContent = 'Year: ' + artwork.year;
        document.getElementById('artworkSize').textContent = 'Size: ' + artwork.size;
        document.getElementById('artworkGenre').textContent = 'Genre: ' + artwork.genre;
        document.getElementById('artworkDescription').textContent = 'Description: ' + artwork.description;
    } else {
        console.error(result.error);
    }
}

getArtworkDetail();
