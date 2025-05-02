let fragments = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Comic Sans MS");
  textSize(28);
  noStroke();

  createFragments();
}

function draw() {
  background(20, 20, 30, 40); // soft trail

  for (let frag of fragments) {
    push();
    translate(frag.x, frag.y);
    rotate(frag.angle);
    fill(255, frag.opacity);
    textSize(frag.size);
    text(frag.text, 0, 0);
    pop();

    frag.x += frag.dx * frag.layer;
    frag.y += frag.dy * frag.layer;
    frag.angle += frag.angleSpeed;

    // Wrap text around screen edges
    if (frag.x > width + 100) frag.x = -100;
    if (frag.x < -100) frag.x = width + 100;
    if (frag.y > height + 50) frag.y = -50;
    if (frag.y < -50) frag.y = height + 50;
  }
}

function createFragments() {
  let phrases = [
    "I miss you.",
    "Still thinking of you.",
    "We weren’t ready.",
    "You never knew.",
    "Wish I had said more...",
    "Love felt like home.",
    "I held it in."
  ];

  for (let i = 0; i < 40; i++) {
    fragments.push({
      text: random(phrases),
      x: random(width),
      y: random(height),
      dx: random(-0.6, 0.6),
      dy: random(-0.4, 0.4),
      size: random(22, 36),
      opacity: random(40, 120),
      layer: random(0.95, 1.05),
      angle: random(-0.02, 0.02),
      angleSpeed: random(-0.001, 0.001)
    });
  }
}
