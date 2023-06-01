<?php
session_start();
$username = $_SESSION['username']; // change this to actual username
$data = json_decode(file_get_contents('php://input'), true);
$itemId = $data['itemId'];

try {
    $conn = new PDO("mysql:host=localhost:3306;dbname=oasd", 'root', 'gansui');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare('DELETE FROM shoppingCart WHERE username = :username AND artworkId = :itemId');
    $stmt->execute([':username' => $username, ':itemId' => $itemId]);

} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}

$conn = null;
