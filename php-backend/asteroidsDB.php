<?php
$dbServername = "localhost:3307"; // Cambiar el puerto dependiendo desde donde se trabaje
$dbUsername = "root";
$dbPassword = "";
$dbName = "id22151473_mathkidonline";

// Establecer conexión con la base de datos
$connection = mysqli_connect($dbServername, $dbUsername, $dbPassword, $dbName);

// Verificar la conexión
if (!$connection) {
    die("Error de conexión: " . mysqli_connect_error());
}

// Obtener los datos del POST
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : '';
$puntaje = isset($_POST['puntaje']) ? $_POST['puntaje'] : '';

// Preparar la consulta SQL utilizando una consulta preparada
$sql = "INSERT INTO asteroids (nombre, puntaje) VALUES (?, ?)";

// Inicializar una declaración preparada
$stmt = mysqli_stmt_init($connection);

// Verificar si la preparación de la consulta es exitosa
if (mysqli_stmt_prepare($stmt, $sql)) {
    // Vincular los parámetros a la declaración preparada
    mysqli_stmt_bind_param($stmt, "ss", $nombre, $puntaje);

    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmt)) {
        echo "Puntuación guardada correctamente";
    } else {
        echo "Error al guardar la puntuación: " . mysqli_error($connection);
    }

    // Cerrar la declaración preparada
    mysqli_stmt_close($stmt);
} else {
    echo "Error al preparar la consulta: " . mysqli_error($connection);
}

// Cerrar la conexión
mysqli_close($connection);
?>
