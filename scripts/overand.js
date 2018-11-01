var canvas = document.getElementById('myCanvas')
var ctx = canvas.getContext('2d');
var ctxtext = canvas.getContext('2d');
//ctx.translate(0,canvas.height); 
//ctx.scale(1,-1);


function init() {
    window.requestAnimationFrame(draw);
    player.img = new Image(48,16*48);
    player.img.src = "images/sprites/bear.png";
}

var player = {
    x: 40,
    y: 400,
    dx: 0,
    dy: 0,
    size: 48,
    color: "black",
    img: 0,
    direction: 1,
    state: 2,
    //draw: function () {
    //    ctx.beginPath();
    //    ctx.rect(this.x, this.y, this.size, this.size);
    //    ctx.closePath();
    //    ctx.fillStyle = this.color;
    //   ctx.fill();
    //},
    draw: function () {
        if(this.dx<0){
            this.direction = 0;
            this.state += 1;
        }
        if(this.dx>0){
            this.direction = 1;
            this.state += 1;
        }
        if(this.dx==0){
            this.state = 13 - 11*this.direction;
        }
        this.state = this.state%16;
        ctx.drawImage(this.img,this.state*48,this.direction*48,48,48,this.x-4,this.y,this.size+8,this.size+8);
    },
    win: 0,
    reset: function () {
        this.x = 40,
        this.y = 400,
        this.dx = 0,
        this.dy = 0,
        this.size = 48,
        this.color = "black",
        this.win = 0;
    }
}

var tile = {
    color: "blue",
    x: 0,
    y: 0,
    tsize: 48,
    draw: function() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.tsize, this.tsize);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

var tilemap = {
    rows: 10,
    cols: 20,
    tsize: 48,
    layers: [[
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 1, 1, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0,  0, 0, 2, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 0, 0, 1, 1, 1, 1, 1,  1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1,  1, 1, 1, 1, 1, 1, 1, 1, 1, 1,

    ]],
    getTile: function(layer, row, col) {
        return this.layers[layer][row * tilemap.cols + col];
    },

    drawLayer: function(layer) {
        for (var c = 0; c < this.cols; c++) {
            for (var r = 0; r < this.rows; r++) {
                var newTile = tilemap.getTile(layer, r, c);
                switch(newTile) {
                    case 1:
                        tile.color = "DarkSlateGray"
                        tile.x = c*this.tsize;
                        tile.y = r*this.tsize;
                        tile.tsize = this.tsize;
                        tile.draw();
                        break;
                    case 2:
                        tile.color = "DarkGreen"
                        tile.x = c*this.tsize;
                        tile.y = r*this.tsize;
                        tile.tsize = this.tsize;
                        tile.draw();
                        break;
                    default:
                        break;
                }
            }
        }

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

function movePlayer() {

    var newX = player.x + player.dx;
    var newY = player.y //+ player.dy;

    //check against 4 tiles
    X1 = Math.floor(newX/tilemap.tsize);
    X2 = Math.ceil(newX/tilemap.tsize);
    Y1 = Math.floor(newY/tilemap.tsize);
    Y2 = Math.ceil(newY/tilemap.tsize);

    var upLeft = tilemap.getTile(0,Y1,X1);
    var upRight = tilemap.getTile(0,Y1,X2);
    var downLeft = tilemap.getTile(0,Y2,X1);
    var downRight = tilemap.getTile(0,Y2,X2);

    var win = 0;

    // win condition
    if(downLeft == 2 || downRight == 2 || upLeft == 2 || upRight == 2){
        win = 1;
    }

    // right collision
    if(upRight == 1){
        player.dx = 0;
        newX = X1*tilemap.tsize;
    }

    // left collision
    if(upLeft == 1){
        player.dx = 0;
        newX = X2*tilemap.tsize;
    }

    var newY = player.y + player.dy;

    X1 = Math.floor(newX/tilemap.tsize);
    X2 = Math.ceil(newX/tilemap.tsize);
    Y1 = Math.floor(newY/tilemap.tsize);
    Y2 = Math.ceil(newY/tilemap.tsize);
    var upLeft = tilemap.getTile(0,Y1,X1);
    var upRight = tilemap.getTile(0,Y1,X2);
    var downLeft = tilemap.getTile(0,Y2,X1);
    var downRight = tilemap.getTile(0,Y2,X2);

    // gravity
    if(downLeft == 1 || downRight == 1){
        player.dy = 0;
        newY = Y1*tilemap.tsize;
        if(controls.upPressed){
            player.dy = -25;
        }
    } else {
        player.dy += 2;
    }

    // head collision
    if(upLeft == 1 || upRight == 1){
        player.dy = 2;
        newY = Y2*tilemap.tsize;
    }



    if(newX < 0){
        player.dx = 0;
        newX = 0;
    }

    // right/left movement
    if(controls.rightPressed){
        player.x += 4;
        player.dx += 2;
    }
    if(controls.leftPressed){
        player.x -= 4;
        player.dx -= 2;
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

    player.x = newX;
    player.y = newY;

    if(win == 1){
        ctx.font = "100px Arial";
        ctx.fillStyle = "Green";
        ctx.textAlign="center"; 
        ctx.fillText("YOU WON!",320,150);
        ctx.font = "20px Arial"
        ctx.fillText("to restart press space",320,200);
        return 1;
    }
    return 0;
}

function draw() {
    if (player.win){
        if(controls.spacePressed == 1){
            player.reset();
            player.win = 0;
        }
    }
    else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //floor.draw();
    tilemap.drawLayer(0);
    player.win = movePlayer();
    player.draw();
    }
    window.requestAnimationFrame(draw);
}

$( document ).ready(function() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    init();
});