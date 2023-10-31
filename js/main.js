import { WORDS } from "./words.js";

const NumberOfGuesses = 6;
let GuessesLeft = NumberOfGuesses;
let GuessesMade = [];

function GetRandomNumber(numberOfWords = 1)
{
	let wordList = [];
	
	for (let i = 0; i < numberOfWords; i++){
		wordList.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
	}
	
	return wordList;
}

let CurrentWord = GetRandomNumber()[0];

let input = document.getElementById("input");
input.maxLength = CurrentWord.length;
console.log(CurrentWord);

function InitBoard() {
	let board = document.getElementById("game-board");

	for (let i = 0; i < NumberOfGuesses; i++) {
		let row = document.createElement("div")
		row.className = "letter-row"

		for (let j = 0; j < CurrentWord.length; j++) {
			let box = document.createElement("div")
			box.className = "letter-box"
			row.appendChild(box)
		}

		board.appendChild(row)
	}
}

function TestWord(){
	let testedWord = document.getElementById("input").value;
	
	console.log(testedWord)
	console.log(CurrentWord)
}

input.addEventListener("keypress", function(event) {
	// If the user presses the "Enter" key on the keyboard
	if (event.key === "Enter") {
		// Cancel the default action, if needed
		event.preventDefault();
		
		if (input.length !== CurrentWord.length){
			return
		}
		
		TestWord();
	}
});

// function InsertKey(key) 
// {
//	
// }

// document.addEventListener("keyup", (e) => {
//
// 	if (GuessesLeft === 0) {
// 		return
// 	}
//	
// 	let letter = e.key.toUpperCase();
//	
//	
// })

InitBoard();