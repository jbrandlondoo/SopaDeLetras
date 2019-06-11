window.onload = start;

var charFill = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z"];
var boxes = [];
var words = [];
//estos valores se utilizan para dimensionar inicialmente la sopa de letras, pero pueden cambiar segun las palabras ingresadas.
var heigth = 10;
var width = 10;

function start(){
	console.log("Bienvenido!");
}

/**
*@description esta funcion llenara el array words con las palabras ingresadas por el usuario.
** el objeto word esta formado por:
*** chars es un array con las letras de la palabra.
*** size es el tamaño de la palabra.
*** organization se define de la siguiente forma:
**** 1 Horizontal
**** 2 Horizontal-invertido
**** 3 Vertical
**** 4 Vertical-invertido
**** 5 Diagonal \
**** 6 Diagonal \ -invertido
**** 7 Diagonal / 
**** 8 Diagonal / -invertido
*@param NO
*@return NO
*/
function setWords(){
	words = [];
	let word;
	for (var i = 0; i < 10; i++) {
		word = new Object();
		word.chars = Array.from("hola mundo");
		word.size = word.chars.length;
		word.organization = getRandomInt(1, 9);
		words.push(word);
	}
}

/**
*@description se crea cada una de las casilla de las sopa de letras vacía
** el objeto box esta formado por:
*** nLetter una letra
*** state este inicia en 0 ya que es una letra random que no hace parte de una palabra ingresada por el usuario, 1 es lo contrario
*** position sera la posicion que ocupara en la sopa de letras satisfaciendo (fila*width)+columna = i 
*@param NO
*@return NO
*/
function createBoxes(){
	boxes = [];
	let box;
	for (var i = 0; i < (heigth*width); i++) {
		box = new Object();
		box.nLetter = charFill[getRandomInt(0, 24)];
		box.state = 0;
		box.position = i;
		boxes.push(box);
	}
}


/**
*@description
*@param
*@return 
*/
function putAllWordsInBoxes(){
	for (var i = 0; i < words.length; i++) {
		putWordInBox(words[i]);
	}
}

/**
*@description
*@param
*@return 
*/
function putWordInBox(word){
	let displacement = getDisplacement(word.organization);
	let position = getPositionInit(word);
	for (var i = 0; i < (heigth*width); i++) {
		for (var j = 0; j < word.size; j++) {
			
		}
		position+=1;
	}
}

/**
*@description este funcion crea un valor random entero entre min y max.
*@param{number} min es el numero entero menor que arrojara la funcion.
*@param{number} max es el numero entero mayor.
*@return{number} es un numero entero mayor o igual a min pero menor a max.
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
