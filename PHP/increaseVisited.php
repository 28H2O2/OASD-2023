<?php
// Fetch the request data
$data = json_decode(file_get_contents('php://input'), true);
$artworkId = $data['artworkId'];

try {
    $conn = new PDO("mysql:host=localhost:3306;dbname=oasd", 'root', 'gansui');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Increase the visit count
    $stmt = $conn->prepare('UPDATE artwork SET visited = visited + 1 WHERE id = :id');
    $stmt->execute([':id' => $artworkId]);

} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}

$conn = null;
