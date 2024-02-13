var canvas = document.getElementById('game');
var canvasInfo = document.getElementById('info');  

var ctx = canvas.getContext('2d');
var ctxInfo = canvasInfo.getContext('2d');           

var celda = 16;     // El tamaño de una celda en el juego (en píxeles) nos da 25x25 celdas en el canvas
var count = 0;       // Un contador que controla la velocidad de actualización del juego

var img = new Image();
img.src = "previewFinal.png";

var indice = 0;
var snakeVelocidad = 20; 
var puntaje = 0;
var vidas = 3;
var AvanzaNivel = 100 //puntaje necesario para avanzar de nivel


var ancho_ladrillo = 16;    //variables del ladrillo
var altura_ladrillo = 16;
var padding_ladrillo = 16;
var separacion_ladrillo = 16;

var colores = ["#000000"];


var nivel;
// Variable global para cambiar el nivel
const nivelSelect = document.getElementById('nivelSelect');
const playButton = document.getElementById('playButton');
const speedButton = document.getElementById('speedSelect');

function iniciarJuego() {
    const selectedLevel = parseInt(nivelSelect.value);
    nivel = selectedLevel; // Actualiza el nivel seleccionado
    resetGame(); // Resetea el juego al nivel seleccionado
    juegoTerminado = false; // Reinicia el estado del juego
    requestAnimationFrame(loop); // Reinicia el bucle del juego
}
playButton.addEventListener('click', iniciarJuego);

speedSelect.addEventListener('change', function() {
  const selectedSpeed = parseInt(speedSelect.value);
  if (selectedSpeed == 0) {
    snakeVelocidad = 30; // Velocidad x1
  } else if (selectedSpeed == 1) {
    snakeVelocidad = 15; // Velocidad x2
  }
});

let juegoTerminado = false;

let niveles = [
  [   // Nivel 1 
    [{ e: 0 }],
  ],
  [   // Nivel 2 vacio con bombas
    [{ e: 0 }],
  ],
  [   // Nivel 3 
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0}],
  ],
  [   // Nivel 4 
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0}],
  ],
  [   // Nivel 5 
    [{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 }],
  ],
  [   // Nivel 6 
    [{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 }],
  ],
  [   // Nivel 7 
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
  ],
  [   // Nivel 8 
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
  ],
  [   // Nivel 9 
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 }],
    [{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 }],
    [{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 },{ e: 1 },{ e: 0 }],
  ],
  [   // Nivel 10
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
    [{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 },{ e: 1 }],
  ],
  [   // Nivel 11 Has ganado, vacio para la condicion de gane
    [{ e: 0 }],
  ]
];

var snake = {         
  x: 160,          // Posición X inicial de la cabeza de la serpiente
  y: 160,          // Posición Y inicial de la cabeza de la serpiente
  dx: celda,        // Dirección X en la que se mueve (inicialmente a la derecha)
  dy: 0,           // Dirección Y en la que se mueve
  cells: [],       // Un arreglo que almacena las posiciones del cuerpo de la serpiente
  maxCells: 4      // La longitud inicial 
};

var apple = {         
  x: 320,             // Posición X inicial 
  y: 320              // Posición Y inicial
};

var bomba = {
  x: 80,
  y: 80
}

img.onload = function() {
  iniciarJuego(); // Comienza el juego después de cargar la imagen
};

// Agrega un evento de teclado para controlar la dirección de la serpiente
document.addEventListener('keydown', detectarTecla);

function detectarTecla(e) {
  if (e.keyCode == 38) { // La tecla de flecha arriba
    if (snake.dy === 0) { // Evita que la serpiente se mueva hacia abajo si ya está moviéndose hacia arriba.
      snake.dy = -celda;
      snake.dx = 0;
    }
  }
  if (e.keyCode == 40) { // La tecla de flecha abajo
    if (snake.dy === 0) { // Evita que la serpiente se mueva hacia arriba si ya está moviéndose hacia abajo.
      snake.dy = celda;
      snake.dx = 0;
    }
  }
  if (e.keyCode == 37) { // La tecla de flecha izquierda
    if (snake.dx === 0) { // Evita que la serpiente se mueva hacia la derecha si ya está moviéndose hacia la izquierda.
      snake.dx = -celda;
      snake.dy = 0;
    }
  }
  if (e.keyCode == 39) { // La tecla de flecha derecha
    if (snake.dx === 0) { // Evita que la serpiente se mueva hacia la izquierda si ya está moviéndose hacia la derecha.
      snake.dx = celda;
      snake.dy = 0;
    }
  }
}

// Reinicia el juego y la posición de la serpiente
function resetGame() {
  vidas = 3;
  puntaje = 0;
  resetSnake();
  generarManzanaAleatoria();
  generarBombaAleatoria();
}

function resetSnake() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 4;
  snake.dx = celda;
  snake.dy = 0;
}

