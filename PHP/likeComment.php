<?php
$db = new PDO('mysql:host=localhost:3306;dbname=oasd;charset=utf8', 'root', 'gansui');
  
  // Increment the like count
  $stmt = $db->prepare("UPDATE comment SET likes = likes + 1 WHERE id = :id");
  $stmt->execute([
    ':id' => $_POST['commentId']
  ]);

  echo json_encode(['status' => 'success']);
?>
