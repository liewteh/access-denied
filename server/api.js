import { Router } from "express";

const knex = require("./knex");
const router = new Router();

// root api
router.get("/", (_, res) => {
  res.json({ message: "Hello, world!" });
});

/*****************************************************************************/
/* Login & Logout related APIs */
/*****************************************************************************/
/*
 function to get the matched username and id
 for the given username and password
*/
const loginUser = async (username, password) => {
  const users = await knex("users")
    .whereRaw("LOWER(user_name) = ?", username)
    .andWhere("password", password)
    .select("id", "user_name");

  // get the username and id.
  return users[0];
};

// api to login the user and set up user session
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await loginUser(username, password);

  if (!user) {
    return res.status(401).send("Incorrect username and/or password!");
  }

  req.session.username = user.user_name;
  req.session.userId = user.id;
  res.sendStatus(204);
});

// api to logout the logged in user and end current express session
router.post("/logout", (req, res) => {
  req.session = null;
  res.sendStatus(204);
});

// api to return the userId of the logged in user
router.get("/checkLogin", (req, res) => {
  const userId = req.session.userId;
  res.json({ userId: userId });
});

// api to return the username of the logged in user
router.get("/username", (req, res) => {
  const username = req.session.username;
  res.send(username);
});

router.get("/username/role", async (req,res) => {
  const userId = req.session.userId;
  const role = await knex("cohort_members")
    .where("user_id", userId)
    .distinct("role_id");
  res.send(role[0]);
});

/*****************************************************************************/
/* GET APIs */
/*****************************************************************************/

// api to get the list of all the cohorts for the logged in user
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
      )
      .orderBy("cohorts.id", "asc");
    res.json(cohorts);
  }
});

// api to get the list of all the cohorts
router.get("/cohorts/all", async (req, res) => {
  const cohorts = await knex("regions")
    .join("cohorts", "regions.id", "=", "cohorts.region_id")
    .select(
      "cohorts.id",
      "regions.name as region_name",
      "cohorts.cohort_number"
    )
    .orderBy("cohorts.id", "asc");
  res.json(cohorts);
});

// api to get cohort_number and region_name for a given cohortId
router.get("/cohorts/:cohortId", async (req, res) => {
  const cohortId = req.params.cohortId;

  const details = await knex("cohorts")
    .join("regions", "regions.id", "cohorts.region_id")
    .where("cohorts.id", "=", cohortId)
    .select("cohorts.cohort_number", "regions.name as region_name");

  res.send(details);
});

// api to fetch all the classes for a given cohortId
router.get("/cohorts/:cohortId/classes", async (req, res) => {
  const cohortId = req.params.cohortId;
  const classes = await knex("classes")
    .where("cohort_id", cohortId)
    .select("*")
    .orderBy("date", "desc");
  res.send(classes);
});

// api to fetch all the students names for a given cohortId
router.get("/cohorts/:cohortId/students", async (req, res) => {
  const cohortId = req.params.cohortId;

  const students = await knex("cohort_members")
    .join("users", "users.id", "=", "cohort_members.user_id")
    .where("cohort_members.cohort_id", cohortId)
    .andWhere("cohort_members.role_id", 3)
    .select("users.user_name")
    .orderBy("users.user_name", "asc");

  res.send(students);
});

// get student attendance data for a given classId
router.get(
  "/cohorts/:cohortId/classes/:classId/students-attendance",
  async (req, res) => {
    // console.log("in the api");
    // const cohortId = req.params.cohortId;
    const classId = req.params.classId;

    const students = await knex("classes as c")
      .select(
        "u.user_name",
        "ca.attended",
        "ca.late_minutes",
        "ca.distracted",
        "ca.camera_on",
        "ca.connectivity_issues",
        "ca.comments",
        "c.date"
      )
      .join("class_attendances as ca", "c.id", "ca.class_id")
      .join("users as u", "u.id", "ca.user_id")
      .join("cohort_members as cm", "u.id", "cm.user_id")
      .where("cm.role_id", 3)
      .andWhere("c.id", classId)
      .orderBy("u.user_name", "asc");
    // console.log(students);
    res.send(students);
  }
);

// api to get the date and online_class for a given classId
router.get("/cohorts/classes/:classId", async (req, res) => {
  const classId = req.params.classId;
  const classDetails = await knex("classes")
    .select("date", "online_class")
    .where("id", classId);
  console.log("classDetails");
  console.log(classDetails);
  res.json(classDetails);
});

// api to get list of all the roles
router.get("/roles", async (req, res) => {
  const roles = await knex("roles").select("*").orderBy("id");
  res.json(roles);
});

