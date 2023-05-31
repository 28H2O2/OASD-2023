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

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['image']['tmp_name'];
            $fileName = $_FILES['image']['name'];
            $destinationPath = 'image/' . $fileName;

            if (move_uploaded_file($fileTmpPath, $destinationPath)) {
                $stmt = $conn->prepare('INSERT INTO artwork (name, author, description, year, genre, size, price, image, username, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
                // $stmt->execute([
                //     $_POST['name'],
                //     $_POST['author'],
                //     $_POST['description'],
                //     $_POST['year'],
                //     $_POST['genre'],
                //     $_POST['size'],
                //     $_POST['price'],
                //     $destinationPath,
                //     $_SESSION['username'],
                // ]);
                $stmt->bind_param('sssississ', $_POST['name'], $_POST['author'], $_POST['description'], $_POST['year'], $_POST['genre'], $_POST['size'], $_POST['price'], $destinationPath, $_SESSION['username'], 0);
                $stmt->execute();

                echo json_encode(['success' => true]);
            } else {
                throw new Exception('Failed to move uploaded file');
            }
        } else {
            throw new Exception('image file not received');
        }
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
