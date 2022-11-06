import "./App.css";
import { StartGame } from "./StartGame.js";
import React, { useState } from "react";
import { InProgressGame } from "./InProgessGame";
import { GameResults } from "./GameResults";
import { findAllSolutions, RandomGrid } from "./funcs";

const words = require("./full-wordlist.json").words;
function App() {
  const [gameState, setGameState] = useState("notStarted");
  const [foundWords, setFoundWords] = useState(new Set());
  const [gridSize, setGridSize] = useState(8);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [wordList, setWordList] = useState(words);
  const [grid, setGrid] = useState(RandomGrid(gridSize));
  const [solutions, setSolutions] = useState(findAllSolutions(grid, wordList));
  const [highScore, setHighScore] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [gridId, setGridId] = useState(null);
  let startGame = () => {
    setGrid(RandomGrid(gridSize));
    setGameState("inProgress");
    setSolutions(findAllSolutions(grid, wordList));
    setHighScore(null);
    setFoundWords(new Set());
    setStartTime(new Date());
  };
  let endGame = () => {
    setEndTime(new Date());
    setGameState("ended");
  };

  let playExistingGame = () => {
    setGameState("inProgress");
    setSolutions(findAllSolutions(grid, wordList));
    setFoundWords(new Set());
    setStartTime(new Date());
  };

  let comp = <StartGame />;
  if (gameState === "notStarted") {
    comp = (
      <StartGame
        setGS={setGameState}
        setGridSize={setGridSize}
        gridSize={gridSize}
        setStartTime={setStartTime}
        startGame={startGame}
        playExistingGame={playExistingGame}
        setGrid={setGrid}
        setDisplayName={setDisplayName}
        displayName={displayName}
        highScore={highScore}
        setHighScore={setHighScore}
      />
    );
  } else if (gameState === "inProgress") {
    comp = (
      <InProgressGame
        setGS={setGameState}
        setGridSize={setGridSize}
        gridSize={gridSize}
        setEndTime={setEndTime}
        setStartTime={setStartTime}
        foundWords={foundWords}
        setFoundWords={setFoundWords}
        solutions={solutions}
        setSolutions={setSolutions}
        grid={grid}
        highScore={highScore}
        displayName={displayName}
        wordList={wordList}
        endGame={endGame}
        setGridId={setGridId}
      />
    );
  } else {
    comp = (
      <GameResults
        setGS={setGameState}
        setGridSize={setGridSize}
        gridSize={gridSize}
        startTime={startTime}
        endTime={endTime}
        foundWords={foundWords}
        solutions={solutions}
        gridId={gridId}
      />
    );
  }
  return <div className="App">{comp}</div>;
}

export default App;
