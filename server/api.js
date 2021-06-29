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

router.get(
  "/cohorts/:cohortId/classes/:classId/students-attendance",
  async (req, res) => {
    const cohortId = req.params.cohortId;
    const classId = req.params.classId;

    // get student list of a region's name, and its class's number
    const students = await knex("cohorts as c")
      .select("*")
      .join("regions as r", "r.id", "c.region_id")
      .join("cohort_members as cm", "c.id", "cm.cohort_id")
      .join("users as u", "u.id", "cm.user_id")
      .join("class_attendances as ca", "ca.user_id", "u.id")
      .where("u.user_name", "like", "Student%")
      .andWhere("c.id", cohortId)
      .andWhere("ca.class_id", classId);
    res.send(students);
  }
);

export default router;
