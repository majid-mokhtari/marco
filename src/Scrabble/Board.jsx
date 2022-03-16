const Board = ({ board, candidate }) => {
  const { row, col } = candidate.length && candidate[0];

  const getClassName = (boardRow, boardCol) => {
    if (boardRow === row && boardCol === col) {
      return "candidate";
    }
    return "letter";
  };

  const getLetter = (letter, boardRow, boardCol) => {
    if (letter.length < 2) {
      return <span className={getClassName(boardRow, boardCol)}>{letter}</span>;
    } else {
      const [currentLetter, candidateLetter] = letter.split("");
      return (
        <>
          <span className="candidate overlap">{currentLetter}</span>
          <span className="letter overlap">{candidateLetter}</span>
        </>
      );
    }
  };

  return (
    board.length &&
    board.map((arr, boardRow) => {
      return (
        <div className="board-row" key={boardRow}>
          {arr.map((letter, boardCol) => (
            <div className="board-col" key={boardCol}>
              {letter && getLetter(letter, boardRow, boardCol)}
            </div>
          ))}
        </div>
      );
    })
  );
};

export default Board;
