window.onload = start;

var charFill = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z"];
var boxes = [];
var words = [];
var failWord = [];
//estos valores se utilizan para dimensionar inicialmente la sopa de letras, pero pueden cambiar segun las palabras ingresadas.
var heigth = 15;
var width = 15;

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
		word.chars = Array.from("juan");
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
		console.log(i);
	}
}

/**
*@description
*@param
*@return 
*/
function putWordInBox(word){
	let organization = word.organization;
	if (organization == 1 || organization == 2) {
		putHorizontal(word);
	}
	if (organization == 3 || organization == 4) {
		putVertical(word);
	}
	if (organization == 5 || organization == 6) {
		putDiagonalLeft(word);
	}
	if (organization == 7 || organization == 8) {
		putDiagonalRight(word);
	}
}

/**
*@description
*@param
*@return 
*/
function putVertical(word){
	let arrayLetter = word.chars;
	let boxesTemp, column = getRandomInt(0,(width*heigth)-word.size);;
	let index;
	if (word.organization == 4) {
		arrayLetter = arrayLetter.reverse();
	}
	while(true){
		boxesTemp = boxes;
		for (var i = 0; i < arrayLetter.length; i++) {
			index = (i*width)+column;
			if (!boxesTemp[index].state) {
				boxesTemp[index].nLetter = arrayLetter[i];
				boxesTemp[index].state = 1; 
			}else{
				if (boxesTemp[index].nLetter == arrayLetter[i]) {

				}else{
					break;
				}
			}
			if (i == (arrayLetter.length-1)) {
				boxes = boxesTemp;
				return;
			}
		}
		if ((column+arrayLetter.length)>heigth) {
			failWord.push(word);
			return;
		}
		column++;
	}
}

/**
*@description
*@param
*@return 
*/
function putHorizontal(word){
	let arrayLetter = word.chars;
	let boxesTemp;
	let row = getRandomInt(0,(width*heigth)-word.size);
	let index;
	if (word.organization == 2) {
		arrayLetter = arrayLetter.reverse();
	}
	while(true){
		boxesTemp = boxes;
		for (var i = 0; i < arrayLetter.length; i++) {
			index = row+i;
			if (!boxesTemp[index].state) {
				boxesTemp[index].nLetter = arrayLetter[i];
				boxesTemp[index].state = 1; 
			}else{
				if (boxesTemp[index].nLetter == arrayLetter[i]) {

				}else{
					break;
				}
			}
			if (i == (arrayLetter.length-1)) {
				boxes = boxesTemp;
				return;
			}
		}
		if ((row+arrayLetter.length)>width) {
			row += arrayLetter.length;
			if (row > (width*heigth)) {
				failWord.push(word);
				return;
			}
		}else{
			row++;
		}
	}
}

/**
*@description
*@param
*@return 
*/
function putDiagonalLeft(word){
	let arrayLetter = word.chars;
	let boxesTemp;
	let displacement = 0;
	let index = getRandomInt(0,(width*heigth)-word.size);
	if (word.organization == 6) {
		arrayLetter = arrayLetter.reverse();
	}
	while(true){
		boxesTemp = boxes;
		index = 0;
		for (var i = 0; i < arrayLetter.length; i++) {
			if (!boxesTemp[index].state) {
				boxesTemp[index].nLetter = arrayLetter[i];
				boxesTemp[index].state = 1; 
			}else{
				if (boxesTemp[index].nLetter == arrayLetter[i]) {

				}else{
					break;
				}
			}
			if (i == (arrayLetter.length-1)) {
				boxes = boxesTemp;
				return;
			}
			index += width+1+displacement;
		}
		if ((displacement+arrayLetter.length)>width) {
			displacement += arrayLetter.length;
			if ((displacement+arrayLetter.length)>heigth) {
				failWord.push(word);
				return;
			}
		}else{
			displacement++;
		}
	}
}

/**
*@description
*@param
*@return 
*/
function putDiagonalRight(word){
	let arrayLetter = word.chars;
	let boxesTemp;
	let displacement = 0;
	let index = getRandomInt(0,(width*heigth)-word.size);
	if (word.organization == 8) {
		arrayLetter = arrayLetter.reverse();
	}
	while(true){
		boxesTemp = boxes;
		for (var i = 0; i < arrayLetter.length; i++) {
			if (!boxesTemp[index].state) {
				boxesTemp[index].nLetter = arrayLetter[i];
				boxesTemp[index].state = 1; 
			}else{
				if (boxesTemp[index].nLetter == arrayLetter[i]) {

				}else{
					break;
				}
			}
			if (i == (arrayLetter.length-1)) {
				boxes = boxesTemp;
				return;
			}
			index += width-1+displacement;
		}
		if ((displacement+arrayLetter.length)>width) {
			displacement += arrayLetter.length;
			if ((displacement+arrayLetter.length)>heigth) {
				failWord.push(word);
				return;
			}
		}else{
			displacement++;
		}
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



function prueba(){
	setWords();
	createBoxes();
	putAllWordsInBoxes();
	let soup = "";
	for (var i = 1; i <= (width*heigth); i++) {
		if (boxes[i-1].state) {
			soup += ".";
		}
		soup += "|"+boxes[i-1].nLetter;
		if (i%10 == 0) {
			console.log(soup);
			soup = "";
		}
	}
}

