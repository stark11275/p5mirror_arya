let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Load PoseNet
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
}

function modelReady() {
  console.log("PoseNet is ready!");
}

function draw() {
  background(0);

  // Mirror the video
  push();
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0, width, height);
  pop();

  drawNose();
}

function drawNose() {
  if (poses.length > 0) {
    let nose = poses[0].pose.nose;
    if (nose.confidence > 0.3) {
      fill(255, 0, 0);
      noStroke();
      ellipse(nose.x, nose.y, 30);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
