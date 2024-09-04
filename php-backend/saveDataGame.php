<?php
// Establecer la conexión con la base de datos
$dbServername = "localhost:3307"; // Cambiar el puerto dependiendo desde donde se trabaje
$dbUsername = "root";
$dbPassword = "";
$dbName = "id22151473_mathkidonline";

// Crear la conexión
$connection = new mysqli($dbServername, $dbUsername, $dbPassword, $dbName);

// Verificar la conexión
if ($connection->connect_error) {
    die("Error de conexión: " . $connection->connect_error);
}

// Nombre de usuario deseado para el nuevo registro en asteroids
$nombre_usuario = $_POST['nombre'];

// Consulta SQL para obtener el ID de usuario correspondiente al nombre de usuario deseado
$sql_usuario = "SELECT id_user FROM users WHERE userName = '$nombre_usuario'";
$resultado_usuario = $connection->query($sql_usuario);

// Verificar si se encontró el usuario
if ($resultado_usuario->num_rows > 0) {
    // Obtener el ID de usuario
    $fila_usuario = $resultado_usuario->fetch_assoc();
    $id_usuario = $fila_usuario["id_user"];

    // Puntuación deseada para el nuevo registro en asteroids
    $puntuacion = $_POST['puntaje'];

    // Consulta SQL para insertar un nuevo registro en la tabla asteroids
    $sql_insert = "INSERT INTO asteroids (id_user, score, date) VALUES ($id_usuario, $puntuacion, NOW())";

    if ($connection->query($sql_insert) === TRUE) {
        echo "Nuevo registro en asteroids creado con éxito";
    } else {
        echo "Error al crear el nuevo registro en asteroids: " . $connection->error;
    }
} else {
    echo "No se encontró el usuario con el nombre deseado";
}

// Cerrar la conexión
$connection->close();
?>
