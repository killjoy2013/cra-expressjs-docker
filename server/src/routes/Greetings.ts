import express from "express";
import { DemoVisitor } from "../../../src/graphql/types";

const router = express.Router();

router.post("/hello", (req, res) => {
  const name = (req.body.name || "World") as string;
  const id = Number(req.body.id || 0);

  const myVisitor: DemoVisitor = {
    id,
    name,
    message: `Hello ${name} :-( From Expressjs on ${new Date().toLocaleString()}`,
  };

  res.json(myVisitor);
});

router.post("/goodbye", (req, res) => {
  const name = (req.body.name || "World") as string;
  const id = Number(req.body.id || 0);

  const myVisitor: DemoVisitor = {
    id,
    name,
    message: `Goodbye ${name} :-( From Expressjs on ${new Date().toLocaleString()}`,
  };

  res.json(myVisitor);
});

export default router;
