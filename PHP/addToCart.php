<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

session_start();
$servername = "localhost:3306";
$username = "root";
$password = "gansui";

$conn = new mysqli($servername, $username, $password);
$conn->select_db("oasd");

$artworkId = $_POST['id'];
$username = $_SESSION['username'];

try {
    // Check if the artwork is already sold
    $stmt = $conn->prepare('SELECT status FROM artwork WHERE id = ?');
    $stmt->bind_param('i', $artworkId);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        throw new Exception('No such artwork');
    }

    $artwork = $result->fetch_assoc();
    if ($artwork['status'] === '1') {
        throw new Exception('Artwork is already sold');
    }

    // Check if the artwork is already in the cart
    $stmt = $conn->prepare('SELECT artworkId FROM shoppingCart WHERE username = ? AND artworkId = ?');
    $stmt->bind_param('si', $username, $artworkId);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        throw new Exception('Artwork is already in the cart');
    }

    // Add the artwork to the cart
    $stmt = $conn->prepare('INSERT INTO shoppingCart (username, artworkId) VALUES (?, ?)');
    $stmt->bind_param('si', $username, $artworkId);
    $stmt->execute();

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
