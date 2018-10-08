var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d');
ctx.translate(0,canvas.height); 
ctx.scale(1,-1);

var player = {
    x: 40,
    y: 80,
    dx: 0,
    dy: -2,
    size: 40,
    color: "black",
    draw: function() {
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
    upPressed: false
}

function init() {
    window.requestAnimationFrame(draw);
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        controls.rightPressed = true;
    }
    else if(e.keyCode == 37) {
        controls.leftPressed = true;
    }
    else if(e.keyCode == 38) {
        controls.upPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        controls.rightPressed = false;
    }
    else if(e.keyCode == 37) {
        controls.leftPressed = false;
    }
    else if(e.keyCode == 38) {
        controls.upPressed = false;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    floor.draw();
    player.draw();
    if(player.y + player.dy > canvas.height || player.y + player.dy < 40) {
        player.dy = 0;
    } else {
        player.dy += -2;
    }
    if(controls.rightPressed){
        player.x += 8;
    }
    if(controls.leftPressed){
        player.x -= 8;
    }
    if(controls.upPressed && player.y <= 40){
        player.dy += 25;
    }
    player.x += player.dx;
    player.y += player.dy;

    window.requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
init();