import { useState, useEffect } from "react";

const AddTask = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const addTask = () => {
    const tempTitle = title.trim();
    const tempDesc = desc.trim();
    let data = [];
    if (tempTitle !== "" && tempDesc !== "") {
      const taskData = {};
      taskData.taskTitle = tempTitle;
      taskData.taskDesc = tempDesc;
      taskData.createdBy = props.currentUser;
      taskData.createdAt = new Date();
      taskData.assignedTo = "";
      taskData.status = "Pending";
      fetch("/addTask", {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.ok) {
            setTitle("");
            setDesc("");
            props.setUpdate(props.update + 1);
            props.setResult(res.msg);
            props.setError("");
          } else {
            props.setResult("");
            props.setError(res.msg);
          }
        });
      //.catch((e) => props.setError("Something went Wrong ,Try Again Later"));
    } else {
      props.setError("All fields Are Compulsory");
    }
  };
  return (
    <div className="form-wrapper">
      <h1>Add Task here</h1>
      <div className="form-content">
        <label className="error">{props.error}</label>
        <label className="result">{props.result}</label>
        <input
          type="text"
          value={title}
          className="input-style"
          placeholder="Enter Task Title"
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => {
            props.setError("");
            props.setResult("");
          }}
        />
        <input
          type="text"
          value={desc}
          className="input-style"
          placeholder="Enter Description here"
          onChange={(e) => setDesc(e.target.value)}
          onFocus={() => {
            props.setError("");
            props.setResult("");
          }}
        />
        <button type="button" className=" input-style btn" onClick={addTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};
export default AddTask;
