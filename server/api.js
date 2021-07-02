import { Router } from "express";

const knex = require("./knex");
const router = new Router();

router.get("/", (_, res) => {
  res.json({ message: "Hello, world!" });
});

router.get("/test", (_, res) => {
  res.json({ message: "Testing!" });
});

const loginUser = async (username, password) => {
  const users = await knex("users")
    .whereRaw("LOWER(user_name) = ?", username)
    .andWhere("password", password)
    .select("id", "user_name");

  // get the username and id.
  return users[0];
};

/* All Users Login API */
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await loginUser(username, password);

  if (!user) {
    return res.status(401).send("Incorrect username and/or password!");
  }

  req.session.username = user.user_name;
  // req.session.role = user.role;
  req.session.userId = user.id;
  res.sendStatus(204);
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.sendStatus(204);
});

router.get("/checkLogin", (req, res) => {
  const userId = req.session.userId;
  res.json({ userId: userId });
});

// update this to get the user_id from session
router.get("/cohorts/", async (req, res) => {
  const user_id = req.session.userId;
  if (user_id) {
    const cohorts = await knex("regions")
      .join("cohorts", "regions.id", "=", "cohorts.region_id")
      .join("cohort_members", "cohort_members.cohort_id", "=", "cohorts.id")
      .where("cohort_members.user_id", user_id)
      .select(
        "cohorts.id",
        "regions.name as region_name",
        "cohorts.cohort_number"
      );
    res.json(cohorts);
  }
});

router.get("/cohorts/:cohortId/classes", async (req, res) => {
  const cohortId = req.params.cohortId;
  const classes = await knex("classes")
    .where("cohort_id", cohortId)
    .select("*");
  res.send(classes);
});

// api to fetch student names for a given cohort
router.get("/cohorts/:cohortId/students", async (req, res) => {
  const cohortId = req.params.cohortId;

  const students = await knex("cohort_members")
    .join("users", "users.id", "=", "cohort_members.user_id")
    .where("cohort_members.cohort_id", cohortId)
    .andWhere("cohort_members.role_id", 3)
    .select("users.user_name");

  res.send(students);
});

// get student attendance data
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
      .where("cm.role_id", 3)
      .andWhere("c.id", cohortId)
      .andWhere("ca.class_id", classId);
    res.send(students);
  }
);

// get student's name, region and class data for submit form
router.get("/submit/:cohortId/submit-attendance", async (req, res) => {
  const cohortId = req.params.cohortId;

  const students = await knex("cohort_members as cm")
    .select("*")
    .join("users as u", "u.id", "cm.user_id")
    .join("cohorts as c", "cm.cohort_id", "c.id")
    .join("regions as r", "r.id", "c.region_id")
    .where("cm.cohort_id", cohortId)
    .andWhere("u.user_name", "like", "Student%");

  res.send(students);
});

// // post to submit form
// router.post("/login", async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;
//   const user = await loginUser(username, password);

//   if (!user) {
//     return res.status(401).send("Incorrect username and/or password!");
//   }

//   req.session.username = user.user_name;
//   // req.session.role = user.role;
//   req.session.userId = user.id;
//   res.sendStatus(204);
// });

router.get("/cohort-details/:cohortId", async (req, res) => {
  const cohortId = req.params.cohortId;

  const details = await knex("cohorts")
    .join("regions", "regions.id", "cohorts.region_id")
    .where("cohorts.id", "=", cohortId)
    .select("cohorts.cohort_number", "regions.name as region_name");

  res.send(details);
});
export default router;
