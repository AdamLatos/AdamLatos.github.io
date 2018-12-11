function Bullet(x,y) {
	this.x = x;
	this.y = y;

	this.show = function() {
		ctx.fillStyle = "white";
		ctx.beginPath();
	    ctx.arc(this.x,this.y,8,0,Math.PI*2,true); // Outer circle
	    ctx.arc(this.x,this.y-3,8,0,Math.PI*2,true); // Outer circle
	    ctx.arc(this.x,this.y-6,8,0,Math.PI*2,true); // Outer circle
	    ctx.arc(this.x,this.y-9,8,0,Math.PI*2,true); // Outer circle

	    ctx.fill();
	}

	this.move = function() {
		this.y -= 6;
	}
}