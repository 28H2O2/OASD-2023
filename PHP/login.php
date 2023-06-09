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

// 处理注册请求
if (isset($_POST['register'])) {
    $username = $_POST['regUsername'];
    $password = $_POST['regPassword'];
    $confPassword = $_POST['confPassword'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $sex = $_POST['sex'];
    // $birthday = $_POST['birthday'];
    $birthday = empty($_POST['birthday']) ? '1900-01-01' : $_POST['birthday']; // 如果生日为空，则设置为 1900-01-01
    $nationality = $_POST['nationality'];
    // 验证码
    $captcha = $_POST['captcha'];
    // 检查验证码是否正确
    if ($captcha != $_SESSION['captcha']) {
        echo "Invalid captcha.";
        exit();
    }
    // 检查两次输入的密码是否一致
    if ($password != $confPassword) {
        echo "Passwords do not match.";
    } else {
        // 对密码进行哈希处理
        $hash = password_hash($password, PASSWORD_BCRYPT);

        // 准备 SQL 查询语句，使用占位符 ? 来代替实际的参数值
        $stmt = $conn->prepare("SELECT username FROM user WHERE username = ?");

        // 将参数绑定到语句中，使用 "s" 表示参数类型为字符串，$username 是要绑定的参数值
        $stmt->bind_param("s", $username);

        // 执行查询
        $stmt->execute();

        // 获取结果集
        $result = $stmt->get_result();
        // 检查用户名是否已存在
        if ($result->num_rows > 0) {
            echo "Username already exists. Please choose another one!";
        } else {
            // 准备插入用户信息的 SQL 语句
            $stmt = $conn->prepare("INSERT INTO user (username, password, email, phone, sex, birthday, nationality) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("sssssss", $username, $hash, $email, $phone, $sex, $birthday, $nationality);

            // 执行 SQL 语句
            if ($stmt->execute()) {
                $stmt = $conn->prepare("UPDATE user SET balance = 0 WHERE username = ?");
                $stmt->bind_param("s", $username);
                $stmt->execute();
                echo "Registration successful."; // 注册成功
            } else {
                echo "Error: " . $stmt->error; // 注册失败
            }
        }

    }
}
// 处理登录请求
elseif (isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    // 验证码
    $captcha = $_POST['captcha'];
    // 检查验证码是否正确
    if ($captcha != $_SESSION['captcha']) {
        // echo $captcha;
        // echo "<br>";
        // echo $_SESSION['captcha'];
        echo "Invalid captcha.";
        exit();
    }

    // 准备查询用户信息的 SQL 语句
    // NOTE：这里防止了SQL注入
    $stmt = $conn->prepare("SELECT password FROM user WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();

    // 获取查询结果
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();

    // 如果查询结果为空，输出提示信息
    if (!$row) {
        echo "Username not found.";
    } else {
        // 检查密码是否正确
        if (password_verify($password, $row['password'])) {
            echo "Login successful.";
            // 在登录成功后将用户名存储在 $_SESSION 变量中
            $_SESSION['username'] = $username;
            $username = $_POST['username'];
            // 准备查询用户信息的 SQL 语句
            $stmt = $conn->prepare("SELECT id FROM user WHERE username = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();

            // 获取查询结果
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();

            $_SESSION['user_id'] = $row['id'];

            // 准备查询用户信息的 SQL 语句
            $stmt = $conn->prepare("SELECT birthday FROM user WHERE username = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();

            // 获取查询结果
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();

            $_SESSION['birthday'] = $row['birthday'];
        } else {
            echo "Sorry, password is incorrect.";
        }
    }

}

// 关闭数据库连接
$conn->close();
