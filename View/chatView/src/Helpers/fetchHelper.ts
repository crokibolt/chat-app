import { NavigateFunction } from "react-router-dom";

interface LoginData {
  username : string,
  password : string
}

const login = async (data : LoginData, reset: () => void,
   setError : React.Dispatch<React.SetStateAction<boolean>>) => {
  fetch("https://localhost:7178/api/Account/login", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      reset();
      if (res.ok) {
        window.location.reload();
      } else {
        setError(true);
      }
    })
    .catch((err) => console.error(err));
};

const logout = async () => {
  await fetch("https://localhost:7178/api/Account/logout", {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      window.location.reload();
    }
  })
  .catch((err) => console.error(err));
}

const userLoggedIn = async () => {
  var result = await fetch("https://localhost:7178/api/Users/current", {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data.username;
    })
    .catch((err) => {
      console.log(err);
      return "";
    });

    return result;
};

const register = async (data : LoginData, reset: () => void,
   setError : React.Dispatch<React.SetStateAction<boolean>>, navigate : NavigateFunction) => {
  fetch("https://localhost:7178/api/Account/register", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      reset();
      if (res.ok) {
        navigate("/")
      } else {
        setError(true);
      }
    })
    .catch((err) => console.error(err));
};



export default userLoggedIn;
export { login, logout, register };