var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var gameStarted = false;
var level = 1;

var g
function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(randomChosenColour);
    console.log(gamePattern);
    animate(randomChosenColour);
    $("h1").text("Level " + level);
    level++;
    userPattern = [];
}

function animate(randomChosenColour) {
    $("#" + randomChosenColour).fadeIn(50).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
   
}
function animatePress(randomChosenColour) {
    $("#" + randomChosenColour).addClass("pressed");
    setTimeout(function() {
        $("#" + randomChosenColour).removeClass("pressed");
    }, 100);
}

function playSound(randomChosenColour) {
   var sound = new Audio("./sounds/" + randomChosenColour + ".mp3");
   sound.play();
}


$('[class^="btn"]').click(function(event) {
    userPattern.push(event.target.id);
    console.log(userPattern);
    playSound(event.target.id);
    animatePress(event.target.id);
    CheckAnswer(userPattern.length - 1);
})

function CheckAnswer(lastItem) {
    console.log(lastItem);
    if(gamePattern[lastItem] == userPattern[lastItem]) {
        console.log("correct");
        if(gamePattern.length == userPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key To Start Again");
        gameStarted = false;
        level = 1;
        gamePattern = [];
    }
    
}



$("body").keypress(function() {
    if(gameStarted == false) {
        nextSequence();
        gameStarted = true;
    }
})