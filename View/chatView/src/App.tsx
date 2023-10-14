import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import userLoggedIn, { login } from "../src/Helpers/loginHelper.ts";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      if (await userLoggedIn()) {
        navigate("/chat");
      }
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

    login(jsonData, resetForm, navigate);
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
