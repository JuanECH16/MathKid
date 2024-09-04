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
$table = 'users' ?? 'users';
$userName = $_POST['username'] ?? 'invitadoU';
$name = $_POST['name'] ?? 'invitadoN';
$lastName = $_POST['lastName'] ?? 'invitadoL';
$email = $_POST['email'] ?? 'invitado@invitado.com';
$password = $_POST['password'] ?? 'invitado';
$operation = $_POST['operation'] ?? 'read';
$rememberMe = $_POST['rememberMe'] ?? 0;

if($operation == 'read'){
    echo "<script>console.log('".$rememberMe."');</script>";
}

// Verifica si se añadió el correo del usuario
if(!empty($email)){
    // Valida si esta bien escrito el correo y el nombre del usuario
    validateEmail($email);

    $EmailAndUserExist = checkEmailAndUsernameExistence($connection, $table, $email, $userName);

    switch ($operation) {
        // Crear Usuario
        case 'create':
            if(!$EmailAndUserExist){
                createData($connection, $table, $userName, $name, $lastName, $email, $password);
            }else{
                echo "<h3>El nombre de usuario o el correo ya existe, no se puede crear un nuevo registro </h3>";
            }
            break;
        // Iniciar Sesión
        case 'read':
            if($EmailAndUserExist){
                readData($connection, $table, $email, $password);
            }else{
                echo "<h3>No se encontró el email '".$email."' para mostrar. </h3>";
            }
            break;
        // Recordar Contraseña
        case 'update':
            if($EmailAndUserExist){
                updateData($connection, $table, $email, $password);
            }else{
                echo "<h3>No se encontró el email '".$email."' para actualizar. </h3>";
            }
            break;
        // Borrar cuenta
        case 'delete':
            if($EmailAndUserExist){
                deleteData($connection, $table, $email);
            }else{
                echo "<h3>No se encontró el email '".$email."' para eliminar. </h3>";
            }
            break;
        default:
            echo "<h3>Operación no válida: ".$operation."</h3>";
            break;
    }
}else{
    echo "<br><h3>Campo del correo vacío</h3>";
    return;
}

// Consulta de inserción a la base de datos (Crear Usuario)
function createData($connection, $table, $userName, $name, $lastName, $email, $password){

    // Validar que los campos requeridos no estén vacíos
    if (empty($userName) || empty($name) || empty($lastName) || empty($email) || empty($password)) {
        echo "<h3>Todos los campos son obligatorios</h3> <br>";
        exit(); 
        //throw new Exception("Todos los campos son obligatorios");
    }

    $insertar = "INSERT INTO $table (userName, name, lastName, email, password) VALUES (?, ?, ?, ?, ?)";

    // Preparar la consulta
    $stmt = mysqli_prepare($connection, $insertar);
    mysqli_stmt_bind_param($stmt, "sssss", $userName, $name, $lastName, $email, $password);
    
    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmt)) {
        echo "<br><h3>Datos insertados correctamente</h3>" .
            "Usuario: " . $userName . "<br>" .
            "Nombre: " . $name . "<br>" .
            "Apellido: " . $lastName . "<br>" .
            "Correo: " . $email . "<br>" .
            "Contraseña: " . $password . "<br>";

        readData($connection, $table, $email, $password);
        echo "<script>window.parent.location.href = '/mathkid_online/index.html';</script>";
    } else {
        echo "Error al insertar datos: " . mysqli_error($connection);
    }
}

