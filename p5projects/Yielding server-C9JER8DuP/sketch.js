let startTime;
let isAccelerated = false;
let accelerateDuration = 60000; // 1 minute in accelerated mode
let normalDuration = 60000; // 1 minute in normal mode
let speedMultiplier = 6; // Speed up by a factor of 6 in accelerated mode

function setup() {
  createCanvas(400, 400);
  startTime = millis();
  angleMode(DEGREES);
}

function draw() {
  background(0);

  // Calculate elapsed time since the current cycle started
  let elapsed = millis() - startTime;

  if (!isAccelerated && elapsed >= normalDuration) {
    // Switch to accelerated mode
    isAccelerated = true;
    startTime = millis(); // Reset the start time
  } else if (isAccelerated && elapsed >= accelerateDuration) {
    // Switch back to normal mode
    isAccelerated = false;
    startTime = millis(); // Reset the start time
  }

  // Determine the speed
  let speed = isAccelerated ? speedMultiplier : 1;

  // Draw cubic, colorful clock
  drawClock(speed);
}

function drawClock(speed) {
  // Translate to the center
  translate(width / 2, height / 2);

  // Colorful, cubic design elements
  fill(150, 100, 255);
  stroke(255);
  strokeWeight(5);
  rectMode(CENTER);
  rect(0, 0, 300, 300); // Clock base

  // Get current time
  let hr = hour();
  let mn = minute();
  let sc = second() + (millis() % 1000) / 1000; // Add smooth seconds

  // Adjust time by the speed multiplier
  sc = (sc * speed) % 60;
  mn = (mn * speed + floor(sc / 60)) % 60;
  hr = (hr % 12) + mn / 60; // 12-hour format, and adjust for smooth minutes

  // Hour hand
  push();
  stroke(255, 204, 100);
  strokeWeight(8);
  rotate(map(hr % 12, 0, 12, 0, 360));
  line(0, 0, 50, 0);
  pop();

  // Minute hand
  push();
  stroke(100, 255, 204);
  strokeWeight(6);
  rotate(map(mn, 0, 60, 0, 360));
  line(0, 0, 80, 0);
  pop();

  // Second hand
  push();
  stroke(255, 100, 150);
  strokeWeight(4);
  rotate(map(sc, 0, 60, 0, 360));
  line(0, 0, 100, 0);
  pop();

  // Central point
  fill(255, 100, 204);
  ellipse(0, 0, 10, 10);
}
