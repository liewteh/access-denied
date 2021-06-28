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
  console.log("trying to login user");
  console.log(username);
  console.log(password);
  const users = await knex("users")
    .whereRaw("LOWER(user_name) = ?", username)
    .andWhere("password", password)
    .select( "id", "user_name");

  // get the username and id.
  console.log(users);
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
  console.log(req.session);
  res.sendStatus(204);
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  res.sendStatus(204);
});

router.get("/checkLogin", (req, res) => {
  console.log("in checkLogin");
  const userId = req.session.userId;
  console.log(userId);
  res.json({ "userId" : userId });
});

// update this to get the user_id from session
router.get("/cohorts/", async (req, res) => {
  console.log("user-cohorts");
  const user_id = req.session.userId;
  console.log(user_id);
  if(user_id) {
    console.log("user id exists");
    const cohorts = await knex("regions")
      .join("cohorts", "regions.id", "=", "cohorts.region_id")
      .join("cohort_members", "cohort_members.cohort_id", "=", "cohorts.id")
      .where("cohort_members.user_id", user_id)
      .select(
        "cohorts.id",
        "regions.name as region_name",
        "cohorts.cohort_number"
      );
    console.log("sending cohorts to frontend");
    console.log(cohorts);
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
  console.log("in students api");

  const cohortId = req.params.cohortId;

  const students = await knex("cohort_members")
    .join("users", "users.id", "=", "cohort_members.user_id")
    .where("cohort_members.cohort_id", cohortId)
    .andWhere("cohort_members.role_id", 3)
    .select("users.user_name");

  console.log(students);
  res.send(students);
});

router.get("/students", async (req, res) => {
  const students = await knex("users")
    .select("user_name")
    .where("user_name", "like", "Student%")
    .limit(10);

  res.send(students);
});

export default router;
