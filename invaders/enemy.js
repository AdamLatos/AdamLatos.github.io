function Enemy(x,y,colour,stage) {
	this.x = x;
	this.y = y;
	this.colour = colour;
	this.sad = true;
	this.stage = stage;
	this.cnt = 0;
	this.scale = 1;

	this.movex = function(dir) {

		this.x += dir*1;

		if(stage==2) {
			if (this.cnt < 20){
				this.y -= 1;
			}
			else if (this.cnt < 40){
				this.y += 1;
			}
			else {
				this.cnt = 0;
			}
		}

		if(this.sad == false) {
			this.y -= 5;
			this.x -= Math.floor(Math.random(-5,5));
		}

		this.cnt += 1;
	}

	this.movey = function() {
		this.y += 20;
	}

	this.show = function() {

		if(this.stage == 3) {
			this.scale = 2;
		}

		ctx.fillStyle = this.colour;
		ctx.beginPath();
	    ctx.arc(this.x,this.y,24*this.scale,0,Math.PI*2,true); // Outer circle
	    ctx.fill();

		ctx.fillStyle = "black";
	    ctx.beginPath();
	    //ctx.moveTo(this.x,this.y+10);
	    if(this.sad == true){
	    	ctx.arc(this.x,this.y+16*this.scale,16*this.scale,0,Math.PI,true);  // Mouth (clockwise)
	    	ctx.fill();
	    }
	    else {
	    	ctx.arc(this.x,this.y,16*this.scale,0,Math.PI,false);  // Mouth (clockwise)
	    	ctx.fill();
	    }

		ctx.fillStyle = "white";
	    ctx.beginPath();
	    //ctx.moveTo(this.x-10,this.y-10);
	    ctx.arc(this.x-10*this.scale,this.y-10*this.scale,7*this.scale,0,Math.PI*2,true);  // Left eye
	    //ctx.moveTo(this.x+10,this.y-10);
	    ctx.arc(this.x+10*this.scale,this.y-10*this.scale,7*this.scale,0,Math.PI*2,true);  // Right eye
	    ctx.fill();

	    var dx,dy;
	    dx = (-this.x+ship.x);
	    dy = (-this.y+ship.y);
	    var norm = Math.sqrt(dx * dx + dy * dy);
	    dx = Math.floor(4*dx/norm);
	    dy = Math.floor(4*dy/norm);

	    ctx.beginPath();
	    ctx.fillStyle = "black";
	    //ctx.moveTo(this.x-10+5,this.y-10);
	    ctx.arc(this.x-10*this.scale+dx,this.y-10*this.scale+dy,3*this.scale,0,Math.PI*2,true);
	    //ctx.moveTo(this.x-10+5,this.y-10);
	    ctx.arc(this.x+10*this.scale+dx,this.y-10*this.scale+dy,3*this.scale,0,Math.PI*2,true);
	    ctx.fill();
	}
}