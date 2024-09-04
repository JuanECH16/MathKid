document.addEventListener("DOMContentLoaded", function() {
    let isOnGame = false; // Indica si se esta dentro del contenedor del juego
    let score = 0;
    const scoreSpace = document.getElementById("score");
    let scoreSent = false; // Variable para controlar si la puntuación ya se ha enviado
    let win = false;
    let scoreToWin = 15;
    let playerAlive = true;
    let enemyAppeared = false;
    let growInterval; // Variable para almacenar el intervalo de crecimiento del enemigo
    let moveInterval; // Variable para almacenar el intervalo de movimiento del enemigo
    let currentLevel = 1; // Nivel actual, por defecto es 1 (suma)
    //let currentDifficulty = 1; // Dificultad actual, por defecto es 1 (1er grado)
    let endless = false; // Si el modo de juego es infinito
    const selectedLevel = document.getElementById('level-selector');
    const currentLevelSpace = document.getElementById('level');
    //const selectedDifficulty = document.getElementById('difficulty-selector');
    //let difficultyLevel = 0;
    let gamePaused = false; // Variable para controlar si el juego está pausado o no
    const pauseContainer = document.getElementById("pause-container");
    const pauseBtn = document.getElementById("pause-btn");
    const gameContainer = document.getElementById('game-container'); // Obtener el contenedor del juego
    let gameActive = false; // Variable para indicar si el juego está activo o no
    let nameUser = "";
    let pausedSounds = []; // Array para almacenar los sonidos pausados
    const ui_inGame = document.getElementById('ui-inGame'); // Interfaz en juego
    const enemy = document.getElementById('enemy'); // Obtener el enemigo del juego
    const enemyContent = document.getElementById('enemy-content');
    const enemyInput = document.querySelector('#enemy-content input');
    const player = document.getElementById('player'); // Obtener el player del juego
    const answer_container = document.getElementById('answer-container'); // Obtener el answer_container del juego
    const userNameGameId = document.getElementById('userNameGame'); // Obtener el userNameGameId del juego
    const backgroundMusic = document.getElementById('background-music'); // Obtener el backgroundMusic del juego
    const levelSelectorContainer = document.getElementById('level-selector-container');
    let posUserView = 0; // Ventanas dentro del juego
    let tutorial = true; // Estado del tutorial
    const tutorial_container = document.getElementById("tutorial-container"); // Contenedor del tutorial
    const win_container = document.getElementById("win-container"); // Contenedor del win
    const enter_text = document.getElementById("enter-text"); // Contenedor del Enter key

    resetGame();

    stopAndResetBackgroundMusic();

    generateSkinRandomEnemy();

    gamePauseSystem(false);

    // Obtener nombre del usuario
    nameUser = localStorage.getItem('userNameStg');
    
    // Cambia el nombre dentro de la página del juego
    if(nameUser !== ""){
        userNameGameId.innerHTML = "Usuario actual: " + nameUser;
    }else{
        nameUser = "Invitado";
        userNameGameId.innerHTML = "Usuario actual: " + nameUser;
        localStorage.setItem('userNameStg', nameUser);
    }

    pauseContainer.style.display = 'none';

    tutorial_container.style.display = 'none';

    win_container.style.display = 'none';

    ui_inGame.style.display = 'none';

    answer_container.style.display = 'none';
    answer_container.style.visibility = 'visible';

    // Ocultar enemigo al principio
    enemy.style.visibility = 'hidden';

    // Establecer dimensiones fijas para el contenedor del juego y todos sus elementos
    gameContainer.style.width = '500px'; // Por ejemplo, 600px de ancho
    gameContainer.style.height = '400px'; // Por ejemplo, 400px de alto

    enter_text.style.display = "none";

    // Llamar a la función para ajustar el tamaño del contenedor del juego cuando se carga la página
    adjustGameContainerSize();

    // Escuchar el evento de cambio en el tamaño de la ventana del navegador y ajustar el tamaño del contenedor del juego en consecuencia
    window.addEventListener('resize', adjustGameContainerSize);

    // Quitar el foco del contenedor del juego
    gameContainer.blur();

    // Evento de clic en cualquier parte de la página
    /*document.addEventListener('click', function(event) {
        const clickedElement = event.target;
        // Verificar si el elemento clicado no está dentro del contenedor del juego y el juego no está pausado
        if (!gameContainer.contains(clickedElement) && !gamePaused) {
            removeFocus(); // Quitar el enfoque del juego
            stopGame(); // Detener el juego al perder el foco
        }
    });*/
    
    // Evento de enfoque en el contenedor del juego
    // gameContainer.addEventListener('focus', function() {
    //     // Reanudar el juego si estaba pausado
    //     if (gamePaused) {
    //         gamePaused = false;
    //         startGame(); // Volver a iniciar el juego
    //     }
    // });

    // Función para ajustar el tamaño del contenedor del juego cuando se carga la página o cambia el tamaño de la ventana
    function adjustGameContainerSize() {
        const windowWidth = window.innerWidth; // Obtener el ancho de la ventana del navegador
        const windowHeight = window.innerHeight; // Obtener el alto de la ventana del navegador

        // Ajustar el tamaño del contenedor del juego según el ancho y alto de la ventana del navegador
        gameContainer.style.width = `${windowWidth}px`;
        gameContainer.style.height = `${windowHeight}px`;
    }

    // Función para reiniciar el juego al menú principal
    function resetGame() {
        posUserView = 0;

        playerAlive = true;

        score = 0;

        win = false;
        
        // Eliminar clase de animación de explosión de la nave
        if (player.classList.contains('explosion')) {
            player.classList.remove('explosion');
        }

        player.removeAttribute('class');

        levelSelectorContainer.style.display = 'block'; // Mostrar el menú de selección de nivel
        enemy.style.width = '100px'; // Restablecer el ancho del enemigo
        enemy.style.height = '100px'; // Restablecer la altura del enemigo
        enemyInput.value = ''; // Limpiar el contenido del input
        scoreSpace.innerHTML = `Puntaje: 0`;

        ui_inGame.style.display = 'none';

        answer_container.style.display = 'none';
        answer_container.style.visibility = 'hidden';

        tutorial_container.style.display = 'none';
        win_container.style.display = 'none';

        stopAndResetBackgroundMusic();

        gamePauseSystem(false);

        removeFocus(); // Quitar el enfoque del juego al perder
    }

    // Función para obtener una operación aleatoria basada en el nivel de dificultad
    function generateRandomOperation() {
        let operators;
        switch (currentLevel) {
            case 1:
                operators = ['+'];
                break;
            case 2:
                //operators = ['+', '-'];
                operators = ['-'];
                break;
            case 3:
                //operators = ['+', '-', '*'];
                operators = ['*'];
                break;
            case 4:
                //operators = ['+', '-', '*', '/'];
                operators = ['/'];
                break;
            case 5:
                operators = ['+', '-', '*', '/'];
                break;
            default:
                operators = ['+'];
                break;
        }

        let operator = [];
        if(currentLevel == 5){
            operator = operators[Math.floor(Math.random() * operators.length)];
        }else{
            operator = operators[0];
        }
        
        let num1, num2;

        num1 = Math.floor(Math.random() * 9) + 1; // Número aleatorio entre 1 y 9
        num2 = Math.floor(Math.random() * 9) + 1; // Número aleatorio entre 1 y 9

        // Evitar números negativos en restas
        if (operator === '-') {
            [num1, num2] = [Math.max(num1, num2), Math.min(num1, num2)];
        }
    
        if (operator === '/') {
            num2 = Math.floor(Math.random() * 3) + 1; // Número aleatorio entre 1 y 3 para mantener las divisiones manejables
            num1 = num2 * (Math.floor(Math.random() * 3) + 1); // num1 será múltiplo de num2, entre 1 y 3 veces num2
        }

        // if(operator === '*'){
        //     num1 = Math.floor(Math.random() * 9) + 1; // Número aleatorio entre 1 y 9 para mantener las multipliaciones manejables
        //     num2 = Math.floor(Math.random() * 3) + 1; // Número aleatorio entre 1 y 3 para mantener las multipliaciones manejables
        // }
    
        return `${num1} ${operator} ${num2}`;
    }

    // Función para obtener una skin de enemigo aleatorio
    function generateSkinRandomEnemy() {
        let enemies = [
            '/assets/js-game/Asteroide.png',
            '/assets/js-game/asteroide9.png',
            '/assets/js-game/asteroide10.png',
            '/assets/js-game/asteroide11.png',
            '/assets/js-game/asteroide12.png'
        ];

        const enemyRandom = enemies[Math.floor(Math.random() * enemies.length)];

        // Formatear la URL como una cadena para la propiedad backgroundImage
        enemy.style.backgroundImage = `url('${enemyRandom}')`;
    }

    // Ajustar el tamaño del enemigo cuando se carga la página
    adjustEnemySize();

    // Función para ajustar el tamaño del enemigo cuando se carga la página
    function adjustEnemySize() {
        const windowHeight = gameContainer.clientHeight; // Usar el alto del contenedor del juego
        const windowWidth = gameContainer.clientWidth; // Usar el ancho del contenedor del juego
        const adjustedWidth = windowHeight * 0.1; // Porcentaje del tamaño del contenedor del juego
        const adjustedHeight = windowHeight * 0.1; // Porcentaje del tamaño del contenedor del juego
        enemy.style.width = `${adjustedWidth}px`; // Ajustar el ancho del enemigo al tamaño del contenedor del juego
        enemy.style.height = `${adjustedHeight}px`; // Ajustar la altura del enemigo al tamaño del contenedor del juego
    }

    // Función para iniciar el crecimiento del enemigo
    function growEnemy() {
        clearInterval(moveInterval); // Limpiar intervalo de movimiento anterior
        clearInterval(growInterval); // Limpiar intervalo anterior

        centerGame();

        enter_text.style.display = "none";

        if (!enemy) {
            console.error("No se encontró el elemento con el ID 'enemy'");
            return; // Salir de la función si no se encuentra el elemento
        }

        let width = 10;
        let height = 10;
        let topPosition = -enemy.offsetHeight; // Empieza arriba de la pantalla

        function growStep() {
            if (gamePaused) {
                return;
            }

            if (!playerAlive || (topPosition >= window.innerHeight / 2 - enemy.offsetHeight / 2 &&
                width >= 100 && height >= 100)) {
                clearInterval(growInterval); // Detiene el crecimiento cuando alcanza ciertas condiciones o el jugador muere
                if (playerAlive) {
                    moveEnemyDown(); // Comienza a mover al enemigo hacia abajo
                }
            } else {
                width += 1; // Incrementa el ancho
                height += 1; // Incrementa la altura
                topPosition += 1; // Incrementa la posición vertical
                enemy.style.width = `${width}px`; // Aplica el nuevo ancho
                enemy.style.height = `${height}px`; // Aplica la nueva altura
                enemyContent.style.fontSize = `${width / 10}em`; // Ajusta el tamaño del texto al tamaño del enemigo
                enemy.style.top = `${topPosition}px`; // Aplica la nueva posición al enemigo

                if (!enemyAppeared && enemyInput) {
                    enemyInput.value = ''; // Vacía el contenido del input solo la primera vez que aparece
                    enemyAppeared = true; // Marca el enemigo como ya aparecido

                    // Generar una operación aleatoria basada en el nivel de dificultad
                    const operation = generateRandomOperation();
                    enemyContent.querySelector('p').innerText = operation;

                    // Escuchar evento de entrada de texto
                    // enemyInput.addEventListener('keypress', function(e) {
                    //     if (e.key === 'Enter') {
                    //         const enteredResult = parseInt(this.value.trim(), 10); // Obtener el resultado ingresado como número entero
                    //         const correctResult = eval(operation); // Calcular el resultado correcto de la operación
                    //         if (enteredResult === correctResult && playerAlive) { // Solo sumar puntos si el jugador está vivo
                    //             score++; // Incrementa el puntaje
                    //             //console.log(`Puntaje: ${score}`);
                    //             scoreSpace.innerHTML = `Puntaje: ${score}`;
                    //             createNewEnemy(); // Crear un nuevo enemigo con una nueva operación aleatoria
                    //         }
                    //         checkAnswer(); // Llamar a checkAnswer después de presionar Enter   
                    //     }
                    // });
                }
            }
        }

        growInterval = setInterval(growStep, 10);

        setTimeout(() => {  
            if (enemyAppeared && enemyInput) {
                const input = enemyInput;
                // const scrollX = window.scrollX; // Guarda la posición horizontal actual de la ventana
                // const scrollY = window.scrollY; // Guarda la posición vertical actual de la ventana

                input.focus(); // Enfoca automáticamente el input del enemigo
                centerGame();

                // Restaura la posición de la ventana después de enfocar el input
                //window.scrollTo(scrollX, scrollY);
                // Escuchar evento de desenfoque y volver a enfocar
                input.addEventListener('blur', () => {
                    setTimeout(() => {
                        input.focus(); // Enfoca automáticamente el input del enemigo
                    }, 0); // Pequeño retardo para asegurarse de que el evento de desenfoque haya terminado
                });
            }
        }, 10 * (100 + width + height)); // Ajusta el tiempo para asegurarse de que se ejecute después de que termine el intervalo
    }

    // Función para mover el enemigo hacia abajo
    function moveEnemyDown() {
        clearInterval(moveInterval); // Limpiar intervalo anterior

        moveInterval = setInterval(() => {
            // Verificar si el juego está pausado antes de mover al enemigo
            if (!gamePaused) {
                const enemyRect = enemy.getBoundingClientRect();
                const playerRect = player.getBoundingClientRect();
                const gameContainerRect = gameContainer.getBoundingClientRect();

                if (enemyRect.bottom - 60 >= playerRect.top && enemyRect.right >= playerRect.left && enemyRect.left <= playerRect.right) {
                    // Si el enemigo toca al jugador
                    playerAlive = false; // El jugador pierde
                    stopGame();
                } else if (enemyRect.bottom >= gameContainerRect.bottom) {
                    // Si el enemigo llega al borde inferior del contenedor, reiniciar su posición arriba
                    enemy.style.top = `${-enemy.offsetHeight}px`;
                    console.log("Llegó hasta abajo el asteroide");
                } else {
                    // Mover al enemigo hacia abajo relativo a su posición actual con respecto al contenedor del juego
                    const enemyTop = enemy.offsetTop + calculateEnemySpeed();
                    enemy.style.top = `${enemyTop}px`;
                }
            }
        }, 10);
    }

    function calculateEnemySpeed() {
        const windowHeight = window.innerHeight;
        const gameContainerHeight = gameContainer.clientHeight;
        const percentage = gameContainerHeight / windowHeight; // Porcentaje de la altura del contenedor del juego en relación con la altura total de la ventana del navegador
    
        // Ajusta la velocidad del enemigo en función del porcentaje
        // Puedes ajustar estos valores según tus necesidades
        const baseSpeed = 0.1; // Velocidad base del enemigo
        const speedScale = 1; // Escala de velocidad
    
        return baseSpeed + (speedScale * percentage);
    }

    // Función para ajustar el tamaño del contenedor del juego y centrar el enemigo
    function adjustGameContainerAndEnemy() {
        // Establecer el contenedor del juego como un contenedor flex y centrar su contenido
        gameContainer.style.display = 'flex';
        gameContainer.style.alignItems = 'center';
        gameContainer.style.justifyContent = 'center';

        // Ajustar el tamaño del enemigo si es necesario
        adjustEnemySize();
    }

    // Llama a la función para ajustar el tamaño del contenedor del juego y centrar el enemigo al cargar la página
    window.addEventListener('load', adjustGameContainerAndEnemy);

    // Llama a la función para ajustar el tamaño del contenedor del juego y centrar el enemigo cuando cambia el tamaño de la ventana
    window.addEventListener('resize', adjustGameContainerAndEnemy);

    // Función para ajustar la posición del enemigo cuando se desplaza la página
    // window.addEventListener('scroll', function() {
    //     const enemyRect = enemy.getBoundingClientRect();
    //     const gameContainerRect = gameContainer.getBoundingClientRect(); // Obtener el rectángulo del contenedor del juego
    //     const windowHeight = window.innerHeight;

    //     // Calcular la posición del enemigo en relación con el contenedor del juego
    //     const enemyBottomRelativeToGameContainer = enemyRect.bottom - gameContainerRect.top;

    //     // Si el enemigo está a punto de salir de la vista del contenedor del juego, aplicar el foco
    //     if (enemyBottomRelativeToGameContainer <= windowHeight) {
    //         enemyInput.focus();
    //     }
    // });

    // Verifica si ha salido del juego
    // document.addEventListener('click', function(event) {
    //     const clickedElement = event.target;
    //     const isGameActive = levelSelectorContainer.style.display === 'none';
    
    //     // Verificar si el elemento clicado no está dentro del contenedor del juego y el juego está activo
    //     if (!gameContainer.contains(clickedElement) && isGameActive) {
    //         stopGame(); // Detener el juego al perder el foco
    //         removeFocus(); // Quitar el enfoque del juego
    //     }
    // });

    function tutorialGame(){
        posUserView = 1;

        levelSelectorContainer.style.display = 'none';
        tutorial_container.style.display = 'block';
        tutorial = true;
    }

    // Función para iniciar el juego
    function startGame() {
        posUserView = 2;

        // Puntuaciones necesarias para ganar por cada nivel
        switch (currentLevel) {
            case 1:
                scoreToWin = 15;
                break;
            case 2:
                scoreToWin = 15;
                break;
            case 3:
                scoreToWin = 15;
                break;
            case 4:
                scoreToWin = 15;
                break;
            case 5:
                endless = true;
            default:
                scoreToWin = 15;
                break;
        }

        tutorial = false;
        tutorial_container.style.display = 'none';

        if(!endless){
            document.getElementById("task-message").innerHTML = `Destruye ${scoreToWin} asteroides`;
        }else{
            document.getElementById("task-message").innerHTML = `Sobrevive a la horda de asteroides`;
        }

        // Detener y reiniciar el sonido de fondo
        stopAndResetBackgroundMusic();

        ui_inGame.style.display = 'block';
        
        enemy.style.visibility = 'visible'; // Mostrar enemigo al comenzar el juego

        answer_container.style.display = 'none';
        answer_container.style.visibility = 'visible';

        gameActive = true; // Marcar el juego como activo al iniciar el juego
        score = 0;
        playerAlive = true;
        scoreSent = false; // Establecer la bandera de puntuación enviada a falso

        generateNewOperation(); // Generar una nueva operación
        moveEnemyDown(); // Iniciar el movimiento del enemigo
        growEnemy(); // Iniciar el crecimiento del enemigo
        centerGame(); // Centrar el juego verticalmente en la pantalla al iniciar el juego

        startBackgroundMusic();
    }

    // Función para seleccionar el nivel de dificultad
    function selectLevel(level) {
        currentLevel = level;
        //currentDifficulty = difficulty;
        currentLevelSpace.innerHTML = "Nivel: " + level;
    }

    function startbtn(){
        selectLevel(parseInt(selectedLevel.value, 10));
        levelSelectorContainer.style.display = 'none';
        startGame();
    }

    // Función para detener el juego
    function stopGame() {
        posUserView = 3;

        clearInterval(growInterval); // Limpiar intervalo de crecimiento
        clearInterval(moveInterval); // Limpiar intervalo de movimiento

        gamePauseSystem(false);

        // Agregar clase de explosión a la nave cuando termina el juego
        player.classList.add('explosion'); // Asegúrate de añadir la clase de explosión aquí

        if(gameActive){
            checkAnswer(); // Verificar la respuesta ingresada
            answer_container.style.display = 'block';
            answer_container.style.visibility = 'visible';
        }
        
        // Llamar a la función enviarPuntuacion() con la puntuación actual
        if (!scoreSent && !playerAlive) { // Verificar si el jugador no está vivo y la puntuación no se ha enviado
            sendScore(nameUser, score); // Enviar la puntuación y el nombre a la base de datos
            scoreSent = true; // Establecer la bandera de puntuación enviada a verdadero
            console.log("Se envio");
        }

        stopAndResetBackgroundMusic();

        looseSound();

        stopButtonsSound();

        gameActive = false; // Marcar el juego como inactivo al detener el juego

        enemy.style.visibility = 'hidden'; // Ocultar enemigo al terminar el juego

        // Centrar el juego verticalmente en la pantalla al reiniciar el juego
        centerGame();

        removeFocus(); // Quitar el enfoque del juego al perder
    }

    function winGame(){
        posUserView = 4;
        
        console.log("Win");
        win = true;

        if (playerAlive) {
            clearInterval(growInterval); // Limpiar intervalo de crecimiento
            clearInterval(moveInterval); // Limpiar intervalo de movimiento
            //alert('¡Regresa Pronto!');
        }

        if(gameActive){
            //checkAnswer(); // Verificar la respuesta ingresada
            answer_container.style.display = 'block';
            answer_container.style.visibility = 'visible';
        }

        playerAlive = true; // El jugador gana
        
        // Llamar a la función enviarPuntuacion() con la puntuación actual
        if (!scoreSent && playerAlive) { // Verificar si el jugador está vivo y la puntuación no se ha enviado
            sendScore(nameUser, score); // Enviar la puntuación y el nombre a la base de datos
            scoreSent = true; // Establecer la bandera de puntuación enviada a verdadero
        }

        win_container.style.display = 'block';

        stopAndResetBackgroundMusic();

        gameActive = false; // Marcar el juego como inactivo al detener el juego

        enemy.style.visibility = 'hidden'; // Ocultar enemigo al terminar el juego
        
        if (enemyInput) {
            enemyInput.blur(); // Quitar el enfoque del input del enemigo
        }

        removeFocus(); // Quitar el enfoque del juego
    }

    // function difficultySetUp(){
    //     let difficulty = parseInt(selectedDifficulty.value, 10);
    //     switch (difficulty) {
    //         case 1:
    //             for (let i = 0; i < selectedDifficulty.length; i++) {
    //                 if(selectedLevel.options[i].text === "3. Multiplicación" || selectedLevel.options[i].text === "4. División"){
    //                     selectedLevel.remove(2); // Quita multiplicación
    //                     selectedLevel.remove(2); // Quita división
    //                 }
    //             }
    //             // const newOption = document.createElement('option');
    //             // newOption.value = "1";
    //             // newOption.text = "1. Suma";
    //             // if(currentLevel == 1){ 
    //             //     //selectedLevel[difficulty-1].hidden = true;
                    
    //             //     //selectedLevel.selectedIndex = 1;
    //             // }else{
    //             //     //selectedLevel[difficulty-1].hidden = false;
                    
    //             //     selectedLevel.add(newOption, selectedLevel.options[0]);   
    //             //     selectedLevel.selectedIndex = 1;
    //             // }
    //             break;
    //         case 2:
    //             for (let i = 0; i < selectedDifficulty.length; i++) {
    //                 if(selectedLevel.options[i].text === "4. División"){
    //                     selectedLevel.remove(2); // Quita división
    //                 }
    //             }
    //             break;
    //         case 3:
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // Escuchar el evento keydown para detectar cuando se presiona un botón
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if(isOnGame){
            // Si se presiona la tecla "Enter", dejar que continúe la acción predeterminada (enviar el formulario)
            if (key === "Enter") {
                switch (posUserView) {
                    case 0: // Menu principal
                        console.log("Está en la pantalla principal");
                        tutorialGame();
                        break;
                    case 1: // Tutorial
                        console.log("Tutorial");
                        startbtn();
                        break;
                    case 2: // Juego
                        console.log("Está jugando");
                        if(win && !endless){
                            winGame();
                        }
                        break;
                    case 3: // Perder
                        console.log("Está en la pantalla de perder");
                        resetGame();
                        break;
                    case 4: // Ganar
                        console.log("Está en la pantalla de ganar");
                        resetGame();
                        break;
                    default:
                        console.log("Valor inesperado de posUserView");
                        break;
                }
            }

            if(key === "Escape"){
                isOnGame = false;
                document.body.style.overflow = '';
                gamePauseSystem(true);
                removeFocus();
                console.log("Escape Key");
            }
    
            if(posUserView === 0){
                // Flechas
                switch (key) {
                    case "ArrowUp": // Flecha Arriba
                        console.log("Flecha Arriba");
                        if (!isNaN(selectedLevel.value) && parseInt(selectedLevel.value) !== selectedLevel.length) {
                            selectedLevel.value = parseInt(selectedLevel.value) + 1;
                        }
                        break;
                    case "ArrowDown": // Flecha Abajo
                        console.log("Flecha Abajo");
                        if (!isNaN(selectedLevel.value) && parseInt(selectedLevel.value) !== 1) {
                            selectedLevel.value = parseInt(selectedLevel.value) - 1;
                        }
                        break;
                    case "ArrowRight": // Flecha Derecha
                        console.log("Flecha Derecha");
                        // if (!isNaN(selectedDifficulty.value) && parseInt(selectedDifficulty.value) !== selectedDifficulty.length) {
                        //     selectedDifficulty.value = parseInt(selectedDifficulty.value) + 1;
                        // }
                        //difficultySetUp();
                        break;
                    case "ArrowLeft": // Flecha Izquierda
                        console.log("Flecha Izquierda");
                        // if (!isNaN(selectedDifficulty.value) && parseInt(selectedDifficulty.value) !== 1) {
                        //     selectedDifficulty.value = parseInt(selectedDifficulty.value) - 1;
                        // }
                        //difficultySetUp();
                        break;
                    default:
                        break;
                }
            }
        }
        //console.log(posUserView);
    });

    document.addEventListener('click', function(event) {
        const clickedElement = event.target;
        // Verificar si el elemento clicado si está dentro del contenedor del juego
        if (gameContainer.contains(clickedElement)) {
            isOnGame = true;
            document.body.style.overflow = 'hidden';
            //gamePauseSystem(false); // Despausa
            centerGame();
        }else {
            isOnGame = false;
            document.body.style.overflow = '';
            gamePauseSystem(true); // Pausa
            removeFocus();
        }
    });

    function gamePauseSystem(status){
        if(gameActive){
            if (status) {
                gamePaused = true; // Pausa el juego
                pauseContainer.style.display = 'block';
                pauseAllSounds();
            }else{
                gamePaused = false; // Despausa el juego
                pauseContainer.style.display = 'none';
                resumePausedSounds();
            }
        }
    }

    document.getElementById('pauseGame').addEventListener('click', function() {
        gamePauseSystem(true);
        console.log("pausaBoton");
    });

    document.getElementById('pause-btn').addEventListener('click', function() {
        gamePauseSystem(false);
        console.log("pausaBoton");
    });

    // Escuchar el evento del boton al ser accionado
    document.getElementById('start-button').addEventListener('click', function() {
        tutorialGame();
    });

    // Escuchar el evento del boton al ser accionado
    document.getElementById('tutorial-btn').addEventListener('click', function() {
        startbtn();
    });

    // Escuchar el evento del boton al ser accionado
    document.getElementById('backGame').addEventListener('click', function() {
        if(gameActive){
            stopGame();
        }
        resetGame();
    });

    // Escuchar el evento del boton al ser accionado
    document.getElementById('win-btn').addEventListener('click', function() {
        resetGame();
    });

    document.getElementById('continue-btn').addEventListener('click', function() {
        if(gameActive){
           stopGame();
        }
        resetGame(); // Reiniciar el juego
    });

    function looseSound() {
        const looseSound = document.getElementById('loose-sound');
        if(gameActive){
            looseSound.play(); // Reproduce el sonido
        }

        // Detener la reproducción del sonido después de un período de tiempo (en milisegundos)
        setTimeout(function() {
            looseSound.pause(); // Pausa la reproducción del sonido
            looseSound.currentTime = 0; // Reinicia el tiempo de reproducción al inicio
        }, 1300); // Por ejemplo, detener la reproducción después de 5 segundos
    }

    // Función para verificar la respuesta ingresada
    function checkAnswer() {
        const operation = enemyContent.querySelector('p').innerText;
        const enteredResult = parseInt(enemyInput.value.trim(), 10);
        const correctResult = eval(operation);
        console.log(operation.replace("*", "x").replace("/","÷") + " = " + correctResult);
        if (enteredResult === correctResult && playerAlive) {
            score++; // Incrementa el puntaje
            //console.log(`Puntaje: ${score}`);
            scoreSpace.innerHTML = `Puntaje: ${score}`;
            createNewEnemy(); // Crear un nuevo enemigo con una nueva operación aleatoria
        }else if (playerAlive) {
            applyBrowserSpecificStyles();
            enemyInput.style.boxSizing = "border-box";
            enemyInput.value = '';
            // Forzar reinicio de la animación
            enemyInput.style.animation = 'none'; // Eliminar la animación temporalmente
            // Forzar el reflujo para que el navegador reconozca el cambio
            void enemyInput.offsetWidth; 
            enemyInput.style.animation = "vibrate 0.2s ease-in-out 0s 2"; // Volver a agregar la animación

            // Añadir event listener para el evento 'animationend'
            enemyInput.addEventListener('animationend', onAnimationEnd);
            // Agrega el event listener para el evento 'animationiteration'
            //enemyInput.addEventListener('animationiteration', onAnimationIteration);
        } 
        document.getElementById("answer").innerHTML = `${operation} = ${correctResult} <br> Vuelve a intentarlo`;

        if(score === scoreToWin && !win && !endless){
            winGame();
        }
    }

    // Función que se ejecuta cuando la animación termina
    function onAnimationEnd() {
        //console.log('Animación terminada');
        enemyInput.style.border = "";

        // Remueve el event listener
        enemyInput.removeEventListener('animationend', onAnimationEnd);
    }

    // Función para manejar el evento de finalización de la animación
    // function onAnimationIteration(event) {
    //     // Obtener el estado de reproducción de la animación
    //     var animationState = enemyInput.style.animationPlayState;

    //     // Verificar si la animación está en curso
    //     if (animationState === "running") {
    //         console.log("La animación está a la mitad de su reproducción");
    //         // Realizar alguna acción cuando la animación está a la mitad
            
    //     }
    //     // Remueve el event listener
    //     enemyInput.removeEventListener('animationiteration', onAnimationIteration);
    // }

    // Función para aplicar estilos específicos según el navegador
    function applyBrowserSpecificStyles() {
        var isFirefox = typeof InstallTrigger !== 'undefined'; // Verifica si es Firefox
        var isChrome = !!window.chrome && !window.isOpera; // Verifica si es Chrome

        if (isFirefox) {
            // Aplicar estilos específicos para Firefox
            enemyInput.style.border = "3px solid red"; // Ancho de borde para Firefox
        } else if (isChrome) {
            // Aplicar estilos específicos para Chrome
            enemyInput.style.border = "6px solid red"; // Ancho de borde para Chrome
        } else {
            // Aplicar estilos predeterminados
            enemyInput.style.border = "6px solid red"; // Ancho de borde predeterminado
        }
    }

    // Función para generar una nueva operación aleatoria
    function generateNewOperation() {
        const operation = generateRandomOperation(); // Generar operación aleatoria
        enemyContent.querySelector('p').innerText = operation; // Mostrar la operación en el enemigo
    }

    // Función para detener el crecimiento del enemigo y restablecer el juego
    function createNewEnemy() {
        clearInterval(growInterval); // Limpiar intervalo de crecimiento
        clearInterval(moveInterval); // Limpiar intervalo de movimiento

        generateSkinRandomEnemy();

        enemy.style.width = '100px'; // Restablece el ancho inicial
        enemy.style.height = '100px'; // Restablece la altura inicial
        enemyInput.value = ''; // Restablece el valor del input
        growEnemy(); // Reinicia el crecimiento del nuevo enemigo

        // Enfocar el input del próximo enemigo
        // nextEnemy = document.getElementById('enemy');
        // if (nextEnemyInput) {
        //     nextEnemyInput.focus();
        // }
        
        generateNewOperation(); // Generar una nueva operación para el próximo enemigo

        // Centrar el juego verticalmente en la pantalla después de destruir un enemigo
        centerGame();

        // Llama a la función para reproducir el sonido de destrucción
        playExplosionSound();
    }

    // Función para quitar el enfoque del juego
    function removeFocus() {
        //gamePaused = true; // Pausar el juego al perder el foco
        gameContainer.blur(); // Quitar el enfoque del contenedor del juego
        enemyInput.blur(); // Quitar el enfoque del input del enemigo
    }

    // Función para centrar el juego verticalmente en la pantalla
    function centerGame() {
        const gameCenterY = gameContainer.offsetTop + gameContainer.offsetHeight / 2;
        const windowCenterY = window.innerHeight / 2;
        
        // Verificar si el juego está dentro de un contenedor con desplazamiento
        if (!isGameContainerScrollable()) {
            window.scrollTo(0, gameCenterY - windowCenterY);
        }
    }

    // Función para verificar si el contenedor del juego tiene desplazamiento
    function isGameContainerScrollable() {
        return gameContainer.scrollHeight > gameContainer.clientHeight;
    }

    function playExplosionSound() {
        const explosionSound = document.getElementById('explosion-sound');
        explosionSound.currentTime = 0; // Reinicia el sonido
        explosionSound.play();
    }

    // Función para reproducir el sonido de disparo
    function playShootSound() {
        const shootSound = document.getElementById('shoot-sound');
        shootSound.currentTime = 0; // Reinicia el sonido
        shootSound.play(); // Reproduce el sonido
    }

    document.getElementById('enemy-input').addEventListener('keydown', function(event) {
        const key = event.key;
        if(isOnGame && !gamePaused){
            if (!isNaN(key) && key !== " ") {
                if (gameActive) {
                    enter_text.style.display = 'block';
                    playButtonsSound();
                }
            } else if (key === "Enter" || key === 13 || key === "Next" || key === "Backspace" || key === "Go" || key === "F5") {
                if((key === "Enter" || key === 13 || key === "Next" || key === "Go") && gameActive){
                    shootBullet(15);  // Puedes ajustar la velocidad pasando un parámetro aquí
                    stopButtonsSound();
                }
                return true;
            } else {
                event.preventDefault();
            }
        }
    });

    function playButtonsSound() {
        const buttonsSound = document.getElementById('buttons-sound');
        buttonsSound.volume = 1;
        buttonsSound.play();
    }

    function stopButtonsSound() {
        const buttonsSound = document.getElementById('buttons-sound');
        buttonsSound.pause();
        buttonsSound.currentTime = 0; // Reinicia el sonido
    }
    
    function shootBullet(speed) {
        const player = document.getElementById('player');
        const gameContainer = document.getElementById('game-container');
    
        if (!player || !gameContainer) {
            console.error('El contenedor del juego o el jugador no están definidos.');
            return;
        }
    
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
    
        const playerRect = player.getBoundingClientRect();
        const gameContainerRect = gameContainer.getBoundingClientRect();
    
        bullet.style.left = `${playerRect.left + playerRect.width / 2 - gameContainerRect.left}px`;
        bullet.style.bottom = `${gameContainerRect.bottom - playerRect.bottom + 10}px`;
    
        gameContainer.appendChild(bullet);

        playShootSound();
    
        function updateBulletPosition() {
            let bulletBottom = parseInt(bullet.style.bottom);
            bullet.style.bottom = `${bulletBottom + speed}px`;
    
            // Detectar colisiones con asteroides
            const asteroids = document.querySelectorAll('#enemy');
            asteroids.forEach(asteroid => {
                if (isCollision(bullet, asteroid)) {
                    bullet.remove();
                    checkAnswer();
                }
            });
    
            // Eliminar la bala cuando sale del contenedor del juego
            if (bulletBottom > gameContainerRect.height) {
                bullet.remove();
            } else {
                requestAnimationFrame(updateBulletPosition);
            }
        }
    
        requestAnimationFrame(updateBulletPosition);
    }
    
    function isCollision(bullet, asteroid) {
        const bulletRect = bullet.getBoundingClientRect();
        const asteroidRect = asteroid.getBoundingClientRect();
    
        return !(
            bulletRect.top + 50 > asteroidRect.bottom ||
            bulletRect.bottom < asteroidRect.top ||
            bulletRect.left > asteroidRect.right ||
            bulletRect.right < asteroidRect.left
        );
    }    

    // Función para iniciar la música de fondo
    function startBackgroundMusic() {
        backgroundMusic.volume = 0.3; // Establece el volumen al 30%
        if (backgroundMusic.paused && gameActive) {
            backgroundMusic.play();
        }        
    }

    function stopAndResetBackgroundMusic() {
        backgroundMusic.pause(); // Pausa el sonido
        backgroundMusic.currentTime = 0; // Reinicia el tiempo de reproducción al inicio
    }
    
    // function pauseBackgroundMusic() {
    //     if (!backgroundMusic.paused) {
    //         backgroundMusic.pause();
    //     }
    // }
    
    // function resumeBackgroundMusic() {
    //     if (backgroundMusic.paused) {
    //         backgroundMusic.play();
    //     }
    // }

    function pauseAllSounds() {
        const sounds = document.querySelectorAll('audio');
        sounds.forEach(sound => {
            if (!sound.paused) {
                sound.pause(); // Pausa el sonido si no está pausado
                pausedSounds.push(sound); // Agrega el sonido pausado al array
            }
        });
    }

    function resumePausedSounds() {
        pausedSounds.forEach(sound => {
            sound.play(); // Reanuda cada sonido que estaba pausado
        });
        pausedSounds = []; // Limpia el array de sonidos pausados
    }
    
    // document.addEventListener("visibilitychange", function() {
    //     if (document.visibilityState === 'hidden') {
    //         pauseBackgroundMusic(); // Pausar el sonido de fondo cuando la página está oculta
    //     } else if(gameActive){
    //         resumeBackgroundMusic(); // Reanudar el sonido de fondo cuando la página se hace visible nuevamente
    //     }
    // });
    
    // window.addEventListener("pagehide", function() {
    //     pauseBackgroundMusic(); // Pausar el sonido de fondo cuando la página se está descargando
    // });


    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === 'hidden') {
            //pauseAllSounds(); // Pausar todos los sonidos cuando la página está oculta
            gamePauseSystem(true);
        }
    });

    function sendScore(nombre, puntaje) {
        // Crear un objeto XMLHttpRequest
        var xhttp = new XMLHttpRequest();
        
        // Definir la función de respuesta
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    console.log("Puntuación enviada con éxito del usuario: " + nombre + ".");
                    getDataTableUsers();
                } else {
                    console.error("Error al enviar la puntuación. Estado de la respuesta:", this.status);
                    // Manejar el error de conexión o la respuesta del servidor
                }
            }
        };
    
        // Especificar el método y la URL del servidor PHP
        xhttp.open("POST", "saveDataGame.php", true);
            
        // Establecer las cabeceras de la solicitud
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        // Concatenar los datos de la puntuación y el nombre
        var datos = "nombre=" + encodeURIComponent(nombre) + "&puntaje=" + encodeURIComponent(puntaje);
        
        // Enviar la solicitud con los datos de la puntuación y el nombre
        xhttp.send(datos);
    }
});