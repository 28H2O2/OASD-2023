<!DOCTYPE html>
<html>

<head>
  <title>Display Data</title>
</head>

<body>
  <table>
    <tr>
      <th>ID</th>
      <th>Username</th>
      <th>Password</th>
    </tr>
    <?php
                $servername = "localhost:3306";
                $username = "root";
                $password = "gansui";
                $dbname = "oasd";

                // Create connection
                $conn = new mysqli($servername, $username, $password, $dbname);

                // Check connection
                if ($conn->connect_error) {
                    die("Connection failed: " . $conn->connect_error);
                }

                $sql = "SELECT id, user_name, password FROM user";
                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    // output data of each row
                    while($row = $result->fetch_assoc()) {
                        echo "<tr><td>" . $row["id"]. "</td><td>" . $row["user_name"] . "</td><td>" . $row["password"] . "</td></tr>";
                    }
                } else {
                    echo "0 results";
                }
                $conn->close();
            ?>
  </table>
</body>

</html>