<?php
session_start();
$db = new PDO('mysql:host=localhost:3306;dbname=oasd;charset=utf8', 'root', 'gansui');

// Check if the user has already liked this comment
$stmt = $db->prepare("SELECT * FROM likes WHERE commentId = :commentId AND username = :username");
$stmt->execute([
    ':commentId' => $_POST['commentId'],
    ':username' => $_SESSION['username'],
]);
$like = $stmt->fetch();

if ($like) {
    // The user has already liked this comment, so unlike it
    $stmt = $db->prepare("DELETE FROM likes WHERE id = :id");
    $stmt->execute([
        ':id' => $like['id'],
    ]);

    // Decrement the like count
    $stmt = $db->prepare("UPDATE comment SET likes = likes - 1 WHERE id = :id");
    $stmt->execute([
        ':id' => $_POST['commentId'],
    ]);

    $hasLiked = false;
} else {
    // The user has not liked this comment, so like it
    $stmt = $db->prepare("INSERT INTO likes (commentId, username) VALUES (:commentId, :username)");
    $stmt->execute([
        ':commentId' => $_POST['commentId'],
        ':username' => $_SESSION['username'],
    ]);

    // Increment the like count
    $stmt = $db->prepare("UPDATE comment SET likes = likes + 1 WHERE id = :id");
    $stmt->execute([
        ':id' => $_POST['commentId'],
    ]);

    $hasLiked = true;
}

// Get the new like count
$stmt = $db->prepare("SELECT likes FROM comment WHERE id = :id");
$stmt->execute([
    ':id' => $_POST['commentId'],
]);
$comment = $stmt->fetch();

echo json_encode([
    'status' => 'success',
    'newLikeCount' => $comment['likes'],
    'hasLiked' => $hasLiked,
]);
