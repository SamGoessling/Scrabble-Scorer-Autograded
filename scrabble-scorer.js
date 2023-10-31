// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

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

const newPointStructure = {};

function transform(oldPointStructure) {
  for (const score in oldPointStructure) {
    for (const letter of oldPointStructure[score]) {
      newPointStructure[letter.toLowerCase()] = parseInt(score);
    }
  }

  return newPointStructure;
}

function initialPrompt() {
  return input.question("Let's play some Scrabble!\n\nPlease enter a word to score: ");
}

const word = initialPrompt();

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

function simpleScorer(word) {
  let score = word.length;
  return score;
}

function vowelBonusScorer(word) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  word = word.toLowerCase();
  let score = 0; // Start with a score of 0.

  for (let i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
}

function scrabbleScorer(word) {
  word = word.toLowerCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];

    if (newPointStructure.hasOwnProperty(letter)) {
      score += newPointStructure[letter];
    }
  }
  return score;
}

const scoringAlgorithms = [
  {
    name: "Simple Scorer",
    description: "Each letter is worth 1 point.",
    scorerFunction: simpleScorer,
  },
  {
    name: "Bonus Vowels Scorer",
    description: "Vowels are 3 pts, consonants are 1 pt.",
    scorerFunction: vowelBonusScorer,
  },
  {
    name: "New Scrabble Scorer",
    description: "The traditional new scoring algorithm.",
    scorerFunction: scrabbleScorer,
  }
];

function scorerPrompt(word) {
  console.log("Available Scoring Algorithms:\n");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i}: ${scoringAlgorithms[i].name}`);
  }

  let choice = input.question("Please select a scoring algorithm by entering 0, 1, or 2: ");
  choice = parseInt(choice);

  if (choice >= 0 && choice < scoringAlgorithms.length) {
    const selectedAlgorithm = scoringAlgorithms[choice];
    const score = selectedAlgorithm.scorerFunction(word);
    return {
      name: selectedAlgorithm.name,
      score: score
    };
  } else {
    console.log("Invalid choice. Please select 0, 1, or 2.");
    return null;
  }
}

function runProgram() {
  const result = scorerPrompt(word);
  if (result) {
    console.log(`Algorithm name: ${result.name}`);
    console.log(`Score for '${word}': ${result.score}`);
  }
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};