// Consulta para revisar todos los registros de la base de datos (Iniciar Sesión)
function readData($connection, $table, $email, $password){

    // Validar que los campos requeridos no estén vacíos
    if (empty($email) || empty($password)) {
        echo "<h3>Todos los campos son obligatorios</h3> <br>";
        exit(); 
        //throw new Exception("Todos los campos son obligatorios");
    }

    $seleccionar = "SELECT * FROM $table WHERE email = ? AND password = ?";

    // Preparar la consulta
    $stmt = mysqli_prepare($connection, $seleccionar);
    mysqli_stmt_bind_param($stmt, "ss", $email, $password);
    
    // Ejecutar la consulta
    mysqli_stmt_execute($stmt);
    $resultado_usuario = mysqli_stmt_get_result($stmt);

    // Ejecutar la consulta
    if (mysqli_num_rows($resultado_usuario) > 0) {
        $userName = mysqli_fetch_assoc($resultado_usuario)["userName"];
        echo "<h3>Usuario encontrado</h3> <br>";
        
        echo "<h3 id='name'>Usuario: $userName</h3>";
        echo "
        <script>  
            localStorage.setItem('userLoggedStg', 'true');
            localStorage.setItem('userNameStg', '$userName');
            window.parent.location.href = '/mathkid_online/index.html';
        </script>
        ";
    } else {
        echo "<h3>Correo o contraseña incorrecta</h3> <br>";
    }
}

// Consulta para actualizar los datos específicos a la base de datos (Recordar Contraseña)
function updateData($connection, $table, $email, $password){

    // Validar que los campos requeridos no estén vacíos
    if (empty($email) || empty($password)) {
        echo "<h3>Todos los campos son obligatorios</h3> <br>";
        exit(); 
        //throw new Exception("Todos los campos son obligatorios");
    }

    $actualizar = "UPDATE $table SET password = ? WHERE email = ?";

    // Preparar la consulta
    $stmt = mysqli_prepare($connection, $actualizar);

    // Vincular parámetros
    mysqli_stmt_bind_param($stmt, "ss", $password, $email);
        
    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmt)) {
        echo "Datos actualizados correctamente." . "<br>";
    } else {
        echo "Error al actualizar datos: " . mysqli_error($connection);
    }
}

// Consulta para borrar datos de la base de datos (Borrar cuenta)
function deleteData($connection, $table, $email){

    // Validar que los campos requeridos no estén vacíos
    if (empty($email)) {
        echo "<h3>Todos los campos son obligatorios</h3> <br>";
        exit(); 
        //throw new Exception("Todos los campos son obligatorios");
    }

    $eliminar = "DELETE FROM $table WHERE email = ?";

    // Preparar la consulta
    $stmt = mysqli_prepare($connection, $eliminar);

    // Vincular parámetros
    mysqli_stmt_bind_param($stmt, "s", $email);
    
    // Ejecutar la consulta
    if (mysqli_stmt_execute($stmt)) {
        echo "Datos eliminados correctamente." . "<br>" .
        "Tabla: " . $table . "<br>" .
        "Correo: " . $email . "<br>";
    } else {
        echo "Error al eliminar datos: " . mysqli_error($connection);
    }
}

// Validar el formato del correo electrónico
function validateEmail($email){
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<h3>El formato del correo electrónico no es válido</h3> <br>";
        exit(); // Detiene la ejecución del script
        //throw new Exception("El formato del correo electrónico no es válido");
    }
}

// Consulta si el correo y nombre del usuario existe en la tabla
function checkEmailAndUsernameExistence($connection, $table, $email, $userName){

    // Consulta para verificar si el correo del usuario existe en la tabla
    $consulta_email = "SELECT * FROM $table WHERE email = ? OR userName = ?";
    
    // Preparar la consulta
    $stmt = mysqli_prepare($connection, $consulta_email);
    mysqli_stmt_bind_param($stmt, "ss", $email, $userName);
    
    // Ejecutar la consulta
    mysqli_stmt_execute($stmt);
    $resultado_usuario = mysqli_stmt_get_result($stmt);

    // Verificar si la consulta fue exitosa
    if ($resultado_usuario) {
        // Si se encuentra al menos una fila, el correo del usuario existe
        if (mysqli_num_rows($resultado_usuario) > 0) {
            //echo "<h3>Usuario existe</h3> <br>";
            return true;
        } else {
            //echo "<h3>Usuario no existe</h3> <br>";
            return false;
        }
    } else {
        echo "Error al verificar la existencia del usuario: " . mysqli_error($connection);
        return false;
    }
}

// Cerrar la conexión
mysqli_close($connection);
?>
