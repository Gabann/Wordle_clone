import {WORDS} from "./words.js";

const NumberOfGuesses = 6;
let GuessesLeft = NumberOfGuesses;
let GuessesMade = [];

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
        row.className = "letter-row";

        for (let j = 0; j < CurrentWord.length; j++)
        {
            let box = document.createElement("div");
            box.className = "letter-box";
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

input.addEventListener("keypress", function (event)
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

    for (let i = 0; i < currentWord.length; i++)
    {
        if (input.at(i) === currentWord.at(i))
        {
            console.log(`letter ${input.at(i)} is correct`);
            correctLetters++;
        }
        else if (currentWord.includes(input.at(i)))
        {
            console.log(`${input.at(i)} is inside the word but not at correct location`);
        }

        if (currentWord.length === correctLetters)
        {
            console.log("You won");
        }
    }
}

// function InsertKey(key) 
// {
//	
// }

console.log(CurrentWord);
InitBoard();