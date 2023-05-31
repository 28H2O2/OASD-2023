<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost:3306";
$username = "root";
$password = "gansui";

$conn = new mysqli($servername, $username, $password);
$conn->select_db("oasd");

$stmt = $conn->prepare('SELECT balance FROM user WHERE username = ?');
$stmt->bind_param('s', $_SESSION['username']);
$stmt->execute();
$result = $stmt->get_result();
$accountInfo = $result->fetch_assoc();

echo json_encode($accountInfo);
