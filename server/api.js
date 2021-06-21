import { Router } from "express";
import { knex } from "./knex";

const router = new Router();

router.get("/", (_, res) => {
  res.json({ message: "Hello, world!" });
  console.log(knex);
});

router.get("/students", async (req, res) => {
  const students = knex.select("user_name")
    .from("users")
    .where("user_name")
    .like("Stude%")
    .limit(5);

    console.log(students);
  res.send(students);
});

export default router;