function actualizarNivel() {
  // Utiliza ctx.fillText para mostrar el puntaje en el canvas
  ctxInfo.font = '16px Arial';
  ctxInfo.fillStyle = 'white';
  ctxInfo.fillText('Nivel: ' + nivel, 10, 40); // Posición para mostrar el puntaje en el canvas
  if (nivel == 10) {
    ctxInfo.fillText('¡Has ganado!', 80, 40);
    juegoTerminado = true;
  }
}

function actualizarPuntaje() {
  // Utiliza ctx.fillText para mostrar el puntaje en el canvas
  ctxInfo.font = '16px Arial';
  ctxInfo.fillStyle = 'white';
  ctxInfo.fillText('Puntaje: ' + puntaje, 10, 20); // Posición para mostrar el puntaje en el canvas
}

function actualizarVidas() {
  // Utiliza ctx.fillText para mostrar las vidas en el canvas
  ctxInfo.font = '16px Arial';
  ctxInfo.fillStyle = 'white';
  ctxInfo.fillText('Vidas: ' + vidas, canvasInfo.width - 100, 20);
}

// Una función que genera un número entero aleatorio dentro de un rango
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; //se genera un numero aleatorio entre 0 y 1, se multiplica por el rango y se suma el minimo para arreglar la generacion
}

function posicionOcupada(x, y) {
  // Verifica si la posición generada para la manzana o la bomba coincide con alguna posición ocupada en niveles
  for (let j = 0; j < niveles[nivel].length; j++) {
    for (let i = 0; i < niveles[nivel][j].length; i++) {
      const brick = niveles[nivel][j][i];
      const xBrick = i * (ancho_ladrillo + padding_ladrillo) + separacion_ladrillo;
      const yBrick = j * (altura_ladrillo + padding_ladrillo) + separacion_ladrillo;

      if (brick.e !== 0 && x == xBrick && y == yBrick) {
        return true; // La posición generada coincide con una posición ocupada en niveles
      }
    }
  }
  return false; // La posición generada no coincide con ninguna posición ocupada en niveles
}

// Genera una posición aleatoria para la manzana
function generarManzanaAleatoria() {
  do {
    apple.x = getRandomInt(0, 25) * celda;
    apple.y = getRandomInt(0, 25) * celda;
  } while (posicionOcupada(apple.x, apple.y));
}

//Verifica si se comió una manzana
function comerManzana() {
  if (snake.x == apple.x && snake.y == apple.y) {
      snake.maxCells++;            // Reinicia el juego si la serpiente se choca a sí misma
      generarManzanaAleatoria();  // Genera una nueva posición para la manzana
      actualizarPuntaje();
      puntaje += 10;
    }
}

function generarBombaAleatoria() {
  do {
    bomba.x = getRandomInt(0, 25) * celda;
    bomba.y = getRandomInt(0, 25) * celda;
  } while (posicionOcupada(bomba.x, bomba.y));
}

function comerBomba(){
  if (snake.x == bomba.x && snake.y == bomba.y) {
    actualizarVidas();
    vidas--;
    resetSnake(); // Reiniciar si la serpiente come una bomba
    generarBombaAleatoria(); // Generar nueva bomba
}
}

// Verifica si la serpiente ha chocado consigo misma
function colisonConSigoMisma() {
  var i;
  for (i = 1; i < snake.cells.length; i++) {
    if (snake.x == snake.cells[i].x && snake.y == snake.cells[i].y) {
      actualizarVidas();
      vidas--;
      resetSnake();           // Reinicia el juego si la serpiente se choca a sí misma
      generarManzanaAleatoria();  // Genera una nueva posición para la manzana
      generarBombaAleatoria(); // Generar una nueva bomba
    }
  }
}

function colisonConBorde() {
  if ( snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height ) {
    actualizarVidas();
    vidas--;
    resetSnake();                         
    generarManzanaAleatoria();
    generarBombaAleatoria();        
  }
}

// En este código, se toma una función que toma un array, un índice de inicio 0, 
// un número de elementos a eliminar 0 y un elemento a insertar. Recorre el array con un bucle for, 
// añade los elementos a parte1 o parte2 según su posición, añade el nuevo elemento a parte1 y 
// luego añade todos los elementos de parte2 a parte1. Finalmente, devuelve parte1, que es el nuevo array.

function snakeDanonino(array, elemento) {
  let parte1 = [];
  let parte2 = [];

  for (let i = 0; i < array.length; i++) {
    parte2.push(array[i]);
  }
  parte1.push(elemento);
  for (let i = 0; i < parte2.length; i++) {
    parte1.push(parte2[i]);
  }

  return parte1;
}

