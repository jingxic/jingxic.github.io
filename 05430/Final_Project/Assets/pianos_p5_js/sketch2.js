// The midi notes of a scale
var notes = [ 60, 62, 63, 65, 67, 69, 70, 72];

var hints = [ '1', '2', '3', '4', '5', '6', '7', '8'];
var keys = [ 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti', "Do", "Re'"];

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

  // Draw a keyboard
  // The width for each key
  // var w = width / notes.length;
  var w = keywidth
  var h = (height-1) / notes.length;
  textFont('Courier');
  for (var i = 0; i < notes.length; i++) {
    var y = i * h;
    // If the mouse is over the key
    if (mouseY > y && mouseY < y+h && mouseX < w && mouseX > 0) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(255);
      // Or just rolling over
      } else {
        fill(20+25*i);
      }
    } else {
      fill(30);
    }

    // Draw the key
    strokeWeight(1);
    stroke(255);
    rect(0, y, w, h);

    textSize(16);
    fill(255);
    text(keys[i-1], 10, y-h/2+5);
    text(hints[i-1], w-20, y-h/2+5);
  }
  fill(255);
  text(keys[7], 10, height-h/2+5);
  text(hints[7], w-20, height-h/2+5);
}

// When we click
function mousePressed() {
  // Map mouse to the key index
  var key = floor(map(mouseY, 0, height, 0, notes.length));
  if (mouseY > 0 && mouseY < height && mouseX > 0 && mouseX < keywidth) {
    playNote(notes[key]);
  }
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,2);
}

// When we press key
document.addEventListener("keydown", e => {
  // e object has the key property to tell which key was pressed
  switch (e.key) {
    case "1":
      return playNote(notes[0]);
    case "2":
      return playNote(notes[1]);
    case "3":
      return playNote(notes[2]);
    case "4":
      return playNote(notes[3]);
    case "5":
      return playNote(notes[4]);
    case "6":
      return playNote(notes[5]);
    case "7":
      return playNote(notes[6]);
    case "8":
      return playNote(notes[7]);
    default:
      return;
  }

});

// Fade it out when we release
document.addEventListener("keyup", e => {
  switch (e.key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
       osc.fade(0,2);
  }
});
