<?php
session_start();
$db = new PDO('mysql:host=localhost:3306;dbname=oasd;charset=utf8', 'root', 'gansui');
$stmt = $db->prepare("SELECT *,
(SELECT COUNT(*) FROM likes WHERE commentId = comment.id AND username = :username) as hasLiked
FROM comment WHERE artworkId = :artworkId");
$stmt->execute([
    ':artworkId' => $_GET['artworkId'],
    ':username' => $_SESSION['username'], // Replace this with the logged-in username
]);

$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($comments);
