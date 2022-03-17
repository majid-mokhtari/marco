import { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import Board from "./Board";
import "./styles.css";

const levelTypes = ["start", "out-of-bounds", "overlap", "rectangle", "large"];

export default function Scrabble() {
  const [level, setLevel] = useState("start");
  const [candidate, setCandidate] = useState([]);
  const [board, setBoard] = useState([]);

  const mergeBoardAndCandidate = (board, candidate) => {
    let updatedBoard = [...board];

    candidate.forEach((data, i) => {
      const { row, col, letter } = data;
      //TODO: it works for every level types except out-of-bounds
      if (row < board.length && col < board[0].length) {
        updatedBoard[row][col] = updatedBoard[row][col]
          ? updatedBoard[row][col] + letter
          : letter;
      }
    });
    setBoard(updatedBoard);
  };

  const onLevelTypesClick = (l) => setLevel(l);

  useEffect(() => {
    const fetchApi = async () => {
      let body = JSON.stringify({ level });
      let response = await fetch(
        "https://scrabble-client.vercel.app/api/scrabble/level",
        {
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      response = await response.json();

      if (response.error) {
        throw new Error(response.message);
      } else {
        const { board, candidate } = response;
        setBoard(board);
        setCandidate(candidate);
        mergeBoardAndCandidate(board, candidate);
      }
    };

    fetchApi();
  }, [level]);

  return (
    <div className="scrabble-container">
      <Menu widths={5}>
        {levelTypes.map((name, i) => (
          <Menu.Item
            name={name}
            active={level === name}
            onClick={() => onLevelTypesClick(name)}
            key={i}
          >
            {name}
          </Menu.Item>
        ))}
      </Menu>

      <div className="board-container">
        <Board board={board} candidate={candidate} />
      </div>
    </div>
  );
}
