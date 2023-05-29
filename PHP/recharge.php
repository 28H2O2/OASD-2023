<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost:3306";
$username = "root";
$password = "gansui";

$conn = new mysqli($servername, $username, $password);
$conn->select_db("oasd");

$data = json_decode(file_get_contents('php://input'), true);
$amount = $data['amount'];

$stmt = $conn->prepare('UPDATE account SET balance = balance + ? WHERE username = ?');
$stmt->bind_param('ds', $amount, $_SESSION['username']);
$stmt->execute();

$stmt = $conn->prepare('SELECT balance FROM account WHERE username = ?');
$stmt->bind_param('s', $_SESSION['username']);
$stmt->execute();
$result = $stmt->get_result();
$accountInfo = $result->fetch_assoc();

echo json_encode($accountInfo);
