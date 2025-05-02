let startTime;
let isAccelerated = false;
let accelerateDuration = 60000; // 1 minute in accelerated mode
let normalDuration = 60000; // 1 minute in normal mode
let speedMultiplier = 6; // Speed up by a factor of 6 in accelerated mode
let clockSize = 150; // Size of each clock
let cols, rows; // Number of columns and rows of clocks
let clocks = []; // Store clocks with unique time offsets and colors

function setup() {
  createCanvas(600, 600);
  cols = floor(width / clockSize); // Calculate how many columns of clocks fit
  rows = floor(height / clockSize); // Calculate how many rows of clocks fit

  // Initialize each clock with a random time and a random color
  for (let i = 0; i < cols * rows; i++) {
    let randomHr = floor(random(12)); // Random hour between 0 and 11
    let randomMn = floor(random(60)); // Random minute between 0 and 59
    let randomSc = floor(random(60)); // Random second between 0 and 59
    let clockColor = color(random(255), random(255), random(255)); // Avoid conflict with 'color' function
    clocks.push({ hr: randomHr, mn: randomMn, sc: randomSc, clockColor: clockColor });
  }

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

  // Loop through each clock and draw it in the grid
  let clockIndex = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * clockSize + clockSize / 2;
      let y = j * clockSize + clockSize / 2;
      let clock = clocks[clockIndex]; // Get the clock with its unique time and color
      drawClock(x, y, clockSize, speed, clock.clockColor, clock.hr, clock.mn, clock.sc);
      clockIndex++;
    }
  }
}

function drawClock(x, y, size, speed, c, hrOffset, mnOffset, scOffset) {
  push();
  translate(x, y);

  // Colorful, cubic design elements
  fill(c);
  stroke(255);
  strokeWeight(5);
  rectMode(CENTER);
  rect(0, 0, size, size); // Clock base

  // Get current time
  let hr = hour() + hrOffset;
  let mn = minute() + mnOffset;
  let sc = second() + scOffset + (millis() % 1000) / 1000; // Add smooth seconds

  // Adjust time by the speed multiplier
  sc = (sc * speed) % 60;
  mn = (mn * speed + floor(sc / 60)) % 60;
  hr = (hr % 12) + mn / 60; // 12-hour format, and adjust for smooth minutes

  // Hour hand
  push();
  stroke(255, 204, 100);
  strokeWeight(8);
  rotate(map(hr % 12, 0, 12, 0, 360));
  line(0, 0, size * 0.2, 0);
  pop();

  // Minute hand
  push();
  stroke(100, 255, 204);
  strokeWeight(6);
  rotate(map(mn, 0, 60, 0, 360));
  line(0, 0, size * 0.3, 0);
  pop();

  // Second hand
  push();
  stroke(255, 100, 150);
  strokeWeight(4);
  rotate(map(sc, 0, 60, 0, 360));
  line(0, 0, size * 0.4, 0);
  pop();

  // Central point
  fill(255, 100, 204);
  ellipse(0, 0, size * 0.05, size * 0.05);

  pop();
}
