var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d"),
	width = canvas.width = 700,//window.innerWidth,
	height = canvas.height = 500;//window.innerHeight;

var enemyColours = ["red", "green", "blue", "purple", "goldenrod", "olive", "seagreen"],
	enemies = [],
	bullets = [],
	ship;
	stages = [stage2, stage3];
	stage = 0;
var dir = 1;

function init() {

	ship = new Ship();

	for(i=0; i<5; i++){
		enemy = new Enemy(100+i*100, 100, enemyColours[Math.floor(Math.random() * enemyColours.length)], 1 );
		enemies.push(enemy);
	}
	document.addEventListener("keydown", keyDownHandler);
	document.addEventListener("keyup", keyUpHandler);
	window.requestAnimationFrame(draw);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "rgb(30,50,70)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	if(controls.spacePressed === true){
		bullet = new Bullet(ship.x, ship.y);
		bullets.push(bullet);
		controls.spacePressed = false;		
	}

	//randLine();
	ship.move();
	ship.show();



	if(dir == 1 && enemies[enemies.length-1].x > (width-50) ){
		dir = -1;
		for(i=0; i<enemies.length; i++) {
			enemies[i].movey();
		}
	//	enemies = enemies.map( x => x.movey );
	}
	else if(dir == -1 && enemies[0].x < 50) {
		dir = 1;
		for(i=0; i<enemies.length; i++) {
			enemies[i].movey();
		}
	//	enemies = enemies.map( x => x.movey );
	}

	for(i=enemies.length-1; i>=0; i--) {
		enemies[i].movex(dir);
		enemies[i].show();

		if(enemies[i].y < -50){
			enemies.splice(i,1);
			break;
		}
	}

	for(i=bullets.length-1; i>=0; i--) {
		bullets[i].move()
		bullets[i].show();

		if(bullets[i].y < -20){
			bullets.splice(i,1);
			break;
		}
	}

	for(i=bullets.length-1; i>=0; i--) {
		for(j=0; j<enemies.length; j++) {
			var dx = (enemies[j].x-bullets[i].x);
			var dy = (enemies[j].y-bullets[i].y);
			if(Math.sqrt(dx*dx + dy*dy) < 30) {
				enemies[j].sad = false;
				bullets.splice(i,1);
				break;
			}
		}
	}

	if (enemies === undefined || enemies.length == 0) {
  		ctx.font = "30px Arial";
  		ctx.fillStyle = "green";
		ctx.fillText("Stage Complete. press 'r'",20,50);
		window.requestAnimationFrame(randLine);
	}
	else {
		 ctx.font = "20px Arial";
  		ctx.fillStyle = "white";
		ctx.fillText("Start",20,40);
		window.requestAnimationFrame(draw);
	}
}

window.onload = function() {
	init();
};

function randLine() {

	ctx.beginPath();
	ctx.moveTo(Math.random() * width, Math.random() * height);
	ctx.lineTo(Math.random() * width, Math.random() * height);
	ctx.strokeStyle = "white";
	ctx.stroke();
	
	ctx.fillStyle = "grey";
	ctx.fillRect(15,20,350,40);
	ctx.fillStyle = "black";
	ctx.fillText("Stage Complete. press 'r'",20,50);

	if(controls.rPressed) {
		stages[stage]();
	}
	else {
		window.requestAnimationFrame(randLine);
	}
}

function stage2() {
	stage = 1;
	ship = new Ship();
	bullets = [];
	for(i=0; i<5; i++){
		enemy = new Enemy(100+i*100, 100, enemyColours[Math.floor(Math.random() * enemyColours.length)] ,2);
		enemies.push(enemy);
	}
	window.requestAnimationFrame(draw);
}

function stage3() {
	stage = 0;
	ship = new Ship();
	bullets = [];
	enemy = new Enemy(width/2, 150, enemyColours[Math.floor(Math.random() * enemyColours.length)] ,3);
	enemies.push(enemy);

	window.requestAnimationFrame(draw);
}
