
// Global Variables
// =============================================================

var wordOptions = ['mars', 'earth', 'venus', 'uranus', 'saturn', 'jupiter', 'neptune', 'mercury'];
var selectedWord = '';
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccess = [];
var wrongGuesses = [];

var winCount = 0;
var lossCount = 0;
var guessesLeft = 0;

//DOM Elements
var guessWordDiv = document.getElementById('guess-word');
var guessLeftDiv = document.getElementById('guesses-left');
var winCounterDiv = document.getElementById('win-counter');
var lossCounterDiv = document.getElementById('loss-counter');
var resetBtn = document.getElementById('reset-btn');
var rocket = document.getElementById('rocket');
var wordGuessContainer = document.getElementById('Gword-contianer');
var incorrectGuessesDiv = document.getElementById('incorrect-guesses');

// Functions
// =============================================================

function startGame() {
  //Select the game's word
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  lettersInWord = selectedWord.split('');
  numBlanks = lettersInWord.length;

  //Reset
  guessesLeft = 9;
  blanksAndSuccess = [];
  wrongGuesses = [];

  // Populate blanks and successes with right number of blanks.
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccess.push('_');
  }

  // Update DOM to reflect game round condition
  guessWordDiv.innerHTML = blanksAndSuccess.join(' ');
  guessLeftDiv.innerHTML = guessesLeft;
  winCounterDiv.innerHTML = winCount;
  lossCounterDiv.innerHTML = lossCount;
  incorrectGuessesDiv.innerHTML = wrongGuesses;

  //Debugging
  console.log(selectedWord);
  console.log(lettersInWord);
  console.log(numBlanks);
  console.log(blanksAndSuccess);
  console.log(wrongGuesses);
}

function resetGame() {
  //Add visual indicator of game reset and fly rocket
  wordGuessContainer.classList.add('reset');

  //Call the startGame function
  startGame();

  //Clear visual indicator of game reset
  setTimeout(function() {
    wordGuessContainer.classList.remove('reset')
  }, 1000);
  // TODO: set off animiation

}

function checkLetters(letter) {
  // Check if letter exists in code
  var isLetterInWord = false;

  for (var i = 0; i < numBlanks; i++) {
    if (selectedWord[i] === letter) {
      isLetterInWord = true;
    }
  }
  // Check where in the word the letter exists, then populate the array
  if (isLetterInWord) {
    for (var i = 0; i < numBlanks; i++) {
      if (selectedWord[i] === letter) {
        blanksAndSuccess[i] = letter;
      }
    }
  }
  // Letter wasn't found
  else {
    wrongGuesses.push(letter);
    incorrectGuessesDiv.innerHTML = wrongGuesses.join(', ');
    guessesLeft--;
  }
}

function roundComplete() {
  console.log('Win Count: ' + winCount + ' | Loss Count: ' + lossCount + ' | Guesses Left: ' + guessesLeft);

  //Update the DOM
  guessLeftDiv.innerHTML = guessesLeft;
  guessWordDiv.innerHTML = blanksAndSuccess.join(' ');

  // Check if User Won
    if (lettersInWord.toString() === blanksAndSuccess.toString()) {
      winCount++;
      setTimeout(function(){
      alert('You Guessed It! "' + selectedWord + '"');
      },200);

      winCounterDiv.innerHTML = winCount;
      setTimeout(function(){
      startGame();
    }, 500);
    }
  // Check if User Lost

    else if (guessesLeft < 1) {
      lossCount++;
      alert('You Lost! The Correct Word Was: "' + selectedWord + '"');
      lossCounterDiv.innerHTML = lossCount;
      startGame();
    }
}

// Main Process
// =============================================================
// Initiates code on first load
startGame();

// Keyup event listener
document.onkeyup = function(event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();

  //Debugger
  console.log(letterGuessed);
}

// Reset Button
resetBtn.addEventListener('click', resetGame);
