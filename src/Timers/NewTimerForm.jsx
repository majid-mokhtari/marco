import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import "./Timers.css";

export default function NewTimerForm({
  onNewTimerCreate,
  onCancelCreateNewTimer,
}) {
  const [title, setTitle] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onTitleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const onCreate = () => {
    setTitle("");
    onNewTimerCreate({ title });
    onCancelCreateNewTimer();
  };

  const onCancel = () => {
    setTitle("");
    onCancelCreateNewTimer();
  };

  return (
    <Form onSubmit={onSubmit} className="timer-form">
      <Form.Field className="timer-form-input">
        <label htmlFor="title">Title </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onTitleChange}
        />
      </Form.Field>
      <div className="timer-form-buttons">
        <Button onClick={onCreate} color="blue" basic>
          Create
        </Button>
        <Button onClick={onCancel} color="red" basic>
          Cancel
        </Button>
      </div>
    </Form>
  );
}
