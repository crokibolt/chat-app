import React, { ChangeEvent, FormEvent, useState } from "react";
import { postMessageReq } from "../Helpers/fetchHelper";

const MessageForm = () => {
  const [messageValue, setMessageValue] = useState("");
  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value);
  };

  const messagePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postMessageReq({ text: messageValue }, setMessageValue);
  };

  return (
    <form onSubmit={messagePost} className="flex h-[10%]">
      <input
        type="text"
        value={messageValue}
        onChange={handleMessageChange}
        name="message"
        id="message"
        className="flex-1 h-full rounded-lg p-3"
      />
      <button className="p-3">Send</button>
    </form>
  );
};

export default MessageForm;
