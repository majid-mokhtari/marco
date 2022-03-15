import { useState } from "react";
import NewTimerForm from "./NewTimerForm";
import Timer from "./Timer";
import { Icon } from "semantic-ui-react";
import "./styles.css";

const Timers = () => {
  const [timers, setTimers] = useState([]);
  const [addTimerFormVisible, setAddTimerFormVisible] = useState(true);

  const onAddTimerClick = () => setAddTimerFormVisible(true);

  const onNewTimerCreate = (timer) => {
    setTimers([...timers, timer]);
  };

  const onCancelCreateNewTimer = () => setAddTimerFormVisible(false);

  const onDeleteTimer = (timer) => {
    setTimers(timers.filter((t) => t.title !== timer.title));
  };

  return (
    <div className="timers-container">
      <h2>Timers</h2>
      {timers.map((t, i) => (
        <Timer title={t.title} key={i} onDeleteTimer={onDeleteTimer} />
      ))}
      {addTimerFormVisible && (
        <NewTimerForm
          onNewTimerCreate={onNewTimerCreate}
          onCancelCreateNewTimer={onCancelCreateNewTimer}
        />
      )}
      <div onClick={onAddTimerClick} className="plus-button">
        <Icon name="plus" color="black" />
      </div>
    </div>
  );
};

export default Timers;
