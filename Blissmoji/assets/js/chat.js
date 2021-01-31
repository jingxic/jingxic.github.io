// var typearea = document.getElementById("type-area");
// typearea.addEventListener('keypress', syncEmoji(e));

var emojimode = false;
var emojis = [ 0x1F611, 0x1F612, 0x1F613, 0x1F614, 0x1F615];

document.addEventListener('keydown', e => {
  // e object has the key property to tell which key was pressed
  switch (e.key) {
    case "Shift":
      // document.getElementById("type-area").value ="";
      emojimode = !emojimode;
  }
});

function myFunction(val) {
  if (!emojimode) {
    recommend(val);
    showRecom();
  }
}

function recommend(val) {
  var tmp = emojis[1];
  emojis[1] = emojis[2];
  emojis[2] = tmp;
}

function showRecom() {
  var recommend = "";
  for (i = 0; i < emojis.length; i++) { 
    recommend += (i+1).toString() + String.fromCodePoint(emojis[i]);;
  }
  document.getElementById("emoji-rec").innerHTML = recommend;
}

// function addEmoji() {
// 	document.getElementById("type-area").value += String.fromCodePoint(0x1F613);
// }

function addToChat() {

  var para = document.createElement("p");
  var node = document.createTextNode(document.getElementById("type-area").value);
  para.appendChild(node);

  var element = document.getElementById("chat-box");
  element.appendChild(para);

  document.getElementById("type-area").value="";
  emojimode = false;
}


function enableEmoji() {
  document.getElementById("type-area").addEventListener('keydown', e => {
    // e object has the key property to tell which key was pressed
    if (e.key == "Enter") {
      e.preventDefault();
      addToChat();
    }
    if (emojimode && e.key != 'Backspace') {
      e.preventDefault();
    }
    if (emojimode) {
      switch (e.key) {
        case "1":
          document.getElementById("type-area").value += String.fromCodePoint(emojis[0]);
          return;
        case "2":
          document.getElementById("type-area").value += String.fromCodePoint(emojis[1]);
          return;
        case "3":
          document.getElementById("type-area").value += String.fromCodePoint(emojis[2]);
          return;
        case "4":
          document.getElementById("type-area").value += String.fromCodePoint(emojis[3]);
          return;
        case "5":
          document.getElementById("type-area").value += String.fromCodePoint(emojis[4]);
          return;
        default:
          return;
      }
    }
  });
}