/*
Serial Library:
https://github.com/yoonbuck/p5.WebSerial/wiki/Guide

Serial handshaking and multi-value strings using p5.webserial. Sends an 'x' out the serial port on port opening, then waits for serial to come in. Expects a Comma Separated Value string. Separates it into three parts, then sends an 'x' to request another string from the sender.
created 31 May 2022
modified 11 Jun 2022
by Tom Igoe
modified 09 Oct 2023
by David Rios
*/

// variable to hold an instance of the p5.webserial library:
const serial = new p5.WebSerial();
// HTML button object:
let portButton;
let inData; // for incoming serial data
let x = 0;
let y = 0;
let s = 50;
let finalcolor;
let R = 0;
let G = 0;
let B = 0;
var string = "";

let handpose;
let video;
let hands = [];

let painting = [];

function preload() {
  // Load the handpose model.
  handpose = ml5.handpose();
}

function setup() {
  createCanvas(640, 480); // make the canvas
  //   serial
  // check to see if serial is available:
  if (!navigator.serial) {
    alert("WebSerial is not supported in this browser. Try Chrome or MS Edge.");
  }
  // if serial is available, add connect/disconnect listeners:
  navigator.serial.addEventListener("connect", portConnect);
  navigator.serial.addEventListener("disconnect", portDisconnect);
  // check for any ports that are available:
  serial.getPorts();
  // if there's no port chosen, choose one:
  serial.on("noport", makePortButton);
  // open whatever port is available:
  serial.on("portavailable", openPort);
  // handle serial errors:
  serial.on("requesterror", portError);
  // handle any incoming serial data:

  serial.on("data", serialEvent);
  serial.on("close", makePortButton);
  textSize(40);
  // Handpose

  // Create the webcam video and hide it
  canvas2 = createGraphics(width, height);
  makesquares();
  video = createCapture(VIDEO);
  video.size(canvas2.width, canvas2.height);
  video.hide();
  // start detecting hands from the webcam video
  handpose.detectStart(video, gotHands);
 // pixelDensity(1);
}

////////////
// DRAW  ///
////////////
function draw() {
  background(255);
  noFill();
  //ellipse(x, y, s, s);

  // handpose
  push();
  // Flip the video horizontally
  scale(-1, 1);
  image(video, -width, 0, width, height);
  image(canvas2, -width, 0);
  pop();

  // Draw all the tracked hand points

  for (let i = 0; i < hands.length; i++) {
    let hand = hands[0];
    let keypoint = hand.keypoints[8];

    // Mirrored X-coordinate
    let fingerX = width - keypoint.x - 1;
    let fingerY = keypoint.y;

    if (fingerX || fingerY) {
      let v = createVector(fingerX, fingerY);
      painting.push(v);
    }

    fill(R, G, B);
    noStroke();
    circle(fingerX, fingerY, 10);

    // Red
    if (fingerX < 70 && fingerX > 0 && fingerY > 0 && fingerY < 70) {
      finalcolor = 'R';
      R = 255;
      G = 0;
      B = 0;
    }
    // Green
    else if (fingerX < 140 && fingerX > 70 && fingerY > 70 && fingerY < 140) {
      finalcolor = 'G' ;
      R = 0;
      G = 255;
      B = 0;
    }
    // Blue
    else if (fingerX < 210 && fingerX > 140 && fingerY > 140 && fingerY < 210) {
      finalcolor = 'B';

      R = 0;
      G = 0;
      B = 255;
    }
    let wholenofingerX = round( map(fingerX, 0, width, 0, 32))
    let wholenofingerY = round( map(fingerY, 0 , height , 0, 16))
    string = finalcolor + "," + String(wholenofingerX) + "," + String(wholenofingerY);
    console.log(string);
  }

  stroke(R, G, B);
  noFill();
  strokeWeight(4);
  beginShape();
  for (let i = 0; i < painting.length; i++) {
    let fingerPoint = painting[i];
    //circle(fingerPoint.x, fingerPoint.y, 10);
    vertex(fingerPoint.x, fingerPoint.y);
  }
  endShape();
}

/////////////////////////////
// SEND AND RECEIVE DATA  ///
/////////////////////////////

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  let inString = serial.readStringUntil("\r\n");
  //let inString = serial.readLine();
  //check to see that there's actually a string there:

  //let inString = serial.read();
  //serial.write(string);

  if (inString) {
    let sensors = split(inString, ",");
 // serial.write(string);
  }
 serial.write(string+'\n');
  //serial.write(string);
   console.log(string);

}
function mousePressed() {
 serial.write(string+'\n');
  //serial.write(string);
 console.log(string);
}

/////////////////////////////////////////////
// UTILITY FUNCTIONS TO MAKE CONNECTIONS  ///
/////////////////////////////////////////////

// if there's no port selected,
// make a port select button appear:
function makePortButton() {
  // create and position a port chooser button:
  portButton = createButton("choose port");
  portButton.position(10, 10);
  // give the port button a mousepressed handler:
  portButton.mousePressed(choosePort);
}

// make the port selector window appear:
function choosePort() {
  serial.requestPort();
}

// open the selected port, and make the port
// button invisible:
function openPort() {
  // wait for the serial.open promise to return,
  // then call the initiateSerial function
  serial.open().then(initiateSerial);

  // once the port opens, let the user know:
  function initiateSerial() {
    console.log("port open");
     //serial.write(string);
    serial.write(string+'\n');
  }
  // hide the port button once a port is chosen:
  if (portButton) portButton.hide();
}

// pop up an alert if there's a port error:
function portError(err) {
  alert("Serial port error: " + err);
}

// try to connect if a new serial port
// gets added (i.e. plugged in via USB):
function portConnect() {
  console.log("port connected");
  serial.getPorts();
}

// if a port is disconnected:
function portDisconnect() {
  serial.close();
  console.log("port disconnected");
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
