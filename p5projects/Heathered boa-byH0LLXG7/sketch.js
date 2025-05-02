let video;
let handpose;
let predictions = [];

let floatingWords = [];
let poeticLines = [
  "Love is a language with no native speaker.",
  "What you touched remembered you.",
  "Some words don’t wait to be read.",
  "Even silence was trying to say something.",
  "You arrived before the sentence ended.",
  "It meant something, even briefly.",
];

let activeLine = "";
let showLineUntil = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Georgia");
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {
    predictions = results;
  });

  // Generate random floating words
  let words = ["almost", "before", "pause", "touch", "never", "again", "stay"];
  for (let w of words) {
    floatingWords.push({
      word: w,
      x: random(width),
      y: random(height),
      speed: random(0.3, 1),
    });
  }

  textAlign(CENTER, CENTER);
}

function modelReady() {
  console.log("Handpose model ready!");
}

function draw() {
  background(15);

  drawVideoMirrored();
  drawFloatingWords();
  checkFingerTouch();

  // Show revealed poetic line
  if (millis() < showLineUntil) {
    fill(255);
    textSize(24);
    text(activeLine, width / 2, height - 60);
  }
}

function drawVideoMirrored() {
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();
}

function drawFloatingWords() {
  fill(255);
  textSize(32);
  for (let wordObj of floatingWords) {
    wordObj.x += wordObj.speed;
    if (wordObj.x > width + 100) {
      wordObj.x = -100;
      wordObj.y = random(height);
    }
    text(wordObj.word, wordObj.x, wordObj.y);
  }
}

function checkFingerTouch() {
  if (predictions.length > 0) {
    let hand = predictions[0];
    let tipIndices = [4, 8, 12, 16, 20]; // fingertips

    for (let idx of tipIndices) {
      let [x, y] = hand.landmarks[idx];
      let mirroredX = width - x;

      for (let wordObj of floatingWords) {
        let wordWidth = textWidth(wordObj.word);
        let wordHeight = 32;
        if (
          mirroredX > wordObj.x - wordWidth / 2 &&
          mirroredX < wordObj.x + wordWidth / 2 &&
          y > wordObj.y - wordHeight / 2 &&
          y < wordObj.y + wordHeight / 2
        ) {
          // trigger a new poetic line
          activeLine = random(poeticLines);
          showLineUntil = millis() + 4000; // show for 4 seconds
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}