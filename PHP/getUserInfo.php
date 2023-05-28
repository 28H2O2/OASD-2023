<?php
header('Content-Type: application/json');

// 你可以从数据库获取这些信息，这里只是模拟数据
$userInfo = array(
    "username" => "JohnDoe",
    "email" => "john@example.com",
    "phone" => "+123456789",
    "sex" => "Male",
    "nationality" => "American",
);

echo json_encode($userInfo);
