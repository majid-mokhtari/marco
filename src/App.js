import Timers from "./Timers";
import Scrabble from "./Scrabble";
import { Tab } from "semantic-ui-react";
import "./App.css";

function App() {
  const panes = [
    {
      menuItem: "Timers",
      render: () => (
        <Tab.Pane attached={false}>
          <Timers />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Scrabble",
      render: () => (
        <Tab.Pane attached={false}>
          <Scrabble />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="app-container">
      <Tab panes={panes} menu={{ pointing: true }} />
    </div>
  );
}

export default App;
