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
        if(this.x < 0){
            this.x = 0;
        } else if (this.x + this.size > canvas.width) {
            this.x = canvas.width - this.size
        }
        if(this.y < 40){
            this.y = 40;
        } else if (this.y + this.size > canvas.height) {
            this.y = canvas.height - this.size
        }
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

    if (player.y > 40) {
        player.dy += -1;
    }

    if(controls.rightPressed){
        player.x += 4;
        player.dx += 2;
    }
    if(controls.leftPressed){
        player.x -= 4;
        player.dx -= 2;
    }
    if(controls.upPressed && player.y <= 45){
        player.dy += 25;
    }
    player.x += player.dx;
    player.y += player.dy;
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

    window.requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
init();