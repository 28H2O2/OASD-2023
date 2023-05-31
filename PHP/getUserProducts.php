<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost:3306";
$username = "root";
$password = "gansui";

$conn = new mysqli($servername, $username, $password);
$conn->select_db("oasd");

try {
    if (!isset($_SESSION['username'])) {
        throw new Exception('No username in session');
    }

    $stmt = $conn->prepare('SELECT id, name, author, description, year, genre, size, price, image FROM artwork WHERE username = ?');
    $stmt = $conn->prepare('SELECT id, name, author, description, year, genre, size, price, image FROM artwork WHERE username = ?');
    $stmt->bind_param("s", $_SESSION['username']);
    $stmt->execute();
    // $stmt->execute([$_SESSION['username']]);
    $artworks = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);

    // Change image filename to URL
    foreach ($artworks as &$artwork) {
        $artwork['image'] = 'http://localhost:3000/PHP/' . $artwork['image'];
    }

    echo json_encode(['success' => true, 'artworks' => $artworks]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
