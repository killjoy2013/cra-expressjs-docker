"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
router.post("/hello", function (req, res) {
    var name = req.query.name || "World";
    res.json({
        greeting: "Hello " + name + " :-) From Expressjs on " + new Date().toLocaleString(),
    });
});
router.post("/goodbye", function (req, res) {
    var name = req.query.name || "World";
    res.json({
        greeting: "Goodbye " + name + " :-( From Expressjs on " + new Date().toLocaleString(),
    });
});
exports.default = router;
