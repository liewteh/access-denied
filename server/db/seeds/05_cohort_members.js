exports.seed = function (knex) {
  const cohortMembers = [
    { id: 1, user_id: 1, role_id: 1, cohort_id: 1 },
    { id: 2, user_id: 1, role_id: 1, cohort_id: 2 },
    { id: 3, user_id: 1, role_id: 1, cohort_id: 3 },
    { id: 4, user_id: 1, role_id: 1, cohort_id: 4 },
    { id: 5, user_id: 2, role_id: 2, cohort_id: 1 },
    { id: 6, user_id: 2, role_id: 2, cohort_id: 2 },
    { id: 7, user_id: 3, role_id: 2, cohort_id: 3 },
    { id: 8, user_id: 3, role_id: 2, cohort_id: 4 },
  ];

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  for (let i = 4; i <= 60; i++) {
    const newCohortMember = {
      id: i + 5,
      user_id: i,
      role_id: 3,
      cohort_id: getRandomIntInclusive(1, 4),
    };
    cohortMembers.push(newCohortMember);
  }

  console.log(cohortMembers);
  // Deletes ALL existing entries
  return knex("cohort_members")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("cohort_members").insert(cohortMembers);
    });
};
