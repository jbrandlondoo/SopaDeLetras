window.onload = start;

var charFill = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","u","v","w","x","y","z"];
var boxes = [];
var words = [];
var failWord = [];
//estos valores se utilizan para dimensionar inicialmente la sopa de letras, pero pueden cambiar segun las palabras ingresadas.
var heigth = 15;
var width = 15;
var tabla;
var boxLetter = [];
var ejemplo = ["Repollo", "Nabo", "Rábano", "Zanahoria","Viento", "Lluvia", "Fuego","Manzana", "Banana"];


function start(){
	console.log("Bienvenido!");
	generate();
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
	let inputs = document.getElementById("inputsWords").children;
	for (var i = 0; i < inputs.length ; i++) {
		if (inputs[i].value !== "") {
			word = new Object();
			word.chars = Array.from(inputs[i].value.toLowerCase());
			word.size = word.chars.length;
			words.push(word);
		}
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
function createSoupAlphabelt(){
	for(var i = 0; i < (heigth*width);i++){
		boxes[i] = new Object();
	}
}


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
	let organization = getRandomInt(1,9);
	word.organization = organization;
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
	var index;
	var arrayLetter = word.chars.slice();
	var temp;
	if (word.organization == 4) {
		arrayLetter = arrayLetter.reverse();
	}
	while(true){
		index = getRandomInt(0,(heigth-word.size+1)*width);
		temp = boxes.slice();
		for(var i = 0; i < arrayLetter.length; i++){
			if(!temp[index].letter){
				temp[index].letter = arrayLetter[i];
				if (i == (arrayLetter.length-1)) {
					boxes = temp.slice();
					return;
				}
			}else{
				if (temp[index].letter !== arrayLetter[i]) {
					break;
				}
			}
			index += width;
		}
	}
}

/**
*@description
*@param
*@return 
*/
function putHorizontal(word){
	var index,indexRow,indexColumn;
	var arrayLetter = word.chars.slice();
	var temp;
	if (word.organization == 2) {
		arrayLetter = arrayLetter.reverse();
	}
	while(true){
		indexRow = getRandomInt(0,heigth);
		indexColumn = getRandomInt(0,width-word.size);
		temp = boxes.slice();
		index = (width*indexRow)+indexColumn;
		for(var i = 0; i < arrayLetter.length; i++){
			if(!temp[index].letter){
				temp[index].letter = arrayLetter[i];
				if (i == (arrayLetter.length-1)) {
					boxes = temp.slice();
					return;
				}
			}else{
				if (temp[index].letter !== arrayLetter[i]) {
					break;
				}
			}
			index++;
		}
	}
}

/**
*@description
*@param
*@return 
*/
function putDiagonalLeft(word){
	var index,indexRow,indexColumn;
	var arrayLetter = word.chars.slice();
	var temp;
	if (word.organization == 6) {
		arrayLetter = arrayLetter.reverse();
	}
	while(true){
		indexRow = getRandomInt(0,(heigth-word.size+1)*width);
		indexColumn = getRandomInt(0,width-word.size);
		temp = boxes.slice();
		index = indexColumn+indexRow;
		for(var i = 0; i < arrayLetter.length;i++){
			if(!temp[index].letter){
				temp[index].letter = arrayLetter[i];
				if (i == (arrayLetter.length-1)) {
					boxes = temp.slice();
					return;
				}
			}else{
				if (temp[index].letter !== arrayLetter[i]) {
					break;
				}
			}
			index+=width+1;
		}
	}
}

/**
*@description
*@param
*@return 
*/
function putDiagonalRight(word){
	var index,indexRow,indexColumn;
	var arrayLetter = word.chars.slice();
	var temp;
	if (word.organization == 6) {
		arrayLetter = arrayLetter.reverse();
	}
	while(true){
		indexRow = getRandomInt(0,(heigth-word.size+1)*width);
		indexColumn = getRandomInt(width-word.size,width);
		temp = boxes.slice();
		index = indexColumn+indexRow;
		for(var i = 0; i < arrayLetter.length;i++){
			if(!temp[index].letter){
				temp[index].letter = arrayLetter[i];
				if (i == (arrayLetter.length-1)) {
					boxes = temp.slice();
					return;
				}
			}else{
				if (temp[index].letter !== arrayLetter[i]) {
					break;
				}
			}
			index+=width-1;
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


/**
*@description
*@param
*@return 
*/
function generate(){
	setWords();
	createSoupAlphabelt();
	putAllWordsInBoxes();
	genera_tabla();
}

/**
*@description
*@param
*@return 
*/
function genera_tabla() {
  var body = document.getElementsByTagName("body")[0];
  if (tabla) {
  		tabla.setAttribute("class", "hidden");
  	}
  tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");
  for (var i = 0; i < heigth; i++) {
    var hilera = document.createElement("tr");
    for (var j = 0; j < width; j++) {
      var celda = document.createElement("td");
      var textoCelda = "";
      if (boxes[(width*i)+j].letter) {
      	textoCelda = document.createTextNode(boxes[(width*i)+j].letter);
      	celda.appendChild(textoCelda);
      	boxLetter.push(celda);
      }
      else{
      	textoCelda = document.createTextNode(charFill[getRandomInt(0,25)]);
      	celda.appendChild(textoCelda);
      }
      
      hilera.appendChild(celda);
    }
    tblBody.appendChild(hilera);
  }
  tabla.appendChild(tblBody);
  body.appendChild(tabla);
  tabla.setAttribute("class", "tabla");
}

/**
*@description
*@param
*@return 
*/
function show(){
	for(var i = 0; i < boxLetter.length;i++){
		boxLetter[i].setAttribute("class", "letter");
	}
}

/**
*@description
*@param
*@return 
*/
function validar(id){
	if (!id.checkValidity()) {
		alert("revisar por favor");
	}
}
