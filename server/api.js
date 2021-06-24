import { response, Router } from "express";
import { Pool } from "pg";

const knex = require("./knex");
const router = new Router();

/****************************************************** */
const basicAuth = require("express-basic-auth");

const auth = basicAuth({
  users: {
    admin: "admin",
    user: "user",
    "teacher 1": "teacher1",
    "teacher 2": "teacher2",
  },
});

// End-point on Server

// const loginUser = (req, res, next) => {
//   if (req.auth.user === "admin") {
//     res.send("admin");
//   } else if (req.auth.user === "user") {
//     res.send("user");
//   }

// };

const loginUser = async (username, password) => {
  console.log("trying to login user");
  console.log(username);
  console.log(password);
  const user_ids = await knex("users")
    .whereRaw("LOWER(user_name) = ?", username)
    .andWhere("password", password)
    .select("id");

  console.log(user_ids);
  return user_ids[0].id;
};

router.get("/authenticate", auth, async (req, res) => {
  console.log("in authenticate");
  console.log(req.auth);
  const user=req.auth.user;
  const password = req.auth.password;
  const user_id = await loginUser(user, password);
  console.log("user id " + user_id);
  if (Number.isInteger(user_id) && user_id > 0) {
    res.send({ user_id: user_id });
  } else {
    console.log("user not found");
    response.sendStatus(401);
  }
});

/****************************************************** */


router.get("/", (_, res) => {
  res.json({ message: "Hello, world!" });
});

router.get("/test", (_, res) => {
  res.json({ message: "Testing!" });
});

function fakeLogin(username, password) {
  const logins = [
    {
      username: "admin",
      password: "admin",
      role: "superadmin",
      id: 1,
    },
  ];
  const userFound = logins.find(
    (x) => x.username === username && x.password === password
  );
  console.log(username, password);

  return userFound;
}

/* All Users Login API */
router.post("/login", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  const user = fakeLogin(username, password);

  if (!user) {
    return res.status(401).send("username and password required");
  }
  req.session.username = user.username;
  req.session.role = user.role;
  req.session.userId = user.id;
  res.send("hello");


// 	pool
// 	  .query( userQuery, [username, password]
// 	  )
// 	  .then((result) => {
// 		if (result.rows.length > 0) {
// 		  return res.json(result.rows[0]);
// 		} else {
// 		  return res.status(404).send("user not available");
// 		}
// 	  });
//   });
});

router.get("/blah", (req, res) => {

  req.session.count +=1;
  res.json( {
    username: req.session.username,
    count: req.session.count,
  });

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

router.get("/user-cohorts/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const cohorts = await knex("regions")
    .join("cohorts", "regions.id", "=", "cohorts.region_id")
    .join("cohort_members", "cohort_members.cohort_id", "=", "cohorts.id")
    .where("cohort_members.user_id", user_id)
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
