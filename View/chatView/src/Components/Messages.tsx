import React, {
  LegacyRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as signalR from "@microsoft/signalr";
import { usernameContext } from "../Context/UsernameContext";
import { useFetcher } from "react-router-dom";
import Message from "./Message";

interface Message {
  type: string;
  username: string;
  text: string;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection>();

  const username = useContext(usernameContext);
  const last = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    last.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-[90%] w-full bg-amber-300 rounded-lg p-3 overflow-auto">
      {messages.map((message, index) => (
        <div key={`message-${index}`}>
          {message.type == "New Message" ? (
            <Message message={message} current={username} />
          ) : (
            <p className="text-center p-1 text-gray-700">{message.username}</p>
          )}
        </div>
      ))}
      <div ref={last}></div>
    </div>
  );
};

export default Messages;
