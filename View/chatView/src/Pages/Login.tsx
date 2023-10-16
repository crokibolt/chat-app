import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import userLoggedIn, { login } from "../Helpers/fetchHelper";
import { setUsernameContext } from "../Context/UsernameContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setError] = useState(false);

  const context = useContext(setUsernameContext);

  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      const user = await userLoggedIn();
      if (user != "" && context) {
        context(user);
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

    login(jsonData, resetForm, setError);
  };

  return (
    <div className="login-form-container">
      <h1>Login</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="control">
          <label htmlFor="username">Username</label> <br />
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            name="username"
            id="username"
            className="text-input"
          />
        </div>
        <div className="control">
          <label htmlFor="password">Password</label> <br />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            name="password"
            id="password"
            className="text-input"
          />
        </div>
        <button type="submit" className="text-xl p-2 bg-green-600 rounded-md">
          Submit
        </button>
      </form>
      {showError ? (
        <p className="text-lg text-red-600">Invalid username or password</p>
      ) : null}
    </div>
  );
}

export default Login;
