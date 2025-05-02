// Letters & Liminal Spaces — Multi-step Projection Interaction
// Includes: floating archive intro, handwritten-style prompt, QR code reveal, and silhouette transformation

let prompt = "What’s something you never got to say?";
let userInput = "";
let responses = [];
let cursorVisible = true;
let lastBlink = 0;
let phase = 0; // 0 = intro floating text, 1 = prompt, 2 = QR + input on phone, 3 = silhouette
let introStart;
let promptDisplayed = false;
let qrImg; // placeholder QR image

function preload() {
  qrImg = loadImage("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://your-input-form-url.com");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Georgia");
  textAlign(CENTER, CENTER);
  fill(255);
  noCursor();
  introStart = millis();
}

function draw() {
  background(30);
  drawDistortedArchive();

  if (phase === 0 && millis() - introStart > 120000) {
    phase = 1;
    fadeIn = 0;
  }

  if (phase === 1) drawPrompt();
  else if (phase === 2) drawQR();
  else if (phase === 3) drawSilhouetteText();

  if (millis() - lastBlink > 500) {
    cursorVisible = !cursorVisible;
    lastBlink = millis();
  }
}

function drawDistortedArchive() {
  if (phase > 0) return;
  push();
  textSize(24);
  fill(255, 80);
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = random(height);
    let rotation = random(-0.05, 0.05);
    let fragment = random(["I miss you.", "Wish I had said more...", "Love felt like home.", "You never knew.", "I held it in.", "We weren’t ready.", "Still thinking of you."]);
    push();
    translate(x, y);
    rotate(rotation);
    text(fragment, 0, 0);
    pop();
  }
  pop();
}

function drawPrompt() {
  background(30);
  textSize(28);
  fill(255);
  text("“" + prompt + "”", width / 2, height / 2);
  if (!promptDisplayed) {
    setTimeout(() => phase = 2, 8000);
    promptDisplayed = true;
  }
}

function drawQR() {
  background(30);
  textSize(20);
  fill(200);
  text("Scan to respond:", width / 2, height / 2 - 120);
  image(qrImg, width / 2 - 75, height / 2 - 75, 150, 150);
  text("After submitting, your words become your silhouette.", width / 2, height / 2 + 100);
  // simulate input completion after 15s
  if (millis() - introStart > 150000) {
    responses.push("You reminded me of someone I used to love.");
    phase = 3;
  }
}

function drawSilhouetteText() {
  background(0);
  textSize(18);
  fill(255);
  let textShape = responses[responses.length - 1];
  let cols = 20;
  let spacing = width / cols;
  for (let i = 0; i < textShape.length; i++) {
    let x = (i % cols) * spacing;
    let y = floor(i / cols) * 40 + 100;
    if (y < height - 40) {
      text(textShape[i], x + spacing / 2, y);
    }
  }
}

// Optional: let ENTER key fast-forward for testing
function keyPressed() {
  if (keyCode === ENTER) phase++;
}
