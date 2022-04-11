import React, { useState } from "react";

export default function Form({ onAddNode }) {
  const [value, setValue] = useState("");
  return (
    <div>
      <label>Enter node: </label>
      <input
        type="text"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <button onClick={() => onAddNode(value)}>Enter</button>
    </div>
  );
}
