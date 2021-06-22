import { Router } from "express";

const knex = require("./knex");
const router = new Router();

router.get("/", (_, res) => {
  res.json({ message: "Hello, world!" });
});

router.get("/students", async (req, res) => {
  const students = await knex("users")
    .select("user_name")
    .where("user_name", "like", "Student%")
    .limit(10);

  res.send(students);
});

export default router;
