var StartCard = document.getElementById("StartScreen");
var QuizCard = document.getElementById("QuizScreen");
var EndCard = document.getElementById("EndScreen");
var WinCard = document.getElementById("WinScreen");
var TimerInput = document.getElementById("TimeInput");
var StartBtn = document.getElementById("Start");
var QsTxt = document.getElementById("QuestionBox");
var Ans1 = document.getElementById("Ans1");
var Ans2 = document.getElementById("Ans2");
var Ans3 = document.getElementById("Ans3");
var Ans4 = document.getElementById("Ans4");

var q1 = ["When was JavaScript Invented?","What is a reference to a value that can be changed called"];
var q2 = [3,1];
var a1 = ["2004","Variable"];
var a2 = ["1980","Reference"];
var a3 = ["1995","Declaration"];
var a4 = ["2000","Full Stack"];
var c = 0;
var time;

function init() {
    QuizCard.style.display = "none";
    EndCard.style.display = "none";
    WinCard.style.display = "none";
}

function startGame() {
    startTime(75);
    QuizCard.style.display = "inherit";
    StartCard.style.display = "none";
    game();
}

function game() {
    if(c < q2.length && time > 0){
        QsTxt.innerText = q1[c];
        Ans1.innerText = a1[c];
        Ans2.innerText = a2[c];
        Ans3.innerText = a3[c];
        Ans4.innerText = a4[c];
        Ans1.removeEventListener("click", rightAns);
        Ans2.removeEventListener("click", rightAns);
        Ans3.removeEventListener("click", rightAns);
        Ans4.removeEventListener("click", rightAns);
        Ans1.removeEventListener("click", wrongAns);
        Ans2.removeEventListener("click", wrongAns);
        Ans3.removeEventListener("click", wrongAns);
        Ans4.removeEventListener("click", wrongAns);
        if(q2[c] === 1) {
            Ans1.addEventListener("click", rightAns);
            Ans2.addEventListener("click", wrongAns);
            Ans3.addEventListener("click", wrongAns);
            Ans4.addEventListener("click", wrongAns);
        } else if(q2[c] === 2) {
            Ans2.addEventListener("click", rightAns);
            Ans1.addEventListener("click", wrongAns);
            Ans3.addEventListener("click", wrongAns);
            Ans4.addEventListener("click", wrongAns);
        } else if(q2[c] === 3) {
            Ans3.addEventListener("click", rightAns);
            Ans1.addEventListener("click", wrongAns);
            Ans2.addEventListener("click", wrongAns);
            Ans4.addEventListener("click", wrongAns);
        } else {
            Ans4.addEventListener("click", rightAns);
            Ans1.addEventListener("click", wrongAns);
            Ans2.addEventListener("click", wrongAns);
            Ans3.addEventListener("click", wrongAns);
        }
    } else if(time <= 0){
        loseGame();
    } else {
        wingGame();
    }
}

function rightAns() {
    c++;
    game();
}

function wrongAns() {
    time -= 2;
}

function startTime(x) {
    time = x;
    var timer = setInterval(function() {
        if(time > 0){
            time--;
            TimerInput.innerText = time;
        } else {
            clearInterval(timer);
        }
    }, 1000);
}

function loseGame() {
    QuizCard.style.display = "none";
    EndCard.style.display = "inherit";
}

function wingGame() {
    QuizCard.style.display = "none";
    WinCard.style.display = "inherit";
}

init();
StartBtn.addEventListener("click", startGame);