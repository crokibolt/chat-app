import { useEffect } from "react";
import userLoggedIn from "../Helpers/loginHelper";
import { useNavigate } from "react-router-dom";

function Chat() {
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      if (!(await userLoggedIn())) {
        navigate("/");
      }
    };

    func();
  }, []);

  return <div>Chat</div>;
}

export default Chat;
