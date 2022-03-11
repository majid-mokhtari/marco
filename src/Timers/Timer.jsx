import { useEffect, useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import "./Timers.css";
import { formatTime } from "./util";

function Timer({ title, onDeleteTimer }) {
  const [counter, setCounter] = useState(0);
  const [time, setTime] = useState(formatTime(counter));
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setRunning] = useState(false);

  const onStart = () => {
    let intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);
    setIntervalId(intervalId);
    setRunning(true);
  };

  const onStop = () => {
    clearInterval(intervalId);
    setRunning(false);
  };

  useEffect(() => {
    setTime(() => formatTime(counter));
  }, [counter]);

  return (
    <div className="timer-card">
      <span className="title">{title}</span>
      <span className="time">{time}</span>
      <span onClick={() => onDeleteTimer({ title })} className="delete">
        <Icon name="trash alternate outline" />
      </span>
      <div className="buttons">
        {isRunning ? (
          <Button onClick={onStop} basic color="red">
            Stop
          </Button>
        ) : (
          <Button onClick={onStart} basic color="green">
            Start
          </Button>
        )}
      </div>
    </div>
  );
}

export default Timer;
