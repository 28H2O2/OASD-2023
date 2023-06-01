<?php
require 'db_connection.php';

try {
    $query = $pdo->prepare('SELECT * FROM artwork ORDER BY releaseTime DESC LIMIT 5');
    $query->execute();

    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (PDOException $e) {
    echo $e->getMessage();
}
