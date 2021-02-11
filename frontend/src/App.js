import { useState, useEffect } from "react";
import {
  withRouter,
  BrowserRouter,
  Switch,
  NavLink,
  Route,
} from "react-router-dom";
import AddTask from "./Components/AddTask";
import Tasks from "./Components/Tasks";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [result, setResult] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [taskList, setTaskList] = useState();
  const [currentUserLevel, setCurrentUserLevel] = useState("");
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(0);
  const validateEmail = (value) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    );
  };
  const loginHandler = () => {
    const tempEmail = loginEmail.trim();
    const tempPassword = loginPassword.trim();

    if (tempEmail !== "" && tempPassword !== "") {
      if (validateEmail(tempEmail)) {
        const loginDetails = {};
        loginDetails.email = tempEmail;
        loginDetails.password = tempPassword;
        fetch("/login", {
          method: "POST",
          body: JSON.stringify(loginDetails),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.ok) {
              setError("");
              setLoginEmail("");
              setLoginPassword("");
              setResult("");
              setIsLoggedIn(true);
              setCurrentUser(res.currentUser);
              setCurrentUserLevel(res.groupId);
            } else {
              setError(res.msg);
            }
          }); //.catch(err=>setError('Some Problem is going on,Try Later'));
      } else {
        setError("Enter Valid Email Id");
      }
    } else {
      setError("All Fields Are Compulsory");
    }
  };
  const signupHandler = () => {
    const tempEmail = email.trim();
    const tempPassword = password.trim();
    const tempConfirmPassword = confirmPassword.trim();
    if (
      name.trim() !== "" &&
      tempEmail !== "" &&
      role.trim() !== "" &&
      tempPassword !== "" &&
      tempConfirmPassword !== ""
    ) {
      if (validateEmail(tempEmail)) {
        if (tempPassword === tempConfirmPassword) {
          let data = {};
          data.name = name;
          data.email = tempEmail;
          data.password = password;
          data.groupId = Number(role);

          console.log(data);
          fetch("/signup", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.ok) {
                setResult(res.msg);
                setError("");
                setEmail("");
                setName("");
                setPassword("");
                setConfirmPassword("");
                setRole("");
              } else {
                setError(res.msg);
                setResult("");
              }
            })
            .catch((err) => setError("Some Problem is going on,Try Later"));
          setError("");
          setResult("");
        } else {
          setError("Confirm Password doesn't Match");
        }
      } else {
        setError("Enter Valid Email Address");
      }
    } else {
      setError("All Fields Are Compulsory");
    }
  };

  useEffect(() => {
    fetch("/tasks", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res;
        console.log(data);
        setTaskList(data);
      });
    console.log(taskList);
  }, [isLoggedIn, update]);

  useEffect(() => {
    fetch("/users", {
      method: "POST",
      body: JSON.stringify({ groupId: currentUserLevel }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res;
        setUsers(data);
      });
    console.log(users);
  }, [taskList]);
  return (
    <div className="grid-container">
      <BrowserRouter>
        <header>
          <nav>
            <ul>
              {isLoggedIn ? (
                <>
                  <li>
                    <NavLink to="/tasks" activeClassName="active-link">
                      Task List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/add-task" activeClassName="active-link">
                      Add Task
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/"
                      activeClassName="active-link"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      {currentUser} Logout
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to="/" activeClassName="active-link">
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup" activeClassName="active-link">
                      Signup
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/signup">
              <div className="form-wrapper">
                <h1>Signup here</h1>

                <div className="form-content">
                  <label className="error">{error}</label>
                  <label className="result">{result}</label>
                  <input
                    type="email"
                    value={email}
                    className="input-style"
                    placeholder="Enter Email Id"
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => {
                      setError("");
                      setResult("");
                    }}
                  />

                  <input
                    type="text"
                    value={name}
                    className="input-style"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => {
                      setError("");
                      setResult("");
                    }}
                  />

                  <select
                    className="input-style"
                    onChange={(e) => setRole(e.target.value)}
                    onFocus={() => {
                      setError("");
                      setResult("");
                    }}
                  >
                    <option value="">Select Your Role</option>
                    <option value="1">CEO</option>
                    <option value="2">Director</option>
                    <option value="3">Manager</option>
                    <option value="4">Coordinator</option>
                    <option value="0">Admin</option>
                  </select>

                  <input
                    type="password"
                    value={password}
                    className="input-style"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => {
                      setError("");
                      setResult("");
                    }}
                  />
                  <input
                    type="password"
                    value={confirmPassword}
                    className="input-style"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => {
                      setError("");
                      setResult("");
                    }}
                  />

                  <button
                    type="button"
                    className="input-style btn"
                    onClick={signupHandler}
                  >
                    Signup
                  </button>
                </div>
              </div>
            </Route>
            <Route path="/add-task">
              <AddTask
                error={error}
                setError={setError}
                result={result}
                setResult={setResult}
                currentUser={currentUser}
                taskList={taskList}
                setTaskList={setTaskList}
                update={update}
                setUpdate={setUpdate}
              />
            </Route>
            <Route path="/">
              {isLoggedIn ? (
                <Tasks
                  taskList={taskList}
                  setTaskList={setTaskList}
                  currentUserLevel={currentUserLevel}
                  users={users}
                  setUsers={setUsers}
                  update={update}
                  setUpdate={setUpdate}
                />
              ) : (
                <div className="form-wrapper">
                  <h1>Login here</h1>

                  <div className="form-content">
                    <label className="error">{error}</label>
                    <label className="result">{result}</label>
                    <input
                      type="email"
                      className="input-style"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Enter Your Email ID"
                      onFocus={() => {
                        setError("");
                        setResult("");
                      }}
                    />
                    <input
                      type="password"
                      className="input-style"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter Password"
                      onFocus={() => {
                        setError("");
                        setResult("");
                      }}
                    />
                    <button
                      type="button"
                      className="input-style btn"
                      onClick={loginHandler}
                    >
                      Login
                    </button>
                  </div>
                </div>
              )}
            </Route>
          </Switch>
        </main>
        <footer>
          <h3>© 2021 Developed by Kamalakar G</h3>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
