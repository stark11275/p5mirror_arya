// Styling & Interaction: Letters & Liminal Spaces + Simulated Poetic Prompt Generator
// Libraries needed: p5.js (run locally or in p5 Web Editor)

let prompt = "What’s something you never got to say?";
let userInput = "";
let showPrompt = true;
let waiting = false;
let fadeIn = 0;
let cursorVisible = true;
let lastBlink = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Georgia");
  textSize(26);
  textAlign(CENTER, CENTER);
  fill(255);
  noCursor();
}

function draw() {
  background(245, 240, 235); // Soft paper tone
  fadeIn = min(fadeIn + 1, 255);

  drawPaperTexture();

  if (showPrompt) {
    fill(60, 40, 70, fadeIn);
    textSize(30);
    text("“" + prompt + "”", width / 2, height / 3);

    fill(80, 60, 90, 230);
    textSize(24);
    let cursor = cursorVisible ? "|" : " ";
    text("→ " + userInput + cursor, width / 2, height / 1.8);
  } else {
    fill(90, 70, 110);
    textSize(22);
    text("...generating the next question", width / 2, height / 2);
  }

  // Cursor blink every 500ms
  if (millis() - lastBlink > 500) {
    cursorVisible = !cursorVisible;
    lastBlink = millis();
  }
}

function keyPressed() {
  if (!showPrompt || waiting) return;

  if (keyCode === BACKSPACE) {
    userInput = userInput.slice(0, -1);
  } else if (keyCode === ENTER || keyCode === RETURN) {
    showPrompt = false;
    waiting = true;

    // Simulated poetic generator (no API)
    generateNextPrompt(userInput).then(newPrompt => {
      prompt = newPrompt;
      userInput = "";
      fadeIn = 0;
      showPrompt = true;
      waiting = false;
    });
  } else if (key.length === 1) {
    userInput += key;
  }
}

// VISUAL STYLE: Handmade paper background
function drawPaperTexture() {
  noStroke();
  for (let i = 0; i < 100; i++) {
    fill(255, 240, 230, 3);
    ellipse(random(width), random(height), random(1, 3));
  }
}

// Simulated poetic prompt generator
async function generateNextPrompt(inputText) {
  let prompts = [
    "What became of that silence?",
    "When did it start to matter to you?",
    "What would you say if no one could hear you?",
    "How do you carry that memory today?",
    "If they could hear you now, what would you say?",
    "What do you hope they felt, too?",
    "Where does that story live in your body?"
  ];
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(random(prompts));
    }, 2000);
  });
}