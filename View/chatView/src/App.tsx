import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./Components/Header.tsx";
import Chat from "./Pages/Chat.tsx";
import Login from "./Pages/Login.tsx";
import { useState } from "react";
import {
  setUsernameContext,
  usernameContext,
} from "./Context/UsernameContext.tsx";
import Register from "./Pages/Register.tsx";

function App() {
  const [username, setUsername] = useState("");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/chat",
      element: <Chat />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <>
      <Header username={username} />
      <usernameContext.Provider value={username}>
        <setUsernameContext.Provider value={setUsername}>
          <RouterProvider router={router} />
        </setUsernameContext.Provider>
      </usernameContext.Provider>
    </>
  );
}

export default App;
