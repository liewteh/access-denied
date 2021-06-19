exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("regions").del()
    .then(function () {
      // Inserts seed entries
      return knex("regions").insert([
        {
          id: 1,
          name: "West Midlands",
          country: "United Kingdom",
          city: "Birmingham",
        },
        {
          id: 2,
          name: "London",
          country: "United Kingdom",
          city: "London",
        },
        {
          id: 3,
          name: "North West",
          country: "United Kingdom",
          city: "Manchester",
        },
        {
          id: 4,
          name: "Scotland",
          country: "United Kingdom",
          city: "Glasgow",
        },
        {
          id: 5,
          name: "Rome",
          country: "Italy",
          city: "Rome",
        },
        {
          id: 6,
          name: "Cape Town",
          country: "South Africa",
          city: "Cape Town",
        },
      ]);
    });
};
