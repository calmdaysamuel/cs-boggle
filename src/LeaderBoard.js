import { docs } from "./firebase";

export function LeaderBoard(props) {
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

      <div className="summ">
        <div className="summary">
          <div className="main-title">Leaderboard</div>

          {docs.map((val) => {
            return (
              <div className="game-summary">
                {val.data.name}: {val.data.highScore}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