// api to get list of all the users
router.get("/users/", async (req, res) => {
  const users = await knex("users")
    .select("id", "user_name", "email")
    .orderBy("user_name", "asc");

  const fetchCohortsList = async () => {
    await Promise.all(
      users.map(async (user) => {
        console.log("in map");
        const cohortsList = await knex("regions")
          .join("cohorts", "regions.id", "=", "cohorts.region_id")
          .join("cohort_members", "cohort_members.cohort_id", "=", "cohorts.id")
          .where("cohort_members.user_id", user.id)
          .select(
            "cohorts.id",
            "regions.name as region_name",
            "cohorts.cohort_number"
          );

        console.log("cohortsList");
        console.log(cohortsList);
        user.cohortsList = cohortsList;
      })
    );
    console.log("in fetchCohortsList");
    console.log("users");
    console.log(users);
  };

  await fetchCohortsList();

  console.log("after map");
  console.log(users);
  res.json(users);
});

// Cohorts report
router.get("/cohorts/:cohortId/cohortsReport", async (req, res) => {
  const cohortId = req.params.cohortId;
  const cohortsReport = await knex("classes as c")
    .join("class_attendances as ca", "c.id", "ca.class_id")
    .where("cohort_id", cohortId)
    .andWhere("ca.attended", true)
    .groupBy("ca.class_id", "c.date")
    .select("c.date as Date")
    .count("ca.user_id as Students");
  console.log(cohortsReport);
  res.send(cohortsReport);
});

/*****************************************************************************/
/* POST APIs */
/*****************************************************************************/

/*
 api to create a class for given cohortId, date and online_class values,
 and it returns the object { id: class_id }
*/
router.post("/cohorts/:cohortId/classes", async (req, res) => {
  console.log("create class api");
  const cohortId = req.params.cohortId;
  const date = req.body.date; // date should be in format "yyyy-mm-dd"
  const onlineClass = req.body.onlineClass; // can take values as true / false

  const classId = await knex
    .insert({ cohort_id: cohortId, date: date, online_class: onlineClass }, [
      "id",
    ])
    .into("classes");
  console.log(classId);
  res.json(classId[0]);
});

/*
 api to create class attendances for all the students for a given
 classId and cohortId. It returns status 200 if successful.
*/
router.post("/cohorts/:cohortId/classes/:classId/", async (req, res) => {
  console.log("post request");
  // const cohortId = req.params.cohortId;
  const classId = req.params.classId;
  const classAttendances = req.body.classAttendances;
  const studentNames = classAttendances.map(
    (classAttendance) => classAttendance.user_name
  );

  console.log("studentNames");
  console.log(studentNames);
  const userIds = await knex("users")
    .whereIn("user_name", studentNames)
    .select("id", "user_name");

  userIds.sort((a, b) => {
    if (a.user_name < b.user_name) {
      return -1;
    }
    if (a.user_name > b.user_name) {
      return 1;
    }
    return 0;
  });

  classAttendances.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  console.log("userIds");
  console.log(userIds);
  console.log("classAttendances");
  console.log(classAttendances);

  const attendanceData = classAttendances.map((classAttendance, index) => {
    return {
      class_id: classId,
      user_id: userIds[index].id,
      attended: classAttendance.attended,
      arrived_late: classAttendance.arrived_late,
      late_minutes: classAttendance.late_minutes,
      camera_on: classAttendance.camera_on,
      connectivity_issues: classAttendance.connectivity_issues,
      distracted: classAttendance.distracted,
      comments: classAttendance.comments,
    };
  });
  console.log("attendanceData");
  console.log(attendanceData);
  await knex("class_attendances").insert(attendanceData);
  res.sendStatus(200);
});

// api to create a new user in users and cohort_members table
router.post("/create-user", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const accountVerified = req.body.accountVerified;
  const roleId = req.body.roleId;
  const cohortIds = req.body.cohortIds; // it will be an array of cohort Ids

  console.log("req.body");
  console.log(req.body);

  const userData = {
    user_name: username,
    email: email,
    password: password,
    account_verified: accountVerified,
  };

  console.log("userData");
  console.log(userData);

  const userId = await knex("users").insert(userData, ["id"]);
  console.log("userId");
  console.log(userId);

  const cohortMemberData = cohortIds.map((cohortId) => {
    return {
      user_id: userId[0].id,
      role_id: roleId,
      cohort_id: cohortId,
    };
  });

  console.log("cohortMemberData");
  console.log(cohortMemberData);

  await knex("cohort_members").insert(cohortMemberData);
  res.send(200);
});

//testing
router.post("/api/1/class_attendance", (req, res) => {
  const data = req.body;
  console.log(data);
  res.sendStatus(200);
});

export default router;
