import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

interface Message {
  type: string;
  username: string;
  text: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection>();

  useEffect(() => {
    const hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7178/chathub")
      .withAutomaticReconnect()
      .build();

    setConnection(hubConnection);

    connection?.start();
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start();
    }
    connection?.on("ReceiveMessage", (type, username, text) => {
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages.push({ type, username, text });
        return newMessages;
      });
    });
  }, [connection]);

  return (
    <>
      {messages.map((message, index) => (
        <div key={`message-${index}`}>
          {message.type == "New message" ? <p>{message.username}</p> : null}

          <p>{message.text}</p>
        </div>
      ))}
    </>
  );
};

export default Messages;
