<?php
session_start();
$db = new PDO('mysql:host=localhost:3306;dbname=oasd;charset=utf8', 'root', 'gansui');

$stmt = $db->prepare("UPDATE comment SET deleted = 1 WHERE id = :id AND username = :username");
$stmt->execute([
    ':id' => $_POST['commentId'],
    ':username' => $_SESSION['username'], // Replace this with the logged-in username
]);

echo json_encode([
    'status' => $stmt->rowCount() > 0 ? 'success' : 'failure',
]);
