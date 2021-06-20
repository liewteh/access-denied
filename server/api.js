import { Router } from "express";
import { Pool } from "pg";
const knex = require("./knex");

const router = new Router();

router.get("/", (_, res) => {
  res.json({ message: "Hello, world!" });
});

router.get("/cohorts", async (req, res) => {
  const cohorts = await knex("regions")
    .join("cohorts", "regions.id", "=", "cohorts.region_id")
    .select(
      "cohorts.id",
      "regions.name as region_name",
      "cohorts.cohort_number"
    );

  res.send(cohorts);
});

router.get("/cohorts/:cohortId/classes", async (req, res) => {
  const cohortId = req.params.cohortId;
  const classes = await knex("classes")
    .where("cohort_id", cohortId)
    .select("*");
  res.send(classes);
});

export default router;
