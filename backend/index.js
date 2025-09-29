const express = require("express");
const { WebSocketServer } = require("ws");
const http = require("http");

const app = express();

app.get("/health", (req, res) => {
  res.send("ok");
});

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const port = 3001;

wss.on("connection", (ws) => {
  let name = "Anonymous";

  ws.on("message", (raw) => {
    let data;

    try {
      data = JSON.parse(raw);
    } catch (error) {
      return;
    }

    if (data.type === "join") {
      name = String(data.name || "Anonymous");

      return;
    }

    if (data.type === "message") {
      const payload = JSON.stringify({
        type: "message",
        from: name,
        text: String(data.text || ""),
        at: Date.now(),
      });

      wss.clients.forEach((client) => {
        return client.readyState === 1 && client.send(payload);
      });
    }
  });
});

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
