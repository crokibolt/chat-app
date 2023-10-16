interface MessageProps {
  message: { type: string; username: string; text: string };
  current: string;
}
const Message = ({ message, current }: MessageProps) => {
  const style =
    current == message.username
      ? "ml-auto w-fit p-3 bg-blue-400 rounded-xl my-3"
      : "mr-auto w-fit p-3 bg-green-400 rounded-xl my-3";
  return (
    <div className={style}>
      <span className="text-slate-500 w-content inline">
        {message.username}
      </span>
      <br />
      <span className="text-black w-content inline">{message.text}</span>
    </div>
  );
};

export default Message;
