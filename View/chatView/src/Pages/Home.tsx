import { useContext, useEffect } from "react";
import { setUsernameContext } from "../Context/UsernameContext";
import { Link, useNavigate } from "react-router-dom";
import userLoggedIn from "../Helpers/fetchHelper";

function Home() {
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
  return (
    <div className="flex flex-col gap-5 justify-center items-center mt-[80px]">
      <h1 className="text-5xl font-bold">Welcome to Awesome Chat</h1>
      <h3 className="text-3xl font-semibold">You need to login</h3>
      <div>
        <Link className="text-xl p-2 bg-blue-600 rounded-md mr-3" to={"/login"}>
          Login
        </Link>
        <Link className="text-xl p-2 bg-green-600 rounded-md" to={"/register"}>
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
