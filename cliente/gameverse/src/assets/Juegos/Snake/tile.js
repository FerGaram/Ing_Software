var canvas = document.getElementById("tile");
var ctx = canvas.getContext('2d');   //pincel 

var canvas_escenario = document.getElementById("escenario");
var ctx_escenario = canvas_escenario.getContext('2d');   //pincel 
var rejilla = document.getElementById("rejilla");
var textarea = document.getElementById("textarea");
var texto = document.getElementById("texto");


var img = new Image();
img.src = "previewFinal.png";
//Varables canvas
var xTile = 0;
var yTile = 0;
//Variables canvas_escenario
var xTile_escenario = 0;
var yTile_escenario = 0;

//Obtenemos los limites de los canvas
const rectTile = canvas.getBoundingClientRect();
const rectTile_escenario = canvas_escenario.getBoundingClientRect();


img.onload = function (){ //carga la imagen y despues ejecuta la funcion 
	draw()
	draw_escenario();
}

//para agregar escuchadores, detecta eventos 
canvas.addEventListener('mousedown',manejadorRaton, false);
canvas_escenario.addEventListener('mousedown',manejadorRaton_escenario, false);
rejilla.addEventListener('change',manejadorRejilla);
texto.addEventListener('change', leerTexto);

// j filas =12 	tile
// i col = 11

//i, j= 25    para el canvas del snake
var M = [];
for (j = 0; j < 25; j++ ){
	M[j] = new Array (25);
	for (i = 0; i < 25; i++)
		M[j][i] = -1;
}

function leerTexto(e){
	var archivo = e.target.files[0];
	if ( !archivo ){
		console.log("Hubo problemas");
		return
	}
	let reader = new FileReader(); //Declaramos una variable de tipo file
	console.log("Hola");
	reader.onloadend=() =>  LeerContenido(reader.result);
	reader.readAsText(archivo,"ISO-8859-1");
	//console.log(reader);
}

function LeerContenido(contenido){
	let lineas = contenido.split(/ /);
	console.log(lineas)
	for (i = 0; i < 625; i++){ //Porque el escenario es de 40*20
		M[Math.floor(i/25)][i%25] = parseInt(lineas[i]);
	}
	//console.log(M);
	draw_escenario();
}


function manejadorRejilla(){
	console.log(rejilla.checked);
	draw_escenario();

}

function manejadorRaton_escenario(e){
	//console.log("manejadorRaton_escenario");
	var relativeX_escenario = e.clientX - rectTile_escenario.left;
	var relativeY_escenario = e.clientY - rectTile_escenario.top;
	xTile_escenario = Math.floor(relativeX_escenario/16);
	yTile_escenario = Math.floor(relativeY_escenario/16);
	//console.log(xTile_escenario,yTile_escenario);

	M [yTile_escenario][xTile_escenario] = yTile*11 + xTile;
	//console.log(M);
	draw_escenario();
	

}

function manejadorRaton(e){
	var relativeX = e.clientX - rectTile.left;
	var relativeY = e.clientY - rectTile.top;
	//console.log(relativeX,relativeY);
	xTile=Math.floor(relativeX/16);
	yTile=Math.floor(relativeY/16);
	//console.log(xTile,yTile);

	draw();
	//ctx.globalAlpha = 0.5;
	//ctx.fillStyle="rgb(0,0,255)";
	//ctx.fillRect(xTile*16,yTile*16,16,16); //Dibuja el rectangulo
	//ctx.globalAlpha = 1;
}

//352 ancho y 384 alto
function draw()
{
	//Borra el canvas
	//ctx.fillStyle="rgb(255,255,255)";
	//ctx.fillRect(0,0,canvas.width,canvas.height); //Dibuja el rectangulo

	ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.drawImage(img,0,0);
	ctx.strokeStyle = '#F00'
	//dibuja la reticula
	for(i=0; i<=11; i++){
		ctx.moveTo(i*16,0)
		ctx.lineTo(i*16,384)		//hasta la altura del tile 384
		ctx.stroke()
	}

	for(i=0; i<=12; i++){
		ctx.moveTo(0, i*16)
		ctx.lineTo(384, i*16)
		ctx.stroke()
	}

	//Dibuja el cuadrito default
	ctx.globalAlpha = 0.5;
	ctx.fillStyle="rgb(0,0,255)";
	ctx.fillRect(xTile*16,yTile*16,16,16); //Dibuja el rectangulo
	ctx.globalAlpha = 1;

}

function draw_escenario()
{
	//DIBUJAMOS RECT, limpiar la pantalla

	ctx_escenario.clearRect(0,0,canvas_escenario.width,canvas_escenario.height);

	ctx_escenario.strokeStyle = '#F00'

	if (rejilla.checked)
		Dibuja_Rejilla();

	textarea.value = "";
	//Dibujamos la porcion de imagen
	for (j = 0; j < 25; j++ ){
		for (i = 0; i < 25; i++){
			if (M [j][i] != -1){
				ctx_escenario.drawImage(img, 
					(M[j][i]%11)*16, Math.floor((M[j][i]/11))*16, 
					16 , 16, 
					i*16, j*16, 
					16, 16);//(en donde empieza, ancho y alto, a donde, ancho y alto)
				textarea.value += M[j][i] + " ";
			}
			else{
				textarea.value += " -1 "
			}
		}
	}
	console.log(textarea.value);

}

function Dibuja_Rejilla(){

	//PONEMOS LA RETICULA
	for(i=0; i<=25; i++){
		ctx_escenario.moveTo(i*16,0)
		ctx_escenario.lineTo(i*16,400)	//
		ctx_escenario.stroke()
	}

	for(i=0; i<=25; i++){
		ctx_escenario.moveTo(0, i*16)
		ctx_escenario.lineTo(400, i*16)
		ctx_escenario.stroke()
	}
		
}

