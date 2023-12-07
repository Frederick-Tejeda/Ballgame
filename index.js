const root = document.getElementById("root");

const device = (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)) ? true:  false;

if(device){
	root.innerHTML = `<dialog id="info"><p>Para mover las barras utilizas los botones que hay a los laterales.<br><br>Para iniciar, sea el jugador rojo o azul, solo tienes que darle a la flecha que indica a la dirección de su oponente.</p><button onclick="document.getElementById('info').close()">Close</button></dialog><div id="help-container"><button onclick="document.getElementById('info').showModal()">Help</button></div><header><aside id="uno">0</aside><hr><aside id="dos">0</aside></header>
		<section id="cntrlL"><button id="leftTOP" onclick="CLICK(1)">⏫</button><button id="leftGIVE" onclick="CLICK(5)">⇢</button><button id="leftDOWN" onclick="CLICK(2)">⏬</button></section>
		<main id="main">
	<div id="bar1"></div>
	<div id="ball"></div>
	<div id="bar2"></div>
	</main>
	<section id="cntrlR"><button id="rightTOP" onclick="CLICK(3)">⏫</button><button id="rightGIVE" onclick="CLICK(6)">⇠</button><button id="rightDOWN" onclick="CLICK(4)">⏬</button></section>
	`
}else{
	root.innerHTML = `<dialog id="info"><p>Para el jugador rojo mover su barra, debe utilizar "w" para subir y "s" para bajar.<br><br>El jugador azul, en cambio, se desplaza hacia arriba dando click a la "o" y hacia abajo dando click a la "l".<br><br>Para empezar el juego se le dan a las flechas</p><button onclick="document.getElementById('info').close()">Close</button></dialog><div id="help-container"><button onclick="document.getElementById('info').showModal()">Help</button></div><header><aside id="uno">0</aside><hr><aside id="dos">0</aside></header>
	<section id="cntrlL"><button id="leftGIVE" onclick="CLICK(5)" style="height:60vh;">⇢</button></section>
	<main id="main">
	<div id="bar1"></div>
	<div id="ball"></div>
	<div id="bar2"></div>
	</main>
	<section id="cntrlR"><button id="rightGIVE" onclick="CLICK(6)" style="height:60vh;">⇠</button></section>`
}

const main = document.getElementById("main");

var ball = document.getElementById("ball");
var ballX = 50, ballY = 50;
var speed = 0;
var plusY = 1.5, plusX = 2;
var num = 0, uno = 0, dos = 0;
var over = true, start = false;
var colors = ["0, 0, 255", "255, 0, 0"]

ball.style.top = `${ballY}%`;
ball.style.left = `${ballX}%`;

var bar1 = document.getElementById("bar1"), bar2 = document.getElementById("bar2");
var bar1Y = 50, bar2Y = 50;
bar1.style.top = `${bar1Y}%`;
bar2.style.top = `${bar2Y}%`;

var interval;

var isTOP = false, isLEFT = true;

function and(){
	if(start == false){
		interval = setInterval(Game, 60); 
		start = true; 
		over = false
	}
}

const X = () => {
	if(ballY <= 3){
		isTOP = false;
	}
	if(ballY >= 95){
		isTOP = true;
	}
}

const Evaluar = () => {
	if(ballX + plusX >= 95 || ballX - plusX <= 2){
		if(((ballY - bar1Y) >= -18) && ((ballY - bar1Y) < 20) || ((ballY - bar2Y) >= -18) && ((ballY - bar2Y) < 20)){
			isLEFT = !isLEFT;
			num++;
			if(num <= 1){
				ball.style.background = `rgb(${colors[num]})`;
			}else{
				num = 0;
				ball.style.background = `rgb(${colors[num]})`;
			}
		}else{
			Fail();
		}
				console.log("ballY " + ballY, "bar1Y " + bar1Y);
	}
}

