var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d');
ctx.translate(0,canvas.height); 
ctx.scale(1,-1);

function init() {
    window.requestAnimationFrame(draw);
}

var player = {
    x: 40,
    y: 80,
    dx: 0,
    dy: 0,
    size: 40,
    color: "black",
    draw: function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}


var floor = {
    color: "gray",
    draw: function() {
        ctx.beginPath();
        ctx.rect(0, 0, 800, 40);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

var controls = {
    rightPressed: false,
    leftPressed: false,
    upPressed: false,
    downPressed: false,
    spacePressed: false
}

var keyboardHelper = { left: 37, up: 38, right: 39, down: 40, space: 32};

function keyDownHandler(e) {
    if(e.keyCode == keyboardHelper.right) {
        controls.rightPressed = true;
    }
    else if(e.keyCode == keyboardHelper.left) {
        controls.leftPressed = true;
    }
    else if(e.keyCode == keyboardHelper.up) {
        controls.upPressed = true;
    }
    else if(e.keyCode == keyboardHelper.down) {
        controls.downPressed = true;
    }
    else if(e.keyCode == keyboardHelper.space) {
        controls.spacePressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == keyboardHelper.right) {
        controls.rightPressed = false;
    }
    else if(e.keyCode == keyboardHelper.left) {
        controls.leftPressed = false;
    }
    else if(e.keyCode == keyboardHelper.up) {
        controls.upPressed = false;
    }
    else if(e.keyCode == keyboardHelper.down) {
        controls.downPressed = false;
    }
    else if(e.keyCode == keyboardHelper.space) {
        controls.spacePressed = false;
    }
}

function checkCollision() {
    if(player.y > 40){
        player.dy -= 2;
    } else {
        player.dy = 0;
    }
    if(player.x < 0){
        player.x = 0;
    } else if (player.x + player.size > canvas.width) {
        player.x = canvas.width - player.size
    }
    if(player.y < 40){
        player.y = 40;
    } else if (player.y + player.size > canvas.height) {
        player.y = canvas.height - player.size
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    floor.draw();
    player.draw();





    if(controls.rightPressed){
        player.x += 4;
        player.dx += 2;
    }
    if(controls.leftPressed){
        player.x -= 4;
        player.dx -= 2;
    }
    if(controls.upPressed && player.y == 40){
        player.dy += 25;
    }

    if(player.dx < 0) {
        player.dx += 1;
    } else if(player.dx > 0) {
        player.dx -= 1;
    }

    if(player.dx <= -10) {
        player.dx = -10;
    } else if(player.dx >= 10) {
        player.dx = 10;
    }

    player.x += player.dx;
    player.y += player.dy;

    checkCollision();

    window.requestAnimationFrame(draw);
}

$( document ).ready(function() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    init();
});