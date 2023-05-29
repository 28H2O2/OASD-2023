<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$servername = "localhost:3306";
$username = "root";
$password = "gansui";
$dbname = "oasd";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if (!isset($_SESSION['username'])) {
    throw new Exception('No username in session');
}
$username = $_SESSION['username'];

$name = $_POST["name"];
$author = $_POST["author"];
$description = $_POST["description"];
$year = $_POST["year"];
$genre = $_POST["genre"];
$size = $_POST["size"];
$price = $_POST["price"];
$image = addslashes(file_get_contents($_FILES["image"]["tmp_name"]));

$sql = "INSERT INTO artwork (username, name, author, description, year, genre, size, price, image)
VALUES ('$username', '$name', '$author', '$description', $year, '$genre', '$size', $price, '$image')";

if ($conn->query($sql) === true) {
    echo json_encode(["message" => "Artwork issued successfully"]);
} else {
    echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
}

$conn->close();
