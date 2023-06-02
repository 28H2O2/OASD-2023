<?php
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
    $stmt = $conn->prepare('SELECT * FROM artwork WHERE status = 0 ORDER BY visited DESC LIMIT 5');
    $stmt->execute();

    $result = $stmt->get_result(); // 获取查询结果
    $artworks = [];
    while ($row = $result->fetch_assoc()) {
        $artworks[] = $row;
    }

    // 禁用缓冲区，确保在输出 JSON 数据前没有其他额外的空白字符
    while (ob_get_level()) {
        ob_end_clean();
    }

    echo json_encode($artworks);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}