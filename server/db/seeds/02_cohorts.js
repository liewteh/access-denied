
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex("cohorts").insert([
        { id: 1, region_id: 1, cohort_number: 2, started_at: "2020-07-01" },
        { id: 2, region_id: 2, cohort_number: 8, started_at: "2020-09-01" },
        { id: 3, region_id: 6, cohort_number: 1, started_at: "2020-10-01" },
        { id: 4, region_id: 4, cohort_number: 3, started_at: "2020-11-01" },
      ]);
    });
};
