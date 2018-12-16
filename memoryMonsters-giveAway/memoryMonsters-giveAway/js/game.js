// Those are global variables, they stay alive and reflect the state of the game

// This is a constant that we dont change during the game (we mark those with CAPITAL letters)
var TOTAL_COUPLES_COUNT = 3;

// Load an audio files
var audioWin = new Audio('sound/win.mp3');
var audioWrong = new Audio('sound/wrong.mp3');
var audioRight = new Audio('sound/right.mp3');

var elPreviousCard = null;
var flippedCouplesCount = 0;
var isFirstCardClicked = true;
var startTimerTimstamp;
var isProcessing = false;
var bestTime = localStorage.getItem('bestTime');
var currentGameTime = null;
window.addEventListener("load", switchUser);
updateBestTimeElement();


// This function is called whenever the user click a card
function cardClicked(elCard) {
    if (isProcessing) return;


    if (isFirstCardClicked) {
        isFirstCardClicked = false;
        startTimer();
        displayTimer();
    }
    // If the user clicked an already flipped card - do nothing and return from the function
    if (elCard.classList.contains('flipped')) {
        return;
    }

    // Flip it
    elCard.classList.add('flipped');


    // This is a first card, only keep it in the global variable
    if (elPreviousCard === null) {
        elPreviousCard = elCard;

    } else {//on the 2nd attempt
        isProcessing = true;
        // get the data-card attribute's value from both cards
        var card1 = elPreviousCard.getAttribute('data-card');
        var card2 = elCard.getAttribute('data-card');

        // No match, schedule to flip them back in 1 second
        // Wrong, play wrong audio
        if (card1 !== card2) {

            audioWrong.play();
            setTimeout(function () {
                elCard.classList.remove('flipped');
                elPreviousCard.classList.remove('flipped');
                elPreviousCard = null;

                isProcessing = false;
            }, 1000)

        } else {

            // Yes! a match!
            // right? play right audio
            audioRight.play();
            flippedCouplesCount++;
            elPreviousCard = null;
            isProcessing = false;
        }
        // All cards flipped!
        if (TOTAL_COUPLES_COUNT === flippedCouplesCount) {

            audioWin.play();
            stopTimer();
            updateBestTimeToStorage();
            updateBestTimeElement();
            shuffle();
            toggleResetButton('visible');
            stopStopwatch();


        }

    }


{
    function toggleResetButton(visibility) {
    document.getElementById("resetbutton").style.visibility = visibility;
}
{
function toggleRevealHideButton(visibility) {
    document.getElementById("revealbutton").style.visibility = visibility;
}
function revealAll 
    
    flippedCard.classList.remove('flipped');

function resetGame() {
    //initialize variables
    elPreviousCard = null;
    flippedCouplesCount = 0;
    isFirstCardClicked = true;
    isProcessing = false;
    toggleResetButton('hidden');
    //flip back cards
    var flippedCards = document.querySelectorAll('.flipped');

    for (var i = 0; i < flippedCards.length; i++) {
        var flippedCard = flippedCards[i];
        flippedCard.classList.remove('flipped');
    }

    shuffle();
}

function switchUser() {
    var playerName = prompt("Enter Player name?");
    localStorage.setItem('playername', playerName);
    var playerSpan = document.querySelector('.player');
    playerSpan.innerHTML = playerName;

}

function startTimer() {
    startTimerTimstamp = Date.now()
    startStopwatch();
}

function stopTimer() {
    var stoppedTimestamp = Date.now();
    var interval = stoppedTimestamp - startTimerTimstamp;
    currentGameTime = interval / 1000;

    document.querySelector('.timer').innerHTML = currentGameTime;
}
function updateBestTimeElement() {

    document.querySelector('.bestTime').innerHTML = bestTime;
}

function updateBestTimeToStorage() {
    var bestTimeNewValue = 0;
    //firstTime or better score
    if (bestTime === null || currentGameTime < bestTime) {
        bestTimeNewValue = currentGameTime;
    }
    else {//not better score
        return;
    }

    bestTime = bestTimeNewValue;
    localStorage.setItem('bestTime', bestTimeNewValue);
}


function shuffle() {
    var board = document.querySelector('.board');
    for (var i = board.children.length; i >= 0; i--) {
        board.appendChild(board.children[Math.random() * i | 0]);
    }
}