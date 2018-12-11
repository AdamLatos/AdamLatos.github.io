function Ship() {
	this.x = width/2;
	this.y = 420;
	this.colour = "rgb(120,100,120)";

	this.show = function() {
		ctx.beginPath();
		ctx.moveTo(this.x - 20, this.y + 40);
		ctx.lineTo(this.x + 20, this.y + 40);
		ctx.lineTo(this.x, this.y);
		ctx.fillStyle = this.colour;
		ctx.fill();
	}

	this.move = function() {
		if(controls.rightPressed === true){
			this.x += 5;
		}
		if(controls.leftPressed === true){
			this.x -= 5;
		}	
	}
}