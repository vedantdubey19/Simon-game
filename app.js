let buttonColours = ["red","blue","green","yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

document.addEventListener("keypress", function(){
    if(!started){
        document.getElementById("level-title").innerHTML = "Level " + level;
        nextSequence();
        started = true;
    }
});

let buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {
    button.addEventListener("click", function(){

        let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);
    });
});

function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }

    } else {

        playSound("wrong");

        document.body.classList.add("game-over");

        setTimeout(function(){
            document.body.classList.remove("game-over");
        },200);

        document.getElementById("level-title").innerHTML =
        "Game Over, Press Any Key to Restart";

        startOver();
    }
}

function nextSequence(){

    userClickedPattern = [];
    level++;

    document.getElementById("level-title").innerHTML =
    "Level " + level;

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    let activeButton = document.getElementById(randomChosenColour);

    activeButton.classList.add("pressed");

    setTimeout(()=>{
        activeButton.classList.remove("pressed");
    },200);

    playSound(randomChosenColour);
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){

    let button = document.getElementById(currentColour);

    button.classList.add("pressed");

    setTimeout(function(){
        button.classList.remove("pressed");
    },100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}