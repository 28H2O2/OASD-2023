<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
// Start a session (if one has not already been started)
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
// 定义数据库连接信息
$servername = "localhost:3306";
$username = "root";
$password = "gansui";

// 创建数据库连接
$conn = new mysqli($servername, $username, $password);

// 检查连接是否成功
if ($conn->connect_error) {
    die("Conn failed: " . $conn->connect_error);
}

// 输出连接成功信息
// echo "Conn established";

// 切换到指定数据库
$conn->select_db("oasd");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $currentPassword = $_POST['currentPassword'];
    $newPassword = $_POST['newPassword'];

    // Replace with the actual logic to validate the current password
    // and update the password in the database
    $stmt = $conn->prepare("SELECT password FROM user WHERE username = ?");
    $stmt->bind_param("s", $_SESSION['username']);
    $stmt->execute();
    // $user = $stmt->fetch(PDO::FETCH_ASSOC);
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    if (password_verify($currentPassword, $row['password'])) {
        $newPasswordHash = password_hash($newPassword, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("UPDATE user SET password = ? WHERE id = ?");
        $stmt->bind_param('si', $newPasswordHash, $_SESSION['user_id']);
        $stmt->execute();

        echo 'Password successfully changed';
    } else {
        echo 'Current password is incorrect';
    }
}
