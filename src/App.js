import Timers from "./Timers";
import Scrabble from "./Scrabble";
import Jira from "./Jira";
import { Tab } from "semantic-ui-react";
import "./App.css";
import TicTacToe from "./TicTacToe";
import BST from "./BST";
import Giphy from "./Giphy";
import Poke from "./Poke/Poke";

function App() {
  const panes = [
    {
      menuItem: "Scrabble",
      render: () => (
        <Tab.Pane attached={false}>
          <Scrabble />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Timers",
      render: () => (
        <Tab.Pane attached={false}>
          <Timers />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Jira",
      render: () => (
        <Tab.Pane attached={false}>
          <Jira />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "TicTacToe",
      render: () => (
        <Tab.Pane attached={false}>
          <TicTacToe />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "BST",
      render: () => (
        <Tab.Pane attached={false}>
          <BST value={"10"} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Giphy",
      render: () => (
        <Tab.Pane attached={false}>
          <Giphy />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Poke",
      render: () => (
        <Tab.Pane attached={false}>
          <Poke />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="app-container">
      <Tab panes={panes} menu={{ pointing: true }} defaultActiveIndex={6} />
    </div>
  );
}

export default App;