const CLICK = b => {

	switch(b){
		case 1:
			if(bar1Y == 15 || bar1Y < 15){
				bar1Y = 14;
			}else{
				bar1Y -= 6
			}
			bar1.style.top = `${bar1Y}%`;
			break;
		case 2:
			if(bar1Y == 80 || bar1Y > 80){
				bar1Y = 81;
			}else{
				bar1Y += 6
			}
			bar1.style.top = `${bar1Y}%`;
			break;
		case 3:
			if(bar2Y == 15 || bar2Y < 15){
				bar2Y = 14;
				bar2.style.top = `${bar2Y}%`;
			}else{
				bar2Y -= 6;
				bar2.style.top = `${bar2Y}%`;
			}
			bar2.style.top = `${bar2Y}%`;
			break;
		case 4:
			if(bar2Y == 80 || bar2Y > 80){
				bar2Y = 81;
			}else{
				bar2Y += 6
			}
			bar2.style.top = `${bar2Y}%`;
			break;
		case 5:
			if(over == true){
				isLEFT = true;
				over = false;
				num = 1;
				ball.style.background = `rgb(${colors[num]})`;
				and();
			}else{ return }
			break;
		case 6:
			if(over == true){
				isLEFT = false;
				over = false;
				num = 0;
				ball.style.background = `rgb(${colors[num]})`;
				and();
			}else{ return }
			break;
	}
}

const Fail = () => {
	clearInterval(interval);
	if(ballX > 50){
		uno += 1;
		document.getElementById("uno").innerHTML = uno;
	}else{
		dos += 1;
		document.getElementById("dos").innerHTML = dos;
	}
	if(uno > 4 || dos > 4){
		clearInterval(interval);
		uno = 0; dos = 0;
		ballX = 50; ballY = 50;
		ball.style.top = `${ballY}`;
		ball.style.left = `${ballX}`;
		document.getElementById("uno").innerHTML = uno;
		document.getElementById("dos").innerHTML = dos;
		start = false;
		alert((uno > dos) ? "El jugador rojo es el ganador": "El jugador azul es el ganador");
		plusY = 1.5;
		plusX = 2;
		over = true;
		return;
	}
	start = false;
	ballX = 50;
	ballY = 50;
	setTimeout(() => and(), 1000);
}

const press = (a) => {
	if(a.key == "L" || a.key == "l"){
		if(bar2Y == 80 || bar2Y > 80){
			bar2Y = 81;
		}else{
			bar2Y += 6
		}
		bar2.style.top = `${bar2Y}%`;
	}
	if(a.key == "O" || a.key == "o"){
		if(bar2Y == 15 || bar2Y < 15){
			bar2Y = 14;
		}else{
			bar2Y -= 6
		}
		bar2.style.top = `${bar2Y}%`;
	}
		
	if(a.key == "S" || a.key == "s"){
		if(bar1Y == 80 || bar1Y > 80){
			bar1Y = 81;
		}else{
			bar1Y += 6
		}
		bar1.style.top = `${bar1Y}%`;
	}
	if(a.key == "W" || a.key == "w"){
		if(bar1Y == 15 || bar1Y < 15){
			bar1Y = 14;
		}else{
			bar1Y -= 6
	}
	bar1.style.top = `${bar1Y}%`;
	}
	if(a.key == "D" || a.key == "d"){
		CLICK(5);
	}
	if(a.key == "K" || a.key == "k"){
		CLICK(6);
	}
}
		
const Game = () => {
	if(speed == 200){
		if(plusX <= 3){
			plusX += 0.10;
			plusY += 0.5;
		}else{
			plusX = plusX;
			plusY = plusY;
		}
		speed = 0;
	}else{ speed++ }
	if(isTOP == false && isLEFT == true){
		ballX += plusX;
		ballY += plusY;
	}
	if(isTOP == true && isLEFT == false){
		ballX -= plusX;
		ballY -= plusY;
		if(ballY < plusY / 2){
			isTOP = false;
		}
	}
	if(isTOP == true && isLEFT == true){
		ballX += plusX;
		ballY -= plusY;
		if(ballY < plusY / 2){
			isTOP = false;
		}
	}
	if(isTOP == false && isLEFT == false){
		ballX -= plusX;
		ballY += plusY;
	}
	Evaluar();
	X();
	console.log(plusX);
	ball.style.left = `${ballX}%`;
	ball.style.top = `${ballY}%`;
}

document.addEventListener("keydown", press);
