
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classes').del()
    .then(function () {
      // Inserts seed entries
      return knex("classes").insert([
        {
          id: 1,
          cohort_id: 1,
          date: "2020-07-04",
          online_class: true,
        },
        {
          id: 2,
          cohort_id: 1,
          date: "2020-07-11",
          online_class: true,
        },
        {
          id: 3,
          cohort_id: 1,
          date: "2020-07-18",
          online_class: true,
        },
        {
          id: 4,
          cohort_id: 1,
          date: "2020-07-25",
          online_class: true,
        },
        {
          id: 5,
          cohort_id: 2,
          date: "2020-09-05",
          online_class: true,
        },
        {
          id: 6,
          cohort_id: 2,
          date: "2020-09-12",
          online_class: true,
        },
        {
          id: 7,
          cohort_id: 3,
          date: "2020-10-03",
          online_class: true,
        },
        {
          id: 8,
          cohort_id: 3,
          date: "2020-10-10",
          online_class: true,
        },
      ]);
    });
};
