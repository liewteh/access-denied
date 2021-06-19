
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("class_attendances").del()
    .then(function () {
      // Inserts seed entries
      return knex("class_attendances").insert([
        {
          id: 1,
          class_id: 1,
          user_id: 4,
          attended: true,
        },
        {
          id: 2,
          class_id: 1,
          user_id: 5,
          attended: true,
        },
        {
          id: 3,
          class_id: 1,
          user_id: 6,
          attended: true,
        },
        {
          id: 4,
          class_id: 1,
          user_id: 7,
          attended: true,
        },
        {
          id: 5,
          class_id: 2,
          user_id: 4,
          attended: true,
        },
        {
          id: 6,
          class_id: 2,
          user_id: 5,
          attended: true,
        },
        {
          id: 7,
          class_id: 2,
          user_id: 6,
          attended: true,
        },
        {
          id: 8,
          class_id: 2,
          user_id: 7,
          attended: true,
        },
        {
          id: 9,
          class_id: 3,
          user_id: 4,
          attended: true,
        },
        {
          id: 10,
          class_id: 3,
          user_id: 5,
          attended: true,
        },
        {
          id: 11,
          class_id: 3,
          user_id: 6,
          attended: true,
        },
        {
          id: 12,
          class_id: 3,
          user_id: 7,
          attended: true,
        },
        {
          id: 13,
          class_id: 4,
          user_id: 4,
          attended: true,
        },
        {
          id: 14,
          class_id: 4,
          user_id: 5,
          attended: true,
        },
        {
          id: 15,
          class_id: 4,
          user_id: 6,
          attended: true,
        },
        {
          id: 16,
          class_id: 4,
          user_id: 7,
          attended: true,
        },
        {
          id: 17,
          class_id: 5,
          user_id: 8,
          attended: true,
        },
        {
          id: 18,
          class_id: 5,
          user_id: 9,
          attended: true,
        },
        {
          id: 19,
          class_id: 5,
          user_id: 10,
          attended: true,
        },
        {
          id: 20,
          class_id: 5,
          user_id: 11,
          attended: true,
        },
        {
          id: 21,
          class_id: 6,
          user_id: 8,
          attended: true,
        },
        {
          id: 22,
          class_id: 6,
          user_id: 9,
          attended: true,
        },
        {
          id: 23,
          class_id: 6,
          user_id: 10,
          attended: true,
        },
        {
          id: 24,
          class_id: 6,
          user_id: 11,
          attended: true,
        },
        {
          id: 25,
          class_id: 7,
          user_id: 12,
          attended: true,
        },
        {
          id: 26,
          class_id: 7,
          user_id: 13,
          attended: true,
        },
        {
          id: 27,
          class_id: 7,
          user_id: 14,
          attended: true,
        },
        {
          id: 28,
          class_id: 7,
          user_id: 15,
          attended: true,
        },
        {
          id: 29,
          class_id: 8,
          user_id: 12,
          attended: true,
        },
        {
          id: 30,
          class_id: 8,
          user_id: 13,
          attended: true,
        },
        {
          id: 31,
          class_id: 8,
          user_id: 14,
          attended: true,
        },
        {
          id: 32,
          class_id: 8,
          user_id: 15,
          attended: true,
        },
      ]);
    });
};
