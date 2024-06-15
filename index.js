var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;
// first key press
$(document).keypress(function(){
  if(!start){
    nextSequence();
    start = true;
  }
});
// here, we are checking the value of gamePattern and userClickedPattern
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
// after game over restart the game
function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}
// moving to the next level
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}
// user inputs are taken from here
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  $("#"+userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});
// play the color sound
function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
// animation on current color
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){$("#"+currentColour).removeClass("pressed");},100); 
}