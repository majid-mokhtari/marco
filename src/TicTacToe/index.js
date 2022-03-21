import React, { useState } from "react";
import "./styles.css";

export default function TicTacToe() {
  const [game, setGame] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [player, setPlayer] = useState(1);

  const [results, setResults] = useState({
    row: new Array(3).fill(0),
    col: new Array(3).fill(0),
    rightDiagnol: 0,
    leftDiagnol: 0,
  });

  const onCellClick = (i, j) => {
    const updatedGame = [...game];
    updatedGame[i][j] = player === 1 ? "X" : "O";
    setGame(updatedGame);

    const winner = checkResults(i, j);

    if (winner) {
      console.log("Player " + winner + " Won!");
    } else {
      setPlayer(player === 1 ? -1 : 1);
    }
  };

  const checkResults = (i, j) => {
    const row = [...results.row];
    row[i] += player;

    const col = [...results.col];
    col[j] += player;

    const rightDiagnol =
      i === j ? results.rightDiagnol + player : results.rightDiagnol;

    const leftDiagnol =
      i === 2 - j ? results.leftDiagnol + player : results.leftDiagnol;

    setResults({
      ...results,
      row,
      col,
      rightDiagnol,
      leftDiagnol,
    });

    if (
      Math.abs(row[i]) === 3 ||
      Math.abs(col[j]) === 3 ||
      Math.abs(rightDiagnol) === 3 ||
      Math.abs(leftDiagnol) === 3
    ) {
      return player;
    }
  };

  return (
    <div className="game-board">
      {game.map((row, i) => (
        <div key={i} className="game-row">
          {row.map((col, j) => (
            <div key={j} className="game-col" onClick={() => onCellClick(i, j)}>
              {col}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
