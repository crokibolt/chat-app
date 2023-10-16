import { useContext, useEffect } from "react";
import userLoggedIn from "../Helpers/fetchHelper";
import { useNavigate } from "react-router-dom";
import Messages from "../Components/Messages";
import MessageForm from "../Components/MessageForm";
import { setUsernameContext } from "../Context/UsernameContext";

function Chat() {
  const context = useContext(setUsernameContext);
  const navigate = useNavigate();

  useEffect(() => {
    const func = async () => {
      const user = await userLoggedIn();
      context ? context(user) : null;
      if (user == "" && context) {
        context("");
        navigate("/");
      }
    };
    func();
  }, []);

  return (
    <div className="text-lg w-[1200px] h-[700px] mt-[60px] mx-auto shadow-xl rounded-lg">
      <Messages />
      <MessageForm />
    </div>
  );
}

export default Chat;
