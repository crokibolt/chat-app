import { useEffect } from "react";
import userLoggedIn from "../Helpers/fetchHelper";
import { useNavigate } from "react-router-dom";
import Messages from "../Components/Messages";
import MessageForm from "../Components/MessageForm";

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

  return (
    <div>
      <Messages />
      <MessageForm />
    </div>
  );
}

export default Chat;
