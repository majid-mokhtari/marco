import { useState } from "react";
import NewTimerForm from "./Timers/NewTimerForm";
import TimersList from "./Timers/TimersList";
import "./App.css";
import { Button, Icon } from "semantic-ui-react";

function App() {
  const [timers, setTimers] = useState([]);
  const [addTimerFormVisible, setAddTimerFormVisible] = useState(false);

  const onAddTimerClick = () => setAddTimerFormVisible(true);

  const onNewTimerCreate = (timer) => {
    setTimers([...timers, timer]);
  };

  const onCancelCreateNewTimer = () => setAddTimerFormVisible(false);

  const onDeleteTimer = (timer) => {
    setTimers(timers.filter((t) => t.title !== timer.title));
  };

  return (
    <div className="app-container">
      <h2>Timers</h2>
      <TimersList timers={timers} onDeleteTimer={onDeleteTimer} />
      {addTimerFormVisible && (
        <NewTimerForm
          onNewTimerCreate={onNewTimerCreate}
          onCancelCreateNewTimer={onCancelCreateNewTimer}
        />
      )}
      <Button onClick={onAddTimerClick}>
        <Icon name="plus" color="black" />
      </Button>
    </div>
  );
}

export default App;
