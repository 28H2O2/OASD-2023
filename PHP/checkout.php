<?php
session_start();
$username = $_SESSION['username']; // change this to actual username

try {
    $conn = new PDO("mysql:host=localhost:3306;dbname=oasd", 'root', 'gansui');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $conn->beginTransaction();

    $stmt = $conn->prepare('SELECT SUM(artwork.price) FROM shoppingCart INNER JOIN artwork ON shoppingCart.artworkId = artwork.id WHERE shoppingCart.username = :username');
    $stmt->execute([':username' => $username]);
    $totalPrice = $stmt->fetchColumn();

    $stmt = $conn->prepare('SELECT balance FROM user WHERE username = :username');
    $stmt->execute([':username' => $username]);
    $balance = $stmt->fetchColumn();

    if ($balance < $totalPrice) {
        echo json_encode(['success' => false, 'message' => 'Insufficient balance']);
        $conn->rollBack();
        return;
    }

    $stmt = $conn->prepare('UPDATE artwork INNER JOIN shoppingCart ON artwork.id = shoppingCart.artworkId SET artwork.status = 1 WHERE shoppingCart.username = :username');
    $stmt->execute([':username' => $username]);

    $stmt = $conn->prepare('UPDATE user SET balance = balance - :totalPrice WHERE username = :username');
    $stmt->execute([':username' => $username, ':totalPrice' => $totalPrice]);

    $stmt = $conn->prepare('DELETE FROM shoppingCart WHERE username = :username');
    $stmt->execute([':username' => $username]);

    $conn->commit();

    echo json_encode(['success' => true]);

} catch (PDOException $e) {
    $conn->rollBack();
    echo 'Error: ' . $e->getMessage();
}

$conn = null;
