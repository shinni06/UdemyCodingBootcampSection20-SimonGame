var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keydown", function(){
  if (started != true) {
    nextSequence();
    started = true;
  };
})

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);

  console.log(userClickedPattern);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColor = buttonColors[randomNumber];

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

  level = level + 1;

  $("h1").text("Level " + level);

  gamePattern.push(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over! Press any key to restart.");
    startOver();
  }
}

function playSound(name) {
  var colorAudio = new Audio("sounds/" + name + ".mp3");
  colorAudio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(removeButtonPress, 100);
  function removeButtonPress() {
    $("#" + currentColor).removeClass("pressed");
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
