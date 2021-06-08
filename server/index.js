"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const staticPath = path_1.default.resolve(__dirname, "../build/static");
const buildPath = path_1.default.resolve(__dirname, "../build");
const indexPath = path_1.default.resolve(__dirname, "../build/index.html");
app.use("/", express_1.default.static(buildPath));
app.use("/static", express_1.default.static(staticPath));
app.all("/", (req, res) => {
    res.sendFile(indexPath);
});
app.post("/api/greeting", (req, res) => {
    const name = req.query.name || "World";
    res.json({
        greeting: `Hello ${name}! From Expressjs on ${new Date().toLocaleString()}`,
    });
});
app.listen(3001, () => console.log("Express server is running on localhost:3001"));
