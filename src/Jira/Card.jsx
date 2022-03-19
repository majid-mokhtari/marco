import React from "react";
import { Button } from "semantic-ui-react";

export default function Card({
  moveLeft,
  moveRight,
  onMoveLeftClick,
  onMoveRightClick,
  id,
  colType,
}) {
  return (
    <div className="card">
      <div className="card-buttons">
        {moveLeft && (
          <Button onClick={() => onMoveLeftClick(id, colType)}>{"<"}</Button>
        )}
        {moveRight && (
          <Button onClick={() => onMoveRightClick(id, colType)}>{">"}</Button>
        )}
      </div>
    </div>
  );
}
