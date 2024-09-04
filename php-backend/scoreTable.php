<?php
$dbServername = "localhost:3307"; // Cambiar el puerto dependiendo desde donde se trabaje
$dbUsername = "root";
$dbPassword = "";
$dbName = "id22151473_mathkidonline";

// Establecer conexión con la base de datos
$connection = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);

// Verificar conexión
if (mysqli_connect_errno()) {
    echo "Falló la conexión a MySQL: " . mysqli_connect_error();
    exit();
}

// Definir los datos a insertar
$tableUsers = 'users' ?? 'users';
$tableAsteroids = 'asteroids' ?? 'asteroids';
$userName = $_POST['userName'] ?? 'Invitado';
$operation = $_POST['operation'] ?? 'game';

switch ($operation) {
    case 'user':
        scoreTableUser($connection, $tableUsers, $tableAsteroids, $userName);
        break;
    case 'allUsers':
        scoreTableAllUser($connection, $tableUsers, $tableAsteroids, $userName);
        break;
    case 'game':
        scoreTableAllUser($connection, $tableUsers, $tableAsteroids, $userName);
        scoreTableUser($connection, $tableUsers, $tableAsteroids, $userName);
        break;
    default:
        echo "No se ha seleccionado ninguna operación";
        break;
}

// Consulta para revisar un usuario de la base de datos
function scoreTableUser($connection, $tableUsers, $tableAsteroids, $userName){

    $tableUser = "SELECT a.score, a.date
    FROM $tableAsteroids a
    JOIN $tableUsers u ON a.id_user = u.id_user
    WHERE u.userName = ?
    ORDER BY a.date DESC 
    limit 20";

    // Preparar la consulta
    $stmt = mysqli_prepare($connection, $tableUser);
    mysqli_stmt_bind_param($stmt, "s", $userName);
    
    // Ejecutar la consulta
    mysqli_stmt_execute($stmt);
    $resultado_scoreUser = mysqli_stmt_get_result($stmt);

    // Ejecutar la consulta
    if (mysqli_num_rows($resultado_scoreUser) > 0) {

        echo "<h2 style='color: white'>" . $userName . "</h2>";

        // Comienza la tabla HTML
        echo "<table border='1'>";
        echo "<tr><th>Puntos</th><th>Fecha</th></tr>";
        while ($fila = mysqli_fetch_assoc($resultado_scoreUser)) {
            // Imprimir cada fila de la tabla
            echo "<tr>";
            echo "<td>" . $fila["score"] . "</td>";
            // Separar la hora y la fecha con un slash intermedio
            echo "<td>" . substr($fila["date"], 11) . " / " . substr($fila["date"], 0, 10) . "</td>"; 
            echo "</tr>";
        }
    } else {
        echo "<h3>Usuario '$userName' no encontrado</h3> <br>";
        echo "<tr><td colspan='2'>No se encontraron resultados.</td></tr>";
    }

    // Cierra la tabla HTML
     echo "</table>";
}

// Consulta para revisar todos los registros de la base de datos
function scoreTableAllUser($connection, $tableUsers, $tableAsteroids, $userName){
    
    //$tableAsteroids = "SELECT * FROM $tableAsteroids";

    $maxScoreUser = "SELECT u.userName, MAX(a.score) AS max_score
    FROM $tableAsteroids a
    JOIN $tableUsers u ON a.id_user = u.id_user
    GROUP BY u.userName
    ORDER BY max_score DESC limit 20";

    // Preparar la consulta
    $stmt = mysqli_prepare($connection, $maxScoreUser);
    
    // Ejecutar la consulta
    mysqli_stmt_execute($stmt);
    $resultado_scoreAllUsers = mysqli_stmt_get_result($stmt);

    // Ejecutar la consulta
    if (mysqli_num_rows($resultado_scoreAllUsers) > 0) {
        $playerPos = 0;

        // Comienza la tabla HTML
        echo "<table border='1'>";
        echo "<tr><th>#</th><th>Usuario</th><th>Puntos</th></tr>";
        while ($fila = mysqli_fetch_assoc($resultado_scoreAllUsers)) {
            $playerPos++;
            // Imprimir cada fila de la tabla
            echo "<tr>";
            if($fila["userName"] == $userName){
                echo "<td style='font-weight: bold;background: blue'>" . $playerPos . "</td>";
                echo "<td style='font-weight: bold; background: blue'>" . $fila["userName"] . "</td>";
                echo "<td style='font-weight: bold; background: blue'>" . $fila["max_score"] . "</td>";
            }else{
                echo "<td>" . $playerPos . "</td>";
                echo "<td>" . $fila["userName"] . "</td>";
                echo "<td>" . $fila["max_score"] . "</td>";
            }
            echo "</tr>";
        }
    } else {
        echo "<h3>Usuario '$userName' no encontrado</h3> <br>";
        echo "<tr><td colspan='2'>No se encontraron resultados.</td></tr>";
    }

    // Cierra la tabla HTML
     echo "</table>";
}

// Cerrar la conexión
mysqli_close($connection);
?>