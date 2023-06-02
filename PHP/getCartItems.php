<?php
session_start();
$username = $_SESSION['username']; // change this to actual username

try {
    $conn = new PDO("mysql:host=localhost:3306;dbname=oasd", 'root', 'gansui');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare('SELECT artwork.*, shoppingCart.status FROM shoppingCart INNER JOIN artwork ON shoppingCart.artworkId = artwork.id WHERE shoppingCart.username = :username');
    $stmt->execute([':username' => $username]);

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}

$conn = null;
