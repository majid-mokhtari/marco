import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import Card from "./Card";
import "./styles.css";

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
    //fetch api
    setDashboard({
      toDo: [getCardComponent("toDo")],
      inProgress: [getCardComponent("inProgress")],
      done: [getCardComponent("done")],
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
              <div className="col-name">{col}</div>
              {dashboard[col].length > 0 &&
                dashboard[col].map((card, i) => <div key={i}>{card.card}</div>)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Jira;
