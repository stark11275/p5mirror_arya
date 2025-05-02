function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220, 255, 220);
  rectMode(CENTER);
  fill(200, 100, 70);
  stroke(0, 0, 255);
  strokeWeight(5);
  rect(200, 200, 150, 150);

  ellipseMode(CENTER);
  fill(100, 130, 100);
  stroke(0, 255, 255);
  strokeWeight(2)
  ellipse(200, 200, 75, 75);
}
