import { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import "./styles.css";

const Board = ({ board, candidate }) => {
  const column = board.length && board[0].length;
  const { row, col } = candidate.length && candidate[0];

  console.log("col", column);

  const getClassName = (boardRow, boardCol) => {
    if (boardRow === row && boardCol === col) {
      return "candidate";
    }
    return "letter";
  };

  return (
    board.length &&
    board.map((arr, boardRow) => {
      return (
        <div className="board-row" key={boardRow}>
          {arr.map((letter, boardCol) => (
            <div className="board-col" key={boardCol}>
              <span className={letter && getClassName(boardRow, boardCol)}>
                {letter}
              </span>
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

  const mergeBoardAndCandidate = (board, candidate) => {
    const { row, col, letter } = candidate.length && candidate[0];
    console.log(row, col, letter);
    console.log(board);
    setBoard(
      board.map((arr, i) => {
        if (i === row) {
          arr[col] = letter;
          return arr;
        } else {
          return arr;
        }
      })
    );
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
