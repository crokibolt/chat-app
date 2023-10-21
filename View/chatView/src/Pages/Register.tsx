import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUsernameContext } from "../Context/UsernameContext";
import userLoggedIn, { register } from "../Helpers/fetchHelper";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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

  const handleConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const jsonData = {
      username: username,
      password: password,
    };

    register(jsonData, resetForm, setError, navigate);
  };

  return (
    <div className="login-form-container">
      <h1>Register</h1>
      <form method="post" onSubmit={handleSubmit}>
        <div className="control">
          <label htmlFor="username">Username</label> <br />
          {showError && <p className="text-red-600">Username was taken</p>}
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
        <div className="control">
          <label htmlFor="password-confirm">Confirm password</label> <br />
          <input
            type="password"
            value={passwordConfirm}
            onChange={handleConfirmChange}
            name="password-confirm"
            id="password-cofirm"
            className="text-input"
          />
          {password != passwordConfirm &&
            password.length > 0 &&
            passwordConfirm.length > 0 && (
              <p className="text-red-600">Passwords do not match</p>
            )}
        </div>
        <button type="submit" className="text-xl p-2 bg-green-600 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Register;
