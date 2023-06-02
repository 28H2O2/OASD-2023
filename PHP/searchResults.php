<?php
$host = 'localhost:3306';
$db = 'oasd';
$user = 'root';
$pass = 'gansui';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];
$pdo = new PDO($dsn, $user, $pass, $opt);

$keyword = $_GET['name'] ?? $_GET['author'];
$field = array_key_exists('name', $_GET) ? 'name' : 'author';
$sortField = 'price';
$sortOrder = 'ASC';

if ($_GET['sort']) {
    switch ($_GET['sort']) {
        case 'priceAsc':
            $sortField = 'price';
            $sortOrder = 'ASC';
            break;
        case 'priceDesc':
            $sortField = 'price';
            $sortOrder = 'DESC';
            break;
        case 'yearAsc':
            $sortField = 'year';
            $sortOrder = 'ASC';
            break;
        case 'yearDesc':
            $sortField = 'year';
            $sortOrder = 'DESC';
            break;
        case 'visitedDesc':
            $sortField = 'visited';
            $sortOrder = 'DESC';
            break;
        case 'nameAsc':
            $sortField = 'name';
            $sortOrder = 'ASC';
            break;
    }
}

$page = $_GET['page'] ?? 1;
$resultsPerPage = 5;
$offset = ($page - 1) * $resultsPerPage;

$stmt = $pdo->prepare("SELECT * FROM artwork WHERE $field LIKE ? ORDER BY $sortField $sortOrder LIMIT $resultsPerPage OFFSET $offset");
$stmt->execute(["%$keyword%"]);
$artworks = $stmt->fetchAll();

$stmt = $pdo->prepare("SELECT COUNT(*) FROM artwork WHERE $field LIKE ?");
$stmt->execute(["%$keyword%"]);
$totalCount = $stmt->fetchColumn();

echo json_encode(['artworks' => $artworks, 'totalCount' => $totalCount]);
