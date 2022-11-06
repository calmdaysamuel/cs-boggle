export function Summary(props) {
  return (
    <div className="summ">
      {props.showExtra ? (
        <div className="summary">
          <div className="game-summary">Game Summary</div>
          <div>Total Words Found: {props.foundWords.size}</div>
          <div>
            Total Time:{" "}
            {((props.endTime - props.startTime) / 1000).toString() + "s"}
          </div>
        </div>
      ) : null}

      <div className="summary">
        <div className="game-summary">Founds Words</div>
        {Array.from(props.foundWords).map((val) => {
          return <div>{val}</div>;
        })}
      </div>
      {props.showExtra ? (
        <div className="summary">
          <div className="game-summary">Missed Words</div>
          {Array.from(props.solutions).map((val) => {
            return <div>{val}</div>;
          })}
        </div>
      ) : null}
    </div>
  );
}
