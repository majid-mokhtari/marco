import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import Card from "./Card";
import "./styles.css";

const JiraColNames = {
  toDo: "To Do",
  inProgress: "In Progress",
  done: "Done",
};

const Jira = () => {
  const [dashboard, setDashboard] = useState({
    toDo: [],
    inProgress: [],
    done: [],
  });

  const onMoveLeftClick = (id, colType) => {
    console.log("left clicked", id, colType);

    if (colType === "done") {
      setDashboard((dashboard) => ({
        ...dashboard,
        done: dashboard.done.filter((card) => card.id !== id),
        inProgress: [
          ...dashboard.inProgress,
          getCardComponent("inProgress", id),
        ],
      }));
    }

    if (colType === "inProgress") {
      setDashboard((dashboard) => ({
        ...dashboard,
        inProgress: dashboard.inProgress.filter((card) => card.id !== id),
        toDo: [...dashboard.toDo, getCardComponent("toDo", id)],
      }));
    }
  };

  const onMoveRightClick = (id, colType) => {
    console.log("right clicked", id, colType);
    if (colType === "toDo") {
      setDashboard((dashboard) => ({
        ...dashboard,
        inProgress: [
          ...dashboard.inProgress,
          getCardComponent("inProgress", id),
        ],
        toDo: dashboard.toDo.filter((card) => card.id !== id),
      }));
    }

    if (colType === "inProgress") {
      setDashboard((dashboard) => ({
        ...dashboard,
        inProgress: dashboard.inProgress.filter((card) => card.id !== id),
        done: [...dashboard.done, getCardComponent("done", id)],
      }));
    }
  };

  const generateUniqueId = () => Math.floor(Math.random() * 100000);

  const getCardComponent = (colType, id) => {
    const cardId = id || generateUniqueId();
    return {
      id: cardId,
      card: (
        <Card
          moveRight={colType !== "done"}
          moveLeft={colType !== "toDo"}
          onMoveRightClick={onMoveRightClick}
          onMoveLeftClick={onMoveLeftClick}
          id={cardId}
          colType={colType}
        />
      ),
    };
  };

  const onCreateNewClick = () => {
    setDashboard({
      ...dashboard,
      toDo: [...dashboard.toDo, getCardComponent("toDo")],
    });
  };

  useEffect(() => {
    setDashboard({
      toDo: [],
      inProgress: [],
      done: [],
    });
  }, []);

  return (
    <div className="dashboard">
      <div className="create-new">
        <Button onClick={onCreateNewClick}>Create New</Button>
      </div>
      <div className="dashboard-container">
        {Object.keys(dashboard).map((col, i) => {
          return (
            <div className="dashboard-col" key={i}>
              <div className="col-name">{JiraColNames[col]}</div>
              {dashboard[col].map(({ card, id }) => (
                <div key={id}>{card}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jira;
