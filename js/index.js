let artworks = [];
let currentArtworkIndex = 0;
let timer = null;
let jumpURL = '';

function loadNewestArtworks() {
    fetch('http://localhost:3000/PHP/newestArtworks.php')
        .then(response => response.json())
        .then(data => {
            artworks = data;
            displayArtwork();
            startAutoSlide();
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
    price.textContent = '$' + artwork.price;
    carousel.appendChild(price);

    carousel.onclick = () => {
        incrementVisited(artwork.id);
        jumpURL = 'artworkDetail.html?id=' + artwork.id;
        // window.location.href = 'artworkDetail.html?id=' + artwork.id;

    };
}

function startAutoSlide() {
    timer = setInterval(nextArtwork, 3000); // Change slide every 3 seconds
}

function stopAutoSlide() {
    clearInterval(timer);
}

function incrementVisited(artworkId) {
    fetch('http://localhost:3000/PHP/increaseVisited.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'id=' + artworkId
    }).then(() => {
        window.location.href = jumpURL;
    })
        .catch(error => console.error('Error:', error));
}

function prevArtwork() {
    stopAutoSlide();
    currentArtworkIndex--;
    if (currentArtworkIndex < 0) {
        currentArtworkIndex = artworks.length - 1;
    }
    displayArtwork();
    startAutoSlide();
}

function nextArtwork() {
    stopAutoSlide();
    currentArtworkIndex++;
    if (currentArtworkIndex >= artworks.length) {
        currentArtworkIndex = 0;
    }
    displayArtwork();
    startAutoSlide();
}
