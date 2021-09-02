import express from "express";
import path from "path";
import greetings from "./routes/Greetings";

const app = express();
app.use(express.json());

const staticPath = path.resolve(__dirname, "../static");
const buildPath = path.resolve(__dirname, "..");
const indexPath = path.resolve(__dirname, "../index.html");

app.use("/", express.static(buildPath));
app.use("/static", express.static(staticPath));

app.get("/*", (req, res) => {
  res.sendFile(indexPath);
});

app.use("/api/greetings", greetings);

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
