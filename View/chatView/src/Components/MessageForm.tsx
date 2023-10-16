import React, { ChangeEvent, FormEvent, useState } from "react";

const MessageForm = () => {
  const [messageValue, setMessageValue] = useState("");
  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value);
  };

  const messagePost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch("https://localhost:7178/api/Messages", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: messageValue,
      }),
    }).then(() => setMessageValue(""));
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
