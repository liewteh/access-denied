exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("class_attendances")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("class_attendances").insert([
        {
          class_id: 1,
          user_id: 4,
          attended: true,
        },
        {
          class_id: 1,
          user_id: 5,
          attended: true,
        },
        {
          class_id: 1,
          user_id: 6,
          attended: true,
        },
        {
          class_id: 1,
          user_id: 7,
          attended: true,
        },
        {
          class_id: 2,
          user_id: 4,
          attended: true,
        },
        {
          class_id: 2,
          user_id: 5,
          attended: true,
        },
        {
          class_id: 2,
          user_id: 6,
          attended: true,
        },
        {
          class_id: 2,
          user_id: 7,
          attended: true,
        },
        {
          class_id: 3,
          user_id: 4,
          attended: true,
        },
        {
          class_id: 3,
          user_id: 5,
          attended: true,
        },
        {
          class_id: 3,
          user_id: 6,
          attended: true,
        },
        {
          class_id: 3,
          user_id: 7,
          attended: true,
        },
        {
          class_id: 4,
          user_id: 4,
          attended: true,
        },
        {
          class_id: 4,
          user_id: 5,
          attended: true,
        },
        {
          class_id: 4,
          user_id: 6,
          attended: true,
        },
        {
          class_id: 4,
          user_id: 7,
          attended: true,
        },
        {
          class_id: 5,
          user_id: 8,
          attended: true,
        },
        {
          class_id: 5,
          user_id: 9,
          attended: true,
        },
        {
          class_id: 5,
          user_id: 10,
          attended: true,
        },
        {
          class_id: 5,
          user_id: 11,
          attended: true,
        },
        {
          class_id: 6,
          user_id: 8,
          attended: true,
        },
        {
          class_id: 6,
          user_id: 9,
          attended: true,
        },
        {
          class_id: 6,
          user_id: 10,
          attended: true,
        },
        {
          class_id: 6,
          user_id: 11,
          attended: true,
        },
        {
          class_id: 7,
          user_id: 12,
          attended: true,
        },
        {
          class_id: 7,
          user_id: 13,
          attended: true,
        },
        {
          class_id: 7,
          user_id: 14,
          attended: true,
        },
        {
          class_id: 7,
          user_id: 15,
          attended: true,
        },
        {
          class_id: 8,
          user_id: 12,
          attended: true,
        },
        {
          class_id: 8,
          user_id: 13,
          attended: true,
        },
        {
          class_id: 8,
          user_id: 14,
          attended: true,
        },
        {
          class_id: 8,
          user_id: 15,
          attended: true,
        },
      ]);
    });
};
