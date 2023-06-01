let thisId = 0;

document.getElementById('addToCartButton').addEventListener('click', async function () {
    // const id = document.getElementById('artworkId').textContent.split(' ')[1];
    const id = thisId;
    console.log(`Add artwork ${id} to cart`)
    // const response = await fetch(`http://localhost:3000/PHP/addToCart.php?id=${id}`, { method: 'POST' });
    const response = await fetch('http://localhost:3000/PHP/addToCart.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${id}`
    });
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
        // document.getElementByTd('artworkId').textContent = 'ID: ' + artwork.id; //这个不展示在页面上
        thisId = artwork.id;
        document.getElementById('artworkName').textContent = artwork.name;
        document.getElementById('artworkAuthor').textContent = 'Author: ' + artwork.author;
        document.getElementById('artworkPrice').textContent = 'Price: $' + artwork.price;
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
