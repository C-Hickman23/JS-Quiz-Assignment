var StartCard = document.getElementById("StartScreen");
var QuizCard = document.getElementById("QuizScreen");
var EndCard = document.getElementById("EndScreen");
var WinCard = document.getElementById("WinScreen");
var StartBtn = document.getElementById("Start");
var QsTxt = document.getElementById("QuestionBox");
var Ans1 = document.getElementById("Ans1");
var Ans2 = document.getElementById("Ans2");
var Ans3 = document.getElementById("Ans3");
var Ans4 = document.getElementById("Ans4");

var q1 = ["The first ever line of code printed what to the console?",];
var q2 = [3,];
var a1 = ["I AM COMPUTER!",];
var a2 = ["God I am so smart",];
var a3 = ["Hello World!",];
var a5 = [":)",];

function init() {
    QuizCard.style.display = "none";
    EndCard.style.display = "none";
    WinCard.style.display = "none";
}

init();