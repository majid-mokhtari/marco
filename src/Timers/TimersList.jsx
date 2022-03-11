import React from "react";
import Timer from "./Timer";

export default function TimersList({ timers, onDeleteTimer }) {
  return (
    <div>
      {timers.map((t, i) => (
        <Timer title={t.title} key={i} onDeleteTimer={onDeleteTimer} />
      ))}
    </div>
  );
}
