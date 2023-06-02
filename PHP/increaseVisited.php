<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// 定义数据库连接信息
$servername = "localhost:3306";
$username = "root";
$password = "gansui";
$dbname = "oasd";

// 创建数据库连接
$conn = new mysqli($servername, $username, $password, $dbname);

try {
    // if (!isset($_SESSION['username'])) {
    //     throw new Exception('No username in session');
    // }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $artworkId = $_POST['artworkId'];

        // Increase the visit count
        $stmt = $conn->prepare('UPDATE artwork SET visited = visited + 1 WHERE id = ?');
        $stmt->bind_param('i', $artworkId);
        $stmt->execute();
    }
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}

$conn->close();
