import { NavigateFunction } from "react-router-dom";

interface LoginData {
  username : string,
  password : string
}

const login = async (data : LoginData, reset: () => void, navigate : NavigateFunction) => {
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
        navigate("/chat");
      }
    })
    .catch((err) => console.error(err));
};

const userLoggedIn = async () => {
  var result = await fetch("https://localhost:7178/api/Users/current", {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.ok;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });

    return result;
};





export default userLoggedIn;
export {login};