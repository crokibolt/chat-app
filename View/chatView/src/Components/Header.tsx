import { logout } from "../Helpers/fetchHelper";

interface HeaderProps {
  username: string;
}

function Header({ username }: HeaderProps) {
  return (
    <div
      className="w-screen h-80px flex justify-between p-5 bg-orange-600 
        text-gray-800"
    >
      <h1 className="text-4xl select-none">Awesome Chat</h1>
      {username != "" ? (
        <h3 onClick={() => logout()} className="text-2xl cursor-pointer group">
          Logout
          <span
            className="block max-w-0 group-hover:max-w-full transition-all
             duration-500 h-0.5 bg-gray-800"
          ></span>
        </h3>
      ) : null}
    </div>
  );
}

export default Header;
