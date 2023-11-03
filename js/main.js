import {WORDS} from "./words.js";

const NumberOfGuesses = 6;
let GuessesLeft = NumberOfGuesses;
let GuessesMade = [];

let buttons = document.querySelectorAll("button");
// let input = document.getElementById("input");

buttons.forEach(function (elem)
{
	elem.addEventListener("click", function ()
	{
		console.log(`clicked ${elem.id}`);

		if (input.value.length < CurrentWord.length)
		{
			input.value += elem.id;
		}
	});
});


function GetRandomWord(numberOfWords = 1)
{
	let wordList = [];

	for (let i = 0; i < numberOfWords; i++)
	{
		wordList.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
	}

	return wordList;
}

let CurrentWord = GetRandomWord()[0];

let input = document.getElementById("input");
input.maxLength = CurrentWord.length;

function InitBoard()
{
	let board = document.getElementById("game-board");

	for (let i = 0; i < NumberOfGuesses; i++)
	{
		let row = document.createElement("div");
		row.className = "letter-row-" + i;

		for (let j = 0; j < CurrentWord.length; j++)
		{
			let box = document.createElement("div");
			box.className = "letter-box-" + j;
			row.appendChild(box)
		}

		board.appendChild(row)
	}
}

document.addEventListener("keypress", function (event)
{
	// If the user presses the "Enter" key on the keyboard
	if (event.key === "Enter")
	{
		// Cancel the default action, if needed
		event.preventDefault();

		if (input.value.length !== CurrentWord.length || GuessesLeft <= 0 || GuessesMade.includes(input.value))
		{
			return
		}

		TestWord(input.value);
		input.value = '';
	}
});

function TestWord(input)
{
	GuessesLeft--;
	GuessesMade.push(input);

	CompareWords(input, CurrentWord);
}

function CompareWords(input, currentWord)
{
	let correctLetters = 0;

	let row = document.querySelector(`.letter-row-${GuessesMade.length - 1}`);

	for (let i = 0; i < currentWord.length; i++)
	{
		let letter = row.querySelector(`.letter-box-${i}`);
		letter.innerHTML = input.at(i);
		let visualKeyboardLetter = document.querySelector(`#${input.at(i).toUpperCase()}`);

		if (input.at(i) === currentWord.at(i))
		{
			letter.classList.add("correct-letter");
			visualKeyboardLetter.classList.add("correct-letter");
			correctLetters++;
		}
		else if (currentWord.includes(input.at(i)))
		{
			letter.classList.add("wrong-position-letter");
			visualKeyboardLetter.classList.add("wrong-position-letter");
		}
		else
		{
			visualKeyboardLetter.classList.add("absent-letter");
		}

		if (currentWord.length === correctLetters)
		{
			console.log("You won");
			$("input").notify(
				"You won!",
				{
					position: "top-center",
					className: "success"
				}
			);
		}
	}
}

console.log(CurrentWord);
InitBoard();