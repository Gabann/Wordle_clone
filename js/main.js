import {WORDS} from "./words.js";

let NumberOfGuesses;
let GuessesLeft = NumberOfGuesses;
let GuessesMade = [];
let CurrentWord;
let buttons = document.querySelectorAll("button");
let input = document.getElementById("input");

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

function GetRandomWord(wordLength = 5)
{
	let word;

	do
	{
		word = WORDS[Math.floor(Math.random() * WORDS.length)];
	}
	while (word.length !== wordLength);

	return word;
}

function InitBoard()
{
	let board = document.getElementById("game-board");
	// board.innerHTML = "";

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


function InitGame(numberOfTries = 6, wordLength)
{
	NumberOfGuesses = numberOfTries;

	CurrentWord = GetRandomWord(wordLength);
	input.maxLength = CurrentWord.length;
	GuessesMade = [];
	GuessesLeft = NumberOfGuesses;

	InitBoard();
	console.log(CurrentWord);
}

document.addEventListener("keypress", function (event)
{
	// If the user presses the "Enter" key on the keyboard
	if (event.key === "Enter")
	{
		// Cancel the default action, if needed
		event.preventDefault();

		TestWord(input);
	}
});

function TestWord(input)
{
	if (GuessesLeft <= 0)
	{
		return;
	}

	if (input.length !== CurrentWord.length)
	{
		$("input").notify(
			"Your word is too short",
			{
				position: "top-center",
				className: "warning"
			}
		);
		return;
	}
	else if (GuessesMade.includes(input.value))
	{
		$("input").notify(
			"You've already guessed this word",
			{
				position: "top-center",
				className: "warning"
			}
		);

		return;
	}
	// else if (!WORDS.includes(input.value))
	// {
	// 	$("input").notify(
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
	input.value = "";
}

function FillLetters(input, currentWord)
{
	let correctLetters = 0;

	let row = document.querySelector(`.letter-row-${GuessesMade.length - 1}`);

	for (let i = 0; i < currentWord.length; i++)
	{
		let letter = row.querySelector(`.letter-box-${i}`);
		letter.innerHTML = input.value.at(i);
		let visualKeyboardLetter = document.querySelector(`#${input.value.at(i).toUpperCase()}`);

		if (input.value.at(i) === currentWord.at(i))
		{
			letter.classList.add("correct-letter");
			visualKeyboardLetter.classList.add("correct-letter");
			correctLetters++;
		}
		else if (currentWord.includes(input.value.at(i)))
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

InitGame(6, 5);

TestWord("qwerty");
TestWord("begin");
TestWord("pages");
TestWord("behind");