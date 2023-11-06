import {WORDS} from "./words.js";

let NumberOfGuessesSlider;
let WordLengthSlider;
let GuessesLeft;
let GuessesMade = [];
let CurrentWord;
let visualKeyboardButtons
let inputContainer

//Calls made when the page is fully loaded
window.addEventListener('DOMContentLoaded', () =>
{
	NumberOfGuessesSlider = document.querySelector("#tries-count-slider")
	WordLengthSlider = document.querySelector("#word-length-slider")
	visualKeyboardButtons = document.querySelectorAll("button");
	inputContainer = document.getElementById("input");

	//Make all sliders init the game on input
	let allInputs = document.querySelectorAll('input.slider');
	allInputs.forEach(function (elem)
	{
		elem.addEventListener("input", function ()
		{
			InitGame(WordLengthSlider.value, NumberOfGuessesSlider.value);
		})
	})

	visualKeyboardButtons.forEach(function (elem)
	{
		elem.addEventListener("click", function ()
		{
			// console.log(`clicked ${elem.id}`);

			if (inputContainer.value.length < CurrentWord.length)
			{
				inputContainer.value += elem.id;
			}
		});
	});

	document.addEventListener("keypress", function (event)
	{
		// If the user presses the "Enter" key on the keyboard
		if (event.key === "Enter")
		{
			// Cancel the default action, if needed
			event.preventDefault();

			GuessWord(inputContainer.value);
		}
	});

	InitGame()
});

function GetRandomWord(wordLength = 5)
{
	let word;

	do
	{
		word = WORDS[Math.floor(Math.random() * WORDS.length)];
	}
	while (word.length !== parseInt(wordLength));

	return word.toUpperCase();
}

function InitBoard(numberOfTries, wordLength)
{
	let board = document.getElementById("game-board");
	board.innerHTML = "";

	for (let i = 0; i < numberOfTries; i++)
	{
		let row = document.createElement("div");
		row.className = "letter-row-" + i;

		for (let j = 0; j < wordLength; j++)
		{
			let box = document.createElement("div");
			box.className = "letter-box-" + j;
			row.appendChild(box)
		}

		board.appendChild(row)
	}
}


function InitGame()
{
	let numberOfTries = NumberOfGuessesSlider.value
	let wordLength = WordLengthSlider.value

	CurrentWord = GetRandomWord(wordLength);
	inputContainer.maxLength = CurrentWord.length;
	GuessesMade = [];
	GuessesLeft = numberOfTries;

	ResetButtonsVisual();
	InitBoard(numberOfTries, wordLength);
	console.log(CurrentWord);
}

function GuessWord(input)
{
	input = input.toUpperCase();

	if (GuessesLeft <= 0)
	{
		return;
	}

	if (input.length !== CurrentWord.length)
	{
		$("inputContainer").notify(
			"Your word is too short",
			{
				position: "top-center",
				className: "warning"
			}
		);
		return;
	}
	else if (GuessesMade.includes(input))
	{
		$("inputContainer").notify(
			"You've already guessed this word",
			{
				position: "top-center",
				className: "warning"
			}
		);

		return;
	}
	// else if (!WORDS.includes(inputContainer.value))
	// {
	// 	$("inputContainer").notify(
	// 		"I don't know this word",
	// 		{
	// 			position: "top-center",
	// 			className: "warning"
	// 		}
	// 	);
	//
	// 	return;
	// }

	GuessesLeft--;
	GuessesMade.push(input);
	FillLetters(input, CurrentWord);
	inputContainer.value = "";
}

function FillLetters(input, currentWord)
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
			$("inputContainer").notify(
				"You won!",
				{
					position: "top-center",
					className: "success"
				}
			);
		}
	}
}

function ResetButtonsVisual()
{
	let letters = document.querySelectorAll('#visual-keyboard > *')
	letters.forEach(function (key)
	{
		key.className = "";
	})
}