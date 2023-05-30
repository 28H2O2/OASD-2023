<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// 定义数据库连接信息
$servername = "localhost:3306";
$username = "root";
$password = "gansui";

// 创建数据库连接
$conn = new mysqli($servername, $username, $password);
// 切换到指定数据库
$conn->select_db("oasd");
try {
    if (!isset($_SESSION['username'])) {
        throw new Exception('No username in session');
    }
    // $stmt = $conn->prepare('SELECT * FROM artwork WHERE username = ?');
    // $stmt->execute([$_SESSION['username']]);
    // $products = $stmt->fetchAll();
    // $stmt = $conn->prepare('SELECT * FROM artwork WHERE username = ?');
    // $stmt->bind_param('s', $_SESSION['username']);
    // $stmt->execute();
    // $result = $stmt->get_result();
    // $products = $result->fetch_all(MYSQLI_ASSOC);
    // // $products = $result->fetch_assoc();
    // echo json_encode($products);
    $sql = "SELECT * FROM artwork WHERE username = '{$_SESSION['username']}'";

    $result = mysqli_query($conn, $sql);

    if (!$result) {
        die(mysqli_error($conn)); // 检查查询是否出错
    }

    $products = mysqli_fetch_all($result, MYSQLI_ASSOC);

    echo json_encode($products);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
