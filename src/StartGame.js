import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, docsCall, gamesQuery } from "./firebase";
export function StartGame(props) {
  const [games, setDocs] = useState([]);

  useEffect(() => {
    async function call() {
      let d = await docsCall();

      setDocs(d);
    }
    call();
  }, []);

  const [selected, setSelected] = useState(null);
  let select = (event) => {
    var val;
    for (var doc of games) {
      if (doc.id === event.target.value) {
        val = doc;
      }
    }

    props.setHighScore(val.data.highScore);
    props.setGrid(val.grid);
    props.setGridSize(val.grid.length);
  };
  return (
    <div className="start-game">
      <button className="main-button" onClick={props.openLeaderboard}>
        Open Leaderboard
      </button>
      <button
        className="main-button"
        onClick={async () => {
          let ud = await signInWithPopup(auth, new GoogleAuthProvider());
          props.setDisplayName(ud.user.displayName);
        }}
      >
        Sign In With Google
      </button>
      <h1 className="main-title">Play Boggle</h1>
      <h1 className="main-title">✌️ {props.displayName}</h1>
      <input
        type="number"
        min="3"
        max="10"
        value={props.gridSize}
        onChange={(event) => props.setGridSize(event.target.value)}
        className="main-input"
      />

      <button className="main-button" onClick={props.startGame}>
        Start A New Game
      </button>
      <select id="games" onChange={select}>
        {games.map((val, index) => {
          return (
            <option value={val.id}>
              {`Game ${index + 1}: ` + val.data.name}
            </option>
          );
        })}
      </select>
      <button className="main-button" onClick={props.playExistingGame}>
        Playing an Existing Game
      </button>

      <h4>Completed Features</h4>
      <div>[x] Display a running list of words found</div>
      <div>[x] Notify users when they submit an answer they already found</div>
      <div>
        [x] Start/Stop Button: ** Hide the board until “Start” is clicked.
      </div>
      <div>[x] ** Display remaining words when “Stop” is clicked</div>
      <div>[x] Generate random board</div>
      <div>[x] Make it pretty</div>
    </div>
  );
}
