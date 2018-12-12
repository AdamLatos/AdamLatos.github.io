const shoal = [];

class Fish {
  constructor(x,y) {
    this.loc = createVector(x,y);
    this.vel = createVector(0,2);
    this.acc = createVector(0,0);
    this.maxVel = 4;
    this.maxForce = 0.4;
    this.area = 50;
  }

  show() {
    push();
    translate(this.loc.x, this.loc.y);
    rotate(atan2(this.vel.y,this.vel.x));
    ellipse(0, 0, 20,5);
    triangle(-10,0,-15,3,-15,-3);
    pop();
  }

  setAcc() {
    let attraction = createVector(0,0);
    for (fish of shoal) {
      if (this.loc.dist(fish.loc) < this.area) {
        attraction.add(fish.loc.sub(this.loc));
      }
      attraction.limit(this.maxForce);
      this.acc.set(attraction);
    }
  }

  move() {
    this.loc.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);

    this.acc.set(0.3*random(-1,1),0.3*random(-1,1))
    //this.setAcc();

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
    shoal.push(new Fish(random(0,width), random(0,height)));
  }
}

function draw() {
  background(30, 60, 100);
  for (let fish of shoal) {
    fish.move();
    fish.show();
  }
}
