import { Router } from "express";
import { Pool } from "pg";
const knex = require("./knex");

const router = new Router();

router.get("/", (_, res) => {
  res.json({ message: "Hello, world!" });
});

router.get("/cohorts", async (req, res) => {
  const result = await knex("regions")
    .join("cohorts", "regions.id", "=", "cohorts.region_id")
    .select("regions.name as region_name", "cohorts.cohort_number");

  res.send(result);
});

export default router;
