import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import { redirect, useNavigate } from "react-router-dom";
import userLoggedIn from "../src/Helpers/loginHelper.js";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      await fetch("https://localhost:7178/api/Users/current", {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            navigate("/chat");
          }
        })
        .catch((err) => console.error(err));
    };
    func();
  }, []);

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jsonData = {
      username: username,
      password: password,
    };

    fetch("https://localhost:7178/api/Account/login", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((res) => {
        resetForm();
        if (res.ok) {
          navigate("/chat");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>Login</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label> <br />
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            name="username"
            id="username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label> <br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            name="password"
            id="password"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
