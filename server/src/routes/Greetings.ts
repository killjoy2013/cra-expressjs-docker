import express from "express";
import { Visitor } from "../../../src/graphql/types";
const router = express.Router();

router.post("/hello", (req, res) => {
  const name = req.query.name || "World";
  res.json({
    greeting: `Hello ${name} :-) From Expressjs on ${new Date().toLocaleString()}`,
  });
});

router.post("/goodbye", (req, res) => {
  const name = req.query.name || "World3";

  const myVisitor: Visitor = {
    id: 12,
    title: "Murat",
  };

  res.json(myVisitor);
  // res.json({
  //   greeting: `Goodbye ${name} :-( From Expressjs on ${new Date().toLocaleString()}`,
  // });
});

export default router;
