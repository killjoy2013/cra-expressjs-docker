import express from "express";
import path from "path";

const app = express();
const staticPath = path.resolve(__dirname, "../build/static");
const buildPath = path.resolve(__dirname, "../build");
const indexPath = path.resolve(__dirname, "../build/index.html");

app.use("/", express.static(buildPath));
app.use("/static", express.static(staticPath));

app.all("/", (req, res) => {
  res.sendFile(indexPath);
});

app.get("/api/hello", (req, res) => {
  const name = req.query.name || "World";
  res.json({ greeting: `Hello ${name}!` });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
