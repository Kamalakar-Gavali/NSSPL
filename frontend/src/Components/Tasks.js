import { useState, useEffect } from "react";

const Tasks = (props) => {
  const [us, setUs] = useState([
    {
      name: "pop",
      email: "pop@gmail.com",
    },
    {
      name: "kg",
      email: "kg@gmail.com",
    },
  ]);
  const [selectVal, setSelectVal] = useState("");

  const assignTask = async (id, prevUserEmail, newUserEmail) => {
    fetch("/tasks", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        prevUserEmail: prevUserEmail,
        newAssignedUser: newUserEmail,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        props.setUpdate(props.update + 1);
        alert(res.msg);
      });
  };

  return (
    <>
      {console.log(props.users)}
      {console.log("users" + us[0].email)}
      <table className="table-style">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created By</th>
            <th>Created At</th>
            <th>AssignedTo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {props.taskList.map((task, index) => (
            <tr key={index}>
              <td>{task._id}</td>
              <td>{task.taskTitle}</td>
              <td>{task.taskDesc}</td>
              <td>{task.createdBy}</td>
              <td>{task.createdAt}</td>
              <td>
                <select
                  className="input-style"
                  value={task.assignedTo}
                  onChange={(e) =>
                    assignTask(task._id, task.assignedTo, e.target.value)
                  }
                >
                  <>
                    <option value={task.assignedTo}>{task.assignedTo}</option>
                    {props.users.map((user, index) => (
                      <option value={user.email}>{user.email}</option>
                    ))}
                  </>
                </select>
              </td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tasks;
