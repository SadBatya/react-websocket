import { useState } from "react";
import { useChat } from "./hooks/useChat";

import "./App.css";
import { MessageList, MessageInput } from "./components";

const WS_URL = "ws://localhost:3001";

function App() {
  const [name, setName] = useState("");
  const [tmp, setTmp] = useState("");

  const { connected, messages, send } = useChat({ url: WS_URL, name });

  if (!name) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h2>Вход в чат</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setName(tmp);
          }}
        >
          <input
            type="text"
            value={tmp}
            onChange={(e) => setTmp(e.target.value)}
          />
          <button type="submit">Войти</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Чат</h2>
      <div>
        Вы {name}
        {connected ? (
          <span style={{ color: "green" }}>online</span>
        ) : (
          <span style={{ color: "red" }}>offline</span>
        )}
      </div>
      <MessageList items={messages} />
      <div>
        <MessageInput onSend={send} disabled={!connected} />
      </div>
    </div>
  );
}

export default App;
