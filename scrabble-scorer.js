// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  // console.log("Let's play some scrabble! Enter a word:");
  console.log("Let's play some scrabble!");
  console.log("");
  let userWord = input.question("Enter a word to score: ");
  scoredPoints = oldScrabbleScorer(userWord);
  // console.log(scoredPoints);
  return userWord;
};

let simpleScore = function(word) {
  word = word.toUpperCase();
  return word.length;
};

let vowelBonusScore = function(word) {
  let points = 0;
  word = word.toUpperCase();
  
  let vowelPointStructure = {
    1: ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'],
    3: ['A', 'E', 'I', 'O', 'U']
  };
  for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in vowelPointStructure) {
 
      if (vowelPointStructure[pointValue].includes(word[i])) {
        points += pointValue;
      }
 
	  }
	}
  return points;
};

let scrabbleScore = function(word) {
  word = word.toUpperCase();
	let wordPoints = 0;
  let letter = word[0];
  let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
    letter = word[i];
    letterPoints = Number(newPointStructure[letter]);
    wordPoints += letterPoints;
  }
  return wordPoints;
};

let simpleScoreObject = {
  name:'Simple Score',
  description: 'Each letter is worth 1 point.',
  scorerFunction: simpleScore 
};
let bonusVowelsObject = {
  name:'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.	',
  scorerFunction: vowelBonusScore 
};
let scrabbleScoreObject = {
  name:'Scrabble',
  description: 'The traditional scoring algorithm.',
  scorerFunction: scrabbleScore 
};

const scoringAlgorithms = [simpleScoreObject, bonusVowelsObject, scrabbleScoreObject];

function scorerPrompt() {
  console.log('Which scoring algorithm would you like to use?');
  console.log('');
  console.log("0 - ", scoringAlgorithms[0].name, ": ", scoringAlgorithms[0].description);
  console.log("1 - ", scoringAlgorithms[1].name, ": ", scoringAlgorithms[1].description);
  console.log("2 - ", scoringAlgorithms[2].name, ": ", scoringAlgorithms[2].description);
  userScoringPreference = input.question('Enter 0, 1, or 2: ');
  return scoringAlgorithms[userScoringPreference];
};

function transform(oldPointStructure) {
  let newPointStructure = {}
  // for each point value in the old structure, grab the letters and the point value
  for (let pointValue in oldPointStructure) {
    let arrayOfLetters = oldPointStructure[pointValue];
    // for each letter, add it and the point value to the new object
    for (let i = 0; i < arrayOfLetters.length; i++) {
      letter = arrayOfLetters[i];
      // Add the letter and point value to new object
      newPointStructure[letter] = pointValue;
    }
  }
  return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  let wordToScore = initialPrompt();
  let scoringAlgorithm = scorerPrompt();
  let score = scoringAlgorithm.scorerFunction(wordToScore);
  console.log("Score for '" + wordToScore + "':", score);

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

