// Copyright (c) 2023 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

let handpose;
let video;
let hands = [];

function preload() {
  // Load the handpose model.
  handpose = ml5.handpose();
}

function setup() {
  createCanvas(640, 640);
  // Create the webcam video and hide it
   canvas2 = createGraphics(width, height);
    makesquares();
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  // start detecting hands from the webcam video
  handpose.detectStart(video, gotHands);
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);
    image(canvas2, 0, 0);


  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[0];
    // for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[8];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    // }
    
  //red
  if(keypoint.x < width && keypoint.x > width - 70 && keypoint.y > 0 && keypoint.y < 70){
    // send data to arduino 
    console.log("yay");
  }

   }
}




    


// Callback function for when handpose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

function makesquares() {
  canvas2.background(255);
  canvas2.clear();
  //background(255);
  //clear();
  canvas2.fill(255, 0, 0);
  canvas2.rect(width, 0, -70, 70);
  canvas2.fill(0, 255, 0);
  canvas2.rect(width, 70, -70, 70);
  canvas2.fill(0, 0, 255);
  canvas2.rect(width, 140, -70, 70);
  canvas2.fill(0, 0, 0);
  canvas2.rect(width, 210, -70, 70);
  canvas2.stroke(255, 0, 0);
  canvas2.strokeWeight(10);
  canvas2.line(width - 5, 215, width - 65, 275);
  
}