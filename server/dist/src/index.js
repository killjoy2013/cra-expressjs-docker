"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var Greetings_1 = __importDefault(require("./routes/Greetings"));
var app = express_1.default();
var staticPath = path_1.default.resolve(__dirname, "../static");
var buildPath = path_1.default.resolve(__dirname, "..");
var indexPath = path_1.default.resolve(__dirname, "../index.html");
app.use("/", express_1.default.static(buildPath));
app.use("/static", express_1.default.static(staticPath));
app.get("/*", function (req, res) {
    res.sendFile(indexPath);
});
app.use("/api/greetings", Greetings_1.default);
app.listen(3001, function () {
    return console.log("Express server is running on localhost:3001");
});
