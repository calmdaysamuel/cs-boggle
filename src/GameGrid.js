import React, { useState } from "react";

export function GameGrid(props) {
  return (
    <div className="game-grid">
      {props.grid.map((row) => {
        return (
          <div className="grid-row">
            {row.map((cell) => {
              return <div className="grid-cell">{cell}</div>;
            })}
          </div>
        );
      })}
    </div>
  );
}
