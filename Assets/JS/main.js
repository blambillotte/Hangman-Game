
// Global Variables
// =============================================================

var wordOptions = ['martini', 'sidecar', 'negroni', 'sazerac', 'test2', 'hi'];
var selectedWord = '';
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccess = [];
var wrongGuesses = [];

var winCount = 0;
var lossCount = 0;
var guessesLeft = 0;

// Functions
// =============================================================

function startGame() {
  //Select the game's word
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  lettersInWord = selectedWord.split('');
  numBlanks = lettersInWord.length;
  console.log(selectedWord);
  console.log(lettersInWord);
  console.log(numBlanks);
}


// Main Process
// =============================================================
startGame();
