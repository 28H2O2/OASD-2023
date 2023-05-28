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

    $stmt = $conn->prepare('SELECT username, email, phone, sex, birthday, nationality FROM user WHERE username = ?');
    $stmt->bind_param('s', $_SESSION['username']); // 's' 表示 string 类型
    $stmt->execute();

    $result = $stmt->get_result(); // 获取查询结果
    $userInfo = $result->fetch_assoc(); // 将结果转化为关联数组

    if (!$userInfo) {
        throw new Exception('User not found');
    }
    // 禁用缓冲区，确保在输出 JSON 数据前没有其他额外的空白字符
    while (ob_get_level()) {
        ob_end_clean();
    }

    echo json_encode($userInfo);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
// 关闭数据库连接
$conn->close();
