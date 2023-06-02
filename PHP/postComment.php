<?php
session_start();
$db = new PDO('mysql:host=localhost:3306;dbname=oasd;charset=utf8', 'root', 'gansui');
$_LIKES = 0; //初始化点赞数
$stmt = $db->prepare("INSERT INTO comment (artworkId, username, parentId, text, likes) VALUES (:artworkId, :username, :parentId, :text, :likes)");
// $stmt = $db->prepare("INSERT INTO comment (artworkId, username, parentId, text) VALUES (:artworkId, :username, :parentId, :text)");
$stmt->execute([
    ':artworkId' => $_POST['artworkId'],
    ':username' => $_SESSION['username'], // Replace this with the logged-in username
    ':parentId' => $_POST['parentId'] ?? null,
    ':text' => $_POST['text'],
    ':likes' => $_LIKES,
]);

echo json_encode([
    'status' => 'success',
]);
