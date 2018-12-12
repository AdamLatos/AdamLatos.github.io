const shoal = [];

class Fish {
  constructor(x,y) {
    this.loc = createVector(x,y);
    this.vel = createVector(0,2);
    this.acc = createVector(0,0);
    this.maxVel = 4;
    this.maxForce = 0.04;
  }

  show() {
    push();
    translate(this.loc.x, this.loc.y);
    rotate(atan2(this.vel.y,this.vel.x));
    ellipse(0, 0, 20,5);
    triangle(-10,0,-15,3,-15,-3);
    pop();
  }

  move() {
    this.loc.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);


    this.acc.set(0.3*random(-1,1),0.3*random(-1,1))

    if(this.loc.x > width+20) {
      this.loc.x = -20;
    } 
    if(this.loc.x < -20) {
      this.loc.x = width+20;
    } 
    if(this.loc.y > height+20) {
      this.loc.y = -20;
    } 
    if(this.loc.y < -20) {
      this.loc.y = height+20;
    } 
  }
}

function setup() {
  createCanvas(640, 480);
  fish = new Fish(width/2, height/2);
  for (let i=0; i<10; i++) {
    shoal.push(new Fish(random(width/4,width/2), random(height/4,height/2)));
  }
}

function draw() {
  background(30, 60, 100);
  for (let fish of shoal) {
    fish.move();
    fish.show();
  }
}
