// const knex = require("./knex");

exports.seed = async function (knex) {
  const cohortIds = [1, 2, 3, 4];
  let classAttendances = [];
  const sampleComments = [
    "Sed ante. Vivamus tortor. Duis mattis egestas metus.",
    "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
    "Fusce consequat. Nulla nisl. Nunc nisl.",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const createClassAttendances = async () => {
    await Promise.all(
      cohortIds.map(async (cohortId) => {
        const newClassAttendances = await knex("classes AS c")
          .join("cohorts AS co", "co.id", "c.cohort_id")
          .join("cohort_members AS cm", "cm.cohort_id", "co.id")
          .where("cm.role_id", 3)
          .andWhere("cm.cohort_id", cohortId)
          .select("c.id AS class_id", "cm.user_id");

        classAttendances = classAttendances.concat(newClassAttendances);
        console.log("in forEach loop");
        // console.log(classAttendances);
      })
    );
    console.log(classAttendances);
  };

  await createClassAttendances();
  // then(() => {
  const fullClassAttendances = classAttendances.map((classAttendance) => {
    const attended = Math.random() < 0.8;
    let late_minutes;
    let arrived_late;
    let camera_on;
    let connectivity_issues;
    let distracted;
    let comments;

    if (attended) {
      late_minutes = Math.floor(Math.random() * 10);
      arrived_late = late_minutes > 0;
      camera_on = Math.random() < 0.7;
      connectivity_issues = Math.random() < 0.1;
      distracted = Math.random() < 0.3;
    } else {
      late_minutes = 0;
      arrived_late = false;
      camera_on = false;
      connectivity_issues = false;
      distracted = false;
    }

    comments
      = sampleComments[getRandomIntInclusive(0, sampleComments.length - 1)];

    return {
      ...classAttendance,
      attended: attended,
      arrived_late: arrived_late,
      late_minutes: late_minutes,
      camera_on: camera_on,
      connectivity_issues: connectivity_issues,
      distracted: distracted,
      comments: comments,
    };
  });

  console.log(fullClassAttendances[0]);
  console.log(fullClassAttendances.length);
  // Deletes ALL existing entries
  return knex("class_attendances")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("class_attendances").insert(fullClassAttendances);
    });
};
