// The midi notes of a scale
var notes1 = [ 60, 62, 64, 65, 67, 69, 71, 72];
var notes2 = [ 60, 62, 63, 65, 67, 69, 70, 72];
var notes3 = [ 60, 61, 63, 65, 67, 68, 70, 72];
var notes4 = [ 65, 67, 69, 71, 72, 74, 76, 77];
var notes5 = [ 67, 69, 71, 72, 74, 76, 77, 79];
var notes6 = [ 69, 71, 72, 74, 76, 77, 79, 81];
var notes7 = [ 71, 72, 74, 76, 77, 79, 81, 83];

var hints = [ '1', '2', '3', '4', '5', '6', '7', '8'];
var keys = [ 'Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si', 'Do'];

var keywidth = 300;

var osc;

function setup() {
  var canvas = createCanvas(windowWidth, 400);
  canvas.parent("sketch-holder");
  canvas.style('z-index','-1');

  // A triangle oscillator
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
}

// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

function draw() {

  var notes = notes3
  // Draw a keyboard

  // The width for each key
  // var w = width / notes.length;
  var w = keywidth
  var h = (height-1) / notes.length;
  for (var i = 0; i < notes.length; i++) {
    var y = i * h;
    // If the mouse is over the key
    if (mouseY > y && mouseY < y+h && mouseX < w && mouseX > 0) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(55,100,100);
      // Or just rolling over
      } else {
        fill(235-30*i);
      }
    } else {
      fill(220);
    }


    // Draw the key
    rect(0, y, w, h);
  }

}

// When we click
function mousePressed() {
  // Map mouse to the key index
  var notes = notes3
  var key = floor(map(mouseY, 0, height, 0, notes.length));
  if (mouseY > 0 && mouseY < height && mouseX > 0 && mouseX < keywidth) {
    playNote(notes[key]);
  }
}

function keyPressed() {
  // Map mouse to the key index
  var notes = notes3
  var key = floor(map(mouseY, 0, height, 0, notes.length));
  if (mouseY > 0 && mouseY < height && mouseX > 0 && mouseX < keywidth) {
    playNote(notes[key]);
  }
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);
}

function keyReleased() {
  osc.fade(0,0.5);
}