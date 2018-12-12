const shoal = [];
let button;
let enableAlignment = 0;

class Fish {
  constructor(x,y) {
    this.loc = createVector(x,y);
    this.vel = createVector(random(-2,2),random(-2,2));
    this.acc = createVector(0,0);
    this.maxVel = 4;
    this.maxForce = 0.4;
    this.influenceArea = 50;
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
      if (this.loc.dist(fish.loc) < this.influenceArea) {
        attraction.add(fish.loc.sub(this.loc));
      }
      attraction.limit(this.maxForce);
      this.acc.set(attraction);
    }
  }

  cohesion() {
    let target = createVector(0,0);
    for (fish of shoal) {
      if (this.loc.dist(fish.loc) < this.influenceArea) {
        target.add(fish.loc.sub(this.loc));
      }
    }
    target.normalize();
    return target;
  }

  alignment() {
    let target = createVector(0,0);
    for (fish of shoal) {
      if (this.loc.dist(fish.loc) < this.influenceArea) {
        target.add(fish.vel);
      }
    }
    target.normalize();
    return target;
  }

  separation() {

  }

  move() {
    
    this.loc.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);

    //this.acc.set(0.3*random(-1,1),0.3*random(-1,1))
    //this.acc.add(this.cohesion());
    //this.acc.set(0,0);
    this.acc.set(0.3*random(-1,1),0.3*random(-1,1))
    if(enableAlignment) {
      this.acc.set(0.1*random(-1,1),0.1*random(-1,1))
      this.acc.add(this.alignment().mult(0.2));
    }

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

  button = createButton('enableAlignment');
  button.position(19, 19);
  button.mousePressed(function() {enableAlignment=1; button.hide();});
}

function draw() {
  background(30, 60, 100);
  for (let fish of shoal) {
    fish.move();
    fish.show();
  }
}