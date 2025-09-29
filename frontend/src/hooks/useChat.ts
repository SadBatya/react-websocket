import { useState, useEffect, useRef } from "react";

interface Params {
  url: string;
  name: string;
}

export const useChat = ({ url, name }: Params) => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState<
    {
      from: string;
      text: string;
      at: number;
    }[]
  >([]);

  const wsRef = useRef<null | WebSocket>(null); // хранит текущее состояние ws

  useEffect(() => {
    if (!name) return;

    const ws = new WebSocket(url);

    wsRef.current = ws;

    ws.addEventListener("open", () => {
      setConnected(true);

      ws.send(JSON.stringify({ type: "join", name }));
    });

    ws.addEventListener("message", (e) => {
      try {
        const data = JSON.parse(e.data);

        setMessages((prev) => [...prev, data]);
      } catch (error) {
        console.error(error);
      }
    });

    ws.addEventListener("close", () => {
      setConnected(false);
    });

    return () => ws.close();
  }, [url, name]);

  const send = (text: string) => {
    if (!wsRef.current) return;
    if (wsRef?.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "message", text }));
    }
  };

  return { connected, messages, send };
};
