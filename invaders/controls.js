var controls = {
    rightPressed: false,
    leftPressed: false,
    spacePressed: false,
    rPressed: false,
}

function keyDownHandler(e) {
    if(e.key === "ArrowRight") {
        controls.rightPressed = true;
    }
    else if(e.key === "ArrowLeft") {
        controls.leftPressed = true;
    }
    else if(e.key === " ") {
        controls.spacePressed = true;
    }
    else if(e.key === "r") {
        controls.rPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key === "ArrowRight") {
        controls.rightPressed = false;
    }
    else if(e.key === "ArrowLeft") {
        controls.leftPressed = false;
    }
    else if(e.key === " ") {
        controls.spacePressed = false;
    }
    else if(e.key === "r") {
        controls.rPressed = false;
    }
}
