import { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import "./styles.css";

// All /api endpoint are POST requests with content-type=application/json. They accept and return JSON bodies.

// Spec
// Fetch a Level
// request: http POST "https://scrabble-client.vercel.app/api/scrabble/level" {"level": YOUR-LEVEL}
// response: {board: matrix[i][j] = letter|null, candidate: array[{row: i, col: j, letter:a-z}]}
// API Request Log
// Request (method: POST):
// url: /api/scrabble

// body: {"level":"start"}

const Board = ({ board, candidate }) => {
  const column = board.length && board[0].length;

  console.log("col", column);

  return (
    board.length &&
    board.map((b, row) => {
      return (
        <div className="board-row" key={row}>
          {b.map((letter, i) => (
            <div className="board-col" key={i}>
              <span>{letter}</span>
            </div>
          ))}
        </div>
      );
    })
  );
};

const levelTypes = ["start", "out-of-bounds", "overlap", "rectangle", "large"];

export default function App() {
  const [level, setLevel] = useState("start");
  const [candidate, setCandidate] = useState([]);
  const [board, setBoard] = useState([]);

  const mergeBoardAndCandidate = () => {
    //const [row, col, letter] = candidate.length && candidate[0];
  };

  const onLevelTypesClick = (l) => {
    setLevel(l);
  };

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

      if (!response.ok) throw new Error("Error happend");

      response = await response.json();

      const { board, candidate } = response;

      setBoard(board);
      setCandidate(candidate);
      console.log("response", candidate);
    };

    fetchApi();
  }, [level]);

  useEffect(() => {
    mergeBoardAndCandidate();
  }, [candidate]);

  return (
    <div className="scrabble-container">
      <Menu widths={5}>
        {levelTypes.map((name) => (
          <Menu.Item
            name={name}
            active={level === name}
            onClick={() => onLevelTypesClick(name)}
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
