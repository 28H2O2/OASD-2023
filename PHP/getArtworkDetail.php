<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost:3306";
$username = "root";
$password = "gansui";

$conn = new mysqli($servername, $username, $password);
$conn->select_db("oasd");

$id = $_GET['id'];
// $id = 1; // for test

try {
    $stmt = $conn->prepare('SELECT * FROM artwork WHERE id = ?');
    $stmt->bind_param('i', $id);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        throw new Exception('No such artwork');
    }

    $artwork = $result->fetch_assoc();
    $artwork['image'] = '' . $artwork['image'];

    echo json_encode(['success' => true, 'artwork' => $artwork]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
