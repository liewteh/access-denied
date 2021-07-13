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

    comments = sampleComments[getRandomIntInclusive(0, sampleComments.length)];

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
  // });

  // let cohort1Students = [
  //   1, 2, 4, 5, 9, 25, 25, 33, 34, 40, 50, 52, 54, 56, 58, 62, 66, 68, 71, 80,
  //   84, 91, 93,
  // ];
  // let cohort1Classes = [4, 5, 8, 25, 29, 30, 32, 33, 37, 39, 40, 45];

  // let cohort1ClassAttendances = cohort1Classes.map((classId) => {
  //   let classAttendance = [];
  //   cohort1Students.forEach((student) => {
  //     const attended = Math.random() < 0.8;
  //     let late_minutes;
  //     let arrived_late;
  //     let camera_on;
  //     let connectivity_issues;
  //     let distracted;

  //     if (attended) {
  //       late_minutes = Math.floor(Math.random() * 10);
  //       arrived_late = late_minutes > 0;
  //       camera_on = Math.random() < 0.7;
  //       connectivity_issues = Math.random() < 0.1;
  //       distracted = Math.random() < 0.3;
  //     } else {
  //       late_minutes = 0;
  //       arrived_late = false;
  //       camera_on = false;
  //       connectivity_issues = false;
  //       distracted = false;
  //     }

  //     classAttendance.push({
  //       class_id: classId,
  //       user_id: student,
  //       attended: attended,
  //       arrived_late: arrived_late,
  //       late_minutes: late_minutes,
  //       camera_on: camera_on,
  //       connectivity_issues: connectivity_issues,
  //       distracted: distracted,
  //     });
  //   });
  //   return classAttendance;
  // });

  // console.log(cohort1ClassAttendances[0]);

  // let cohort2Students = [
  //   1, 2, 12, 12, 14, 14, 20, 20, 21, 23, 23, 30, 38, 39, 39, 41, 41, 42, 42,
  //   43, 55, 65, 73, 74, 76, 80, 80, 85, 87, 92, 100,
  // ];
  // let cohort2Classes = [1, 2, 11, 13, 14, 15, 19, 20, 34, 41, 42, 49];

  // let cohort3Students = [
  //   1, 3, 14, 15, 24, 42, 43, 47, 51, 64, 65, 65, 66, 77, 84, 86, 88, 90, 93,
  //   93, 93, 95, 96, 100,
  // ];
  // let cohort3Classes = [
  //   3, 6, 7, 10, 16, 17, 21, 22, 24, 26, 31, 43, 47, 48, 50,
  // ];

  // let cohort4Students = [
  //   1, 3, 21, 24, 28, 34, 36, 36, 38, 48, 53, 62, 62, 75, 77, 78, 79, 83, 91,
  //   92, 95, 100,
  // ];
  // let cohort4Classes = [
  //   3, 6, 7, 10, 16, 17, 21, 22, 24, 26, 31, 43, 47, 48, 50,
  // ];

  // Deletes ALL existing entries
  return knex("class_attendances")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("class_attendances").insert(fullClassAttendances);
    });
};
