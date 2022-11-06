import { GameGrid } from "./GameGrid";
import React, { useState } from "react";
import { Summary } from "./Summary";

export function InProgressGame(props) {
  const [guess, setGuess] = useState("");
  const [lastGuess, setLastGuess] = useState("");
  const [allGuesses, setAllGuesses] = useState([]);
  let makeGuess = () => {
    console.log("guess", guess, allGuesses, props.solutions);
    setLastGuess(guess);
    if (props.solutions.includes(guess)) {
      props.foundWords.add(guess);

      props.setFoundWords(props.foundWords);
    }
    allGuesses.push(guess);
    setGuess("");
    setAllGuesses(allGuesses);
  };

  let guessDisplay = () => {
    if (allGuesses.includes(lastGuess)) {
      return `You have already guessed ${lastGuess}`;
    }
    if (lastGuess === "") {
      return "You have not made a guess yet";
    } else if (props.solutions.includes(lastGuess)) {
      return `${lastGuess} Is Correct!!`;
    } else {
      return `${lastGuess} is Incorrect!!`;
    }
  };

  return (
    <div className="in-pro">
      <div className="header">
        <h3>Hi, {props.displayName}</h3>

        <button onClick={() => props.setGS("notStarted")}>
          Start New Game
        </button>
      </div>
      {props.highScore ? <h3>The current high is: {props.highScore}</h3> : null}
      <GameGrid
        grid={props.grid}
        setSolutions={props.setSolutions}
        wordList={props.wordList}
      />

      <div className="guessField">
        <h4>Make your Guess</h4>
        <div>{guessDisplay()}</div>
        <input
          value={guess}
          onChange={(event) => setGuess(event.target.value)}
          placeholder="Type in your guess"
        />
        <button className="green" onClick={makeGuess}>
          Make Guess
        </button>
        <button className="red" onClick={props.endGame}>
          End Game
        </button>
      </div>
      <Summary showExtra={false} foundWords={props.foundWords} />
    </div>
  );
}
