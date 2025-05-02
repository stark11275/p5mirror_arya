let particles = [];
let maxParticles = 100;

function setup() {
  createCanvas(600, 600);

  for (let i = 0; i < maxParticles; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(0);

  for (let i = 0; i < maxParticles; i++) {
    particles[i].update();
    particles[i].show();
  }
}

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.speed = createVector(random(-1, 1), random(-5, -1));
    this.size = random(10, 30);
  }

  update() {
    this.position.add(this.speed);

    if (this.position.y > height) {
      this.position.y = 0;
    }
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}
