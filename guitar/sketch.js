const frequencies = [330,247,196,147,110,82];
let filter = new p5.LowPass();

class GuitarString {

  constructor(n,osc) {
    this.n = n;
    this.y = 0;
    this.osc = new p5.Oscillator();
    this.osc.setType('sawtooth');
    this.osc.freq(frequencies[n-1]);
    this.osc.amp(0);
    this.osc.disconnect();
    this.osc.connect(filter);
    this.osc.start();
  }

  show() {
    stroke(100, 100, 0);
    strokeWeight(1 + this.n * 0.5);
    line(0, 60 + this.n * 40 + this.y, width, 60 + this.n * 40 + this.y);
  }

  pluck(force) {
    this.y = force;
    this.osc.amp(0.5, 0.2, 0);
    this.osc.amp(0, 1, 0.5);
  }

  update() {
    if ( this.y == 0 ) {
      return;
    }
    else if (this.y < 0) {
      this.y = -this.y-0.2;
    }
    else if (this.y > 0){
      this.y = -this.y+0.2;
    } 
  }

}

const strings = [];

function setup() {
  createCanvas(600, 400);
  for (let i = 1; i <= 6; i++) {
    strings.push(new GuitarString(i));
  }
  //filter.res(500);
  //filter.freq(10000);
}

function draw() {
  background(60, 30, 5);
  fill(0);
  noStroke();
  ellipse(width / 2, height / 2, 300);

  for (let guitarString of strings) {
    guitarString.update();
    guitarString.show();
  }


}

function keyPressed() {
  if (key == "q") {
    strings[0].pluck(15);
  }
  if (key == "w") {
    strings[1].pluck(15);
  }
  if (key == "e") {
    strings[2].pluck(15);
  }
  if (key == "r") {
    strings[3].pluck(15);
  }
  if (key == "t") {
    strings[4].pluck(15);
  }
  if (key == "y") {
    strings[5].pluck(15);
  }
}