<?php
$servername = "localhost:3306";
$username = "root";
$password = "gansui"; // switch to your own root password
$conn = new mysqli($servername, $username, $password);
if ($conn->connect_error) {
    die("Conn failed: " . $conn->connect_error);
}
echo "Conn established";
// switch into art database
$conn->select_db("art");
// test insertion
$sql = "INSERT INTO artists (FirstName, LastName, YearOfBirth, YearOfDeath)
VALUES ('John', 'Doe', '1980', '2010')";
if ($conn->query($sql) === true) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
// test query
$sql = "SELECT * FROM artists";
$result = $conn->query($sql);
// print out the result
if ($result->num_rows > 0) {
// output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "id: " . $row["ArtistID"] . " - Name: " . $row["FirstName"] . " " .
            $row["LastName"] . "<br>";
    }
} else {
    echo "0 results";
}
