function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  fill(100, 100, 0);
  ellipse(170, 350, 150, 200);

  fill(70, 20, 0);
  rect(70, 60, 180, 238, 28);

  fill(100, 100, 0);
  ellipse(200, 300, 60, 100);

  fill(200, 100, 100);
  ellipseMode(CENTER);
  circle(150, 150, 150);

  fill(0, 0, 100);
  stroke(0, 0, 0);

  ellipse(100, 150, 20);
  ellipse(150, 150, 20);

  fill(255, 255, 255);
  stroke(0, 0, 0);

  ellipse(105, 150, 13);

  fill(255, 255, 255);
  stroke(0, 0, 0);
  ellipse(155, 150, 13);

  fill(0, 0, 255);
  triangle(120, 180, 120, 170, 110, 180);
  fill(100, 0, 0, 0);
  stroke(5);
  arc(120, 190, 50, 50, 0, HALF_PI);

  fill(70, 20, 0);
  noStroke();
  ellipse(200, 100, 100, 75);

  fill(200, 100, 100);
  ellipse(200, 375, 30, 30);
}
