import React, { useState } from "react";
import Form from "./Form";
import "./styles.css";

export default function Node({ value }) {
  const [node, setNode] = useState({
    value,
    left: null,
    right: null,
  });

  const onNodeClick = () => {};

  const onInsertNode = (root, v) => {
    if (Number(v) > Number(root.value)) {
      if (root.right) {
        onInsertNode(root.right, v);
      } else {
        root.right = {
          value: v,
          left: null,
          right: null,
        };
      }
    }

    if (Number(v) < Number(root.value)) {
      if (root.left) {
        onInsertNode(root.left, v);
      } else {
        root.left = {
          value: v,
          left: null,
          right: null,
        };
      }
    }
    return root;
  };

  const onAddNode = (v) => {
    if (Number(v) === Number(node.value)) return;

    setNode((head) => {
      let newHead = onInsertNode(head, v);

      return { ...head, ...newHead };
    });
  };

  const renderBST = () => {
    console.log(node);
    return (
      <div>
        {/* {Object.keys(node).map((n, i) => (
          <div className="node" onClick={onNodeClick} key={i}>
            {node[n]}
          </div>
        ))} */}
      </div>
    );
  };

  renderBST();

  return (
    <div className="container">
      <Form onAddNode={onAddNode} />
      {/* {Object.keys(node).map((n, i) => (
        <div className="node" onClick={onNodeClick} key={i}>
          {node[n]}
        </div>
      ))} */}
    </div>
  );
}
