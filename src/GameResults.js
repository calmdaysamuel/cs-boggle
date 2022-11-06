import { Summary } from "./Summary";

export function GameResults(props) {
  return (
    <div>
      <div className="header">
        <h3>Samuel Calmday Boggle</h3>
        <input
          type="number"
          min="3"
          max="10"
          value={props.gridSize}
          onChange={(event) => props.setGridSize(event.target.value)}
          class="main-input"
        />

        <button onClick={() => props.setGS("notStarted")}>
          Start New Game
        </button>
      </div>

      <Summary
        startTime={props.startTime}
        endTime={props.endTime}
        showExtra={true}
        wordList={props.wordList}
        foundWords={props.foundWords}
        solutions={props.solutions}
      />
    </div>
  );
}
