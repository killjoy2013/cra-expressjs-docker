import express from "express";
import path from "path";
import dotenv from "dotenv";
import https from "https";
import cors from "cors";
import fs from "fs";
import helmet from "helmet";
import { Server, Socket } from "socket.io";
import contentSecurityPolicy from "helmet-csp";
import greetings from "./routes/Greetings";

dotenv.config();

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.DEBUG", process.env.DEBUG);
console.log("process.env.SOCKET_PING_TIMEOUT", process.env.SOCKET_PING_TIMEOUT);
console.log(
  "process.env.SOCKET_PING_INTERVAL",
  process.env.SOCKET_PING_INTERVAL
);

const PORT = process.env.PORT || 3009;

const certsPath = path.resolve(__dirname, "../certs");
const options = {
  key: fs.readFileSync(path.resolve(certsPath, "cert.key")),
  cert: fs.readFileSync(path.resolve(certsPath, "cert.crt")),
  requestCert: true,
  rejectUnauthorized: false,
};

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  contentSecurityPolicy({
    useDefaults: true,
    directives: {
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      defaultSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "'unsafe-hashes'",
      ],
    },
    reportOnly: false,
  })
);

const staticPath = path.resolve(__dirname, "../static");
const buildPath = path.resolve(__dirname, "..");
const indexPath = path.resolve(__dirname, "../index.html");

app.use("/", express.static(buildPath));
app.use("/static", express.static(staticPath));

app.get("/*", (req, res) => {
  res.sendFile(indexPath);
});

app.use("/api/greetings", greetings);

let server;
if (process.env.NODE_ENV == "development") {
  server = app.listen(PORT, () =>
    console.log(`Express server is running on localhost:${PORT}`)
  );
} else {
  server = https
    .createServer(options, app)
    .listen(PORT, () =>
      console.log(`Express server is running on localhost:${PORT} with SSL`)
    );
}

const io = new Server(server, {
  pingTimeout: Number(process.env.SOCKET_PING_TIMEOUT),
  pingInterval: Number(process.env.SOCKET_PING_INTERVAL),
  transports:
    process.env.NODE_ENV == "development" ? ["polling"] : ["websocket"],
  cors: {
    origin: process.env.CLIENT_ROOT,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", async (socket: Socket) => {
  socket.on("ping", (cb) => {
    if (typeof cb === "function") cb();
  });

  socket.on("ping_from_client", async () => {
    socket.emit("pong_from_server");
  });

  socket.on("disconnect", async (reason) => {
    let eventDate = new Date();
    console.log(
      `SOCKET DISCONNECT..., socket.id:${socket.id} transport:${
        socket.conn.transport.name
      } reason:${reason} on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
    );
  });

  socket.on("reconnect", async () => {
    let eventDate = new Date();
    console.log(
      `SOCKET RECONNECT..., socket.id:${socket.id} transport:${
        socket.conn.transport.name
      }  on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
    );
  });

  let eventDate = new Date();
  console.log(
    `CONNECTION..., socket.id:${socket.id} transport:${
      socket.conn.transport.name
    }  on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
  );
});

io.on("connect", async (socket: Socket) => {
  let eventDate = new Date();
  console.log(
    `CONNECT..., socket.id:${socket.id} transport:${
      socket.conn.transport.name
    }  on ${eventDate.toLocaleDateString()} ${eventDate.toLocaleTimeString()}`
  );
});
