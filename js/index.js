let artworks = [];
let currentArtworkIndex = 0;

function loadNewestArtworks() {
    fetch('http://localhost:3000/PHP/newestArtworks.php')
        .then(response => response.json())
        .then(data => {
            artworks = data;
            displayArtwork();
        })
        .catch(error => console.error('Error:', error));
}

function displayArtwork() {
    const carousel = document.getElementById('artworkCarousel');
    carousel.innerHTML = '';
    let artwork = artworks[currentArtworkIndex];

    let img = document.createElement('img');
    img.src = '/PHP/' + artwork.image;
    img.alt = artwork.name;
    carousel.appendChild(img);

    let name = document.createElement('h2');
    name.textContent = artwork.name;
    carousel.appendChild(name);

    let author = document.createElement('h3');
    author.textContent = artwork.author;
    carousel.appendChild(author);

    let price = document.createElement('p');
    price.textContent = artwork.price;
    carousel.appendChild(price);

    carousel.onclick = () => {
        window.location.href = 'artworkDetail.html?id=' + artwork.artworkId;
        incrementVisited(artwork.artworkId);
    };
}

function incrementVisited(artworkId) {
    fetch('http://localhost:3000/PHP/incrementVisited.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'id=' + artworkId
    })
        .catch(error => console.error('Error:', error));
}

function prevArtwork() {
    currentArtworkIndex = (currentArtworkIndex - 1 + artworks.length) % artworks.length;
    displayArtwork();
}

function nextArtwork() {
    currentArtworkIndex = (currentArtworkIndex + 1) % artworks.length;
    displayArtwork();
}