// La función principal del juego, se llama recursivamente para crear un bucle de juego.
function loop() {
  if (juegoTerminado) {
    return; // Salir del bucle si el juego ha terminado
  }

  requestAnimationFrame(loop);

  if (++count < snakeVelocidad) {
    return; // Controla la velocidad del juego (10 actualizaciones por segundo)
  }

  ctxInfo.clearRect(0, 0, canvasInfo.width, canvasInfo.height); // Limpia la información en cada actualización
  actualizarPuntaje();
  actualizarVidas();
  actualizarNivel();

  count = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas en cada actualización
  dibujarFondo();
  dibujaNivel();

  snake.x += snake.dx; // Mueve la cabeza de la serpiente en la dirección actual
  snake.y += snake.dy;

  snake.cells = snakeDanonino(snake.cells, { x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop(); // Elimina la última celda si la serpiente es demasiado larga
  }

  comerManzana();
  comerBomba();
  colisonConBorde();
  colisonConSigoMisma(); // Verifica si la serpiente ha chocado consigo misma
  detectarColisionLadrillo(); // Verifica si la serpiente ha chocado con un ladrillo

  ctx.fillStyle = 'blue';
  ctx.fillRect(bomba.x, bomba.y, celda - 1, celda - 1);  // Dibuja la bomba

  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x, apple.y, celda - 1, celda - 1);  // Dibuja la manzana

  ctx.fillStyle = 'green';
  snake.cells.forEach(function (cell, index) {
    ctx.fillRect(cell.x, cell.y, celda - 1, celda - 1); // Dibuja las celdas del cuerpo de la serpiente
  });

  if (puntaje >= AvanzaNivel) {
    nivel++;
    if (nivel < niveles.length) {
      resetGame();
      juegoTerminado = false;
    } else {
      juegoTerminado = true;
    }
  }

  if (vidas == 0) {
    juegoTerminado = true;
    ctxInfo.font = '16px Arial';
    ctxInfo.fillStyle = 'white';
    ctxInfo.fillText('Perdiste', 80, 40);
  }
}

requestAnimationFrame(loop);  // Inicia el bucle del juego


function dibuja_ladrillo(j, i) {
  var nivelActual = niveles[nivel]; // Obtener el nivel actual
  var b = nivelActual[j][i]; // Obtener el elemento en el nivel actual
  var x_ladrillo = i * (ancho_ladrillo + padding_ladrillo) + separacion_ladrillo;
  var y_ladrillo = j * (altura_ladrillo + padding_ladrillo) + separacion_ladrillo;

  if (b.e !== 0) { // b.e tiene la intensidad del ladrillo
    ctx.fillStyle = colores[b.e - 1];
    ctx.fillRect(x_ladrillo, y_ladrillo, ancho_ladrillo, altura_ladrillo);
  }
}

function dibujaNivel() {
  for (var j = 0; j < niveles[nivel].length; j++) {
    for (var i = 0; i < niveles[nivel][j].length; i++) {
      dibuja_ladrillo(j, i);
    }
  }
}

function detectarColisionLadrillo() {
  for (var j = 0; j < niveles[nivel].length; j++) {
    for (var i = 0; i < niveles[nivel][j].length; i++) {
      var ladrillo = niveles[nivel][j][i];

      if (ladrillo.e !== 0) { // Verifica si el ladrillo está presente
        var x_ladrillo = i * (ancho_ladrillo + padding_ladrillo) + separacion_ladrillo;
        var y_ladrillo = j * (altura_ladrillo + padding_ladrillo) + separacion_ladrillo;

        // Verifica la colisión entre la serpiente y el ladrillo
        if (
          snake.x < x_ladrillo + ancho_ladrillo &&
          snake.x + celda > x_ladrillo &&
          snake.y < y_ladrillo + altura_ladrillo &&
          snake.y + celda > y_ladrillo
        ) {
          // La serpiente ha colisionado con un ladrillo
          actualizarVidas(); // Restar una vida
          vidas--;
          resetSnake(); // Reiniciar la posición de la serpiente
          generarManzanaAleatoria(); // Generar una nueva manzana
          generarBombaAleatoria(); // Generar una nueva bomba
          return; // Salir de la función después de la colisión
        }
      }
    }
  }
}

var M = [];
for (j = 0; j < 25; j++ ){
	M[j] = new Array (25);
	for (i = 0; i < 25; i++)
		M[j][i] = -1;
}

function dibujarFondo(){
	let contenido = [
    "80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80 80",
    "74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74 74",
    "18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18 18",
    "20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20 20",
    "86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86 86",
    "84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84 84",
    "56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56 56",
    "75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75 75",
    "67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67 67",
    "25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25 25"
  ]
  
  let lineas=contenido[nivel].split(/ /);
	for (i = 0; i < 625; i++){ //Porque el escenario es de 25x25
		M[Math.floor(i/25)][i%25] = parseInt(lineas[i]);
	}
	for (j = 0; j < 25; j++ ){
		for (i = 0; i < 25; i++){
			if (M [j][i] != -1){
					ctx.drawImage(img, (M[j][i]%11)*16, Math.floor((M[j][i]/11))*16, 16 , 16, i*16, j*16, 16, 16);//(en donde empieza, ancho y alto, a donde, ancho y alto)
			}
		}
	}
}
