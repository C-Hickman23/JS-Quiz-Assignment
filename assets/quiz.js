//cards
var StartCard = document.getElementById("StartScreen");
var QuizCard = document.getElementById("QuizScreen");
var EndCard = document.getElementById("EndScreen");
var WinCard = document.getElementById("WinScreen");
var HSCard = document.getElementById("HighScoreScreen");
//default elements
var TimerInput = document.getElementById("TimeInput");
var StartBtn = document.getElementById("Start");
//quiz elements
var QsTxt = document.getElementById("QuestionBox");
var Ans1 = document.getElementById("Ans1");
var Ans2 = document.getElementById("Ans2");
var Ans3 = document.getElementById("Ans3");
var Ans4 = document.getElementById("Ans4");
//high score elements
var ScoreInput = document.getElementById("ScoreInput");
var Initialsbtn = document.getElementById("SubmitInitials");
var InitialsInput = document.getElementById("InitialsInput");
var Top5 = document.getElementById("Top5");
var NoTop5 = document.getElementById("NoTop5");
var HighScoreInput = document.getElementById("HighScoreInput");
//go back buttons
var WinGoBack = document.getElementById("WinGoBack");
var LoseGoBack = document.getElementById("LoseGoBack");
var HSGoBack = document.getElementById("HSGoBack");

var q1 = ["When was JavaScript Invented?","What is a reference to a value that can be changed called","JS files can be attached to HTML file through which tag?","how many days did JavaScript initially take to develop in 1995?","JavaScript places where on a ranking of most widely used programming languages","Who invented JavaScript?"];
var q2 = [3,1,4,4,1,2];
var a1 = ["2004","Variable","<src>","315","1st","Steve Jobs"];
var a2 = ["1980","Reference","<code>","120","2nd","Brendan Eich"];
var a3 = ["1995","Declaration","<meta>","500","3rd","Cardon Hickman"];
var a4 = ["2000","Full Stack","<script>","10","4th","James Gosling"];
var c = 0;
var time;
var win;
var score;

function init() {
    StartCard.style.display = "inherit";
    QuizCard.style.display = "none";
    EndCard.style.display = "none";
    WinCard.style.display = "none";
    HSCard.style.display = "none";
}

function startGame() {
    startTime(45);
    QuizCard.style.display = "inherit";
    StartCard.style.display = "none";
    win = false;
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
        win = true;
    }
}

function rightAns() {
    c++;
    game();
}

function wrongAns() {
    time -= 5;
    TimerInput.innerText = time;
}

function startTime(x) {
    time = x;
    var timer = setInterval(function() {
        if(time > 0){
            time--;
            TimerInput.innerText = time;
        } else {
            TimerInput.innerText = time;
            clearInterval(timer);
            if(win === false){
                loseGame();
            }
        }
    }, 1000);
}

function loseGame() {
    QuizCard.style.display = "none";
    EndCard.style.display = "inherit";
}

function wingGame() {
    score = time;
    c = 0;
    time = 0;
    ScoreInput.textContent = score;
    QuizCard.style.display = "none";
    WinCard.style.display = "inherit";
    if(localStorage.getItem("Place5") == null || score > Number(localStorage.getItem("Place5").slice(localStorage.getItem("Place5").length - 2, localStorage.getItem("Place5").length))){
        Top5.style.display = "inherit";
        NoTop5.style.display = "none";
    } else {
        Top5.style.display = "none";
        NoTop5.style.display = "inherit";
    }
}

function submitHighScore() {
    let text = InitialsInput.value;
    text = text.concat(" Score: ");
    text = text.concat(score.toString());
    let scoreToBeat;
    let tempPlace;
    let tempPlace2;
    let breakOff;
    for(let i = 1; i <= 5; i++){
        if(localStorage.getItem("Place".concat(i.toString())) == null){
            localStorage.setItem("Place".concat(i.toString()), text);
            break;
        } else {
            scoreToBeat = Number(localStorage.getItem("Place".concat(i.toString())).slice(localStorage.getItem("Place".concat(i.toString())).length - 2, localStorage.getItem("Place".concat(i.toString())).length));
            if(score > scoreToBeat){
                tempPlace = localStorage.getItem("Place".concat(i.toString()));
                tempPlace2 = localStorage.getItem("Place".concat((i + 1).toString()));
                localStorage.setItem("Place".concat(i.toString()), text);
                breakOff = i;
                break;
            }
        }
    }
    for(let j = breakOff + 1; j <= 4; j++){
        localStorage.setItem("Place".concat((j).toString()), tempPlace);
        tempPlace = tempPlace2;
        tempPlace2 = localStorage.getItem("Place".concat((j + 1).toString()));
    }
    if(localStorage.getItem("Place4") != null){
        localStorage.setItem("Place5", tempPlace);
    }
    highScores();
}

function highScores() {
    StartCard.style.display = "none";
    QuizCard.style.display = "none";
    EndCard.style.display = "none";
    WinCard.style.display = "none";
    HSCard.style.display = "inherit";
    while (HighScoreInput.firstChild) {
        HighScoreInput.removeChild(HighScoreInput.lastChild);
    }
    for(let i = 1; i <=5; i++){
        let hs = document.createElement("li");
        hs.class = "list-group-item";
        if(localStorage.getItem("Place".concat(i.toString())) != null){
            hs.appendChild(document.createTextNode(localStorage.getItem("Place".concat(i.toString()))))
        } else {
            hs.appendChild(document.createTextNode("N/A"));
        }
        HighScoreInput.appendChild(hs);
    }
}

Initialsbtn.addEventListener("click", submitHighScore);
StartBtn.addEventListener("click", startGame);
WinGoBack.addEventListener("click", init);
LoseGoBack.addEventListener("click", init);
HSGoBack.addEventListener("click", init);
init();