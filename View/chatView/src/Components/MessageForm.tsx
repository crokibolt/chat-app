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
    <form onSubmit={messagePost}>
      <div>
        <input
          type="text"
          value={messageValue}
          onChange={handleMessageChange}
          name="message"
          id="message"
        />
      </div>
      <button>Send</button>
    </form>
  );
};

export default MessageForm;
