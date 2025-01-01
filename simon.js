let gameSeq = [];
let userSeq = [];
let body = document.querySelector("body");

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let hs = 0;
let h2 = document.querySelector("h2");
let h3 = document.createElement("h3");
h3.innerText = `Highest Score: ${hs}`;
body.append(h3);

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game Started!");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 750);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}
function levelUp() {
    levelSound.play();
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);

    color = randColor;
    console.log(randColor);
    gameFlash(randBtn);
}
let levelSound = new Audio("levelSound.mp3");
let wrongSound = new Audio("gameover.mp3");

let celebrationSound = new Audio("celebration.mp3");

function celebrateHighestScore() {
    h2.innerHTML="🎉 <b>New High Score!<b> 🎉";
    // Play the celebration sound
    celebrationSound.play();

    // You can also add text or other visual effects here
    let celebrationText = document.createElement("h2");
    celebrationText.innerText = "";
    celebrationText.style.position = "absolute";

    celebrationText.style.color = "black";
    celebrationText.style.top = "30%";
    celebrationText.style.left = "50%";
    celebrationText.style.transform = "translate(-50%, -50%)";
    
    celebrationText.style.fontSize = "40px";
    body.appendChild(celebrationText);

    // Remove the celebration text after 2 seconds
    setTimeout(function () {
        celebrationText.remove();
    }, 1000);
}

function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {
        
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        wrongSound.play();
        if (level > hs) {
            h3.innerText = `Highest Score: ${level}`;
            hs = level;   
            
            celebrateHighestScore();
        }
        else {

        h2.innerHTML = `Game Over ! Your Score was <b>${level}<b> <br>Press any key to start.`;
        body.style.backgroundColor = gameSeq[idx];
        setTimeout(function () {
            body.style.backgroundColor = "rgb(206, 169, 227)";
        }, 300);
    }


        resizeTo();
    }
}

function btnPress() {

    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function resizeTo() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

