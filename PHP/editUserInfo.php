<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

session_start();
$servername = "localhost:3306";
$username = "root";
$password = "gansui";

$conn = new mysqli($servername, $username, $password);
$conn->select_db("oasd");

$username = $_SESSION['username'];

// 处理修改请求
// if (isset($_POST['update'])) {
$email = $_POST['email'];
$phone = $_POST['phone'];
$sex = $_POST['sex'];
$birthday = empty($_POST['birthday']) ? '1900-01-01' : $_POST['birthday']; // 如果生日为空，则设置为 1900-01-01
$nationality = $_POST['nationality'];

// 准备 SQL 查询语句，使用占位符 ? 来代替实际的参数值
$stmt = $conn->prepare("UPDATE user SET email = ?, phone = ?, sex = ?, birthday = ?, nationality = ? WHERE username = ?");

// 将参数绑定到语句中，使用 "ssssss" 表示参数类型为字符串，$email, $phone, $sex, $birthday, $nationality, $username 是要绑定的参数值
$stmt->bind_param("ssssss", $email, $phone, $sex, $birthday, $nationality, $username);

// 执行更新
if ($stmt->execute()) {
    echo "Update successful."; // 更新成功
} else {
    echo "Error: " . $stmt->error; // 更新失败
}
// }
