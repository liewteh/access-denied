
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          user_name: "Admin",
          password: "admin",
          account_verified: true,
        },
        {
          id: 2,
          user_name: "Teacher1",
          password: "teacher1",
          account_verified: true,
        },
        {
          id: 3,
          user_name: "Teacher2",
          password: "teacher2",
          account_verified: true,
        },
        {
          id: 4,
          user_name: "Student1",
          password: "student1",
          account_verified: false,
        },
        {
          id: 5,
          user_name: "Student2",
          password: "student2",
          account_verified: false,
        },
        {
          id: 6,
          user_name: "Student3",
          password: "student3",
          account_verified: false,
        },
        {
          id: 7,
          user_name: "Student4",
          password: "student4",
          account_verified: false,
        },
        {
          id: 8,
          user_name: "Student5",
          password: "student5",
          account_verified: false,
        },
        {
          id: 9,
          user_name: "Student6",
          password: "student6",
          account_verified: false,
        },
        {
          id: 10,
          user_name: "Student7",
          password: "student7",
          account_verified: false,
        },
        {
          id: 11,
          user_name: "Student8",
          password: "student8",
          account_verified: false,
        },
        {
          id: 12,
          user_name: "Student9",
          password: "student9",
          account_verified: false,
        },
        {
          id: 13,
          user_name: "Student10",
          password: "student10",
          account_verified: false,
        },
        {
          id: 14,
          user_name: "Student11",
          password: "student11",
          account_verified: false,
        },
        {
          id: 15,
          user_name: "Student12",
          password: "student12",
          account_verified: false,
        },
        {
          id: 16,
          user_name: "Student13",
          password: "student13",
          account_verified: false,
        },
        {
          id: 17,
          user_name: "Student14",
          password: "student14",
          account_verified: false,
        },
        {
          id: 18,
          user_name: "Student15",
          password: "student15",
          account_verified: false,
        },
        {
          id: 19,
          user_name: "Student16",
          password: "student16",
          account_verified: false,
        },
        {
          id: 20,
          user_name: "Student17",
          password: "student17",
          account_verified: false,
        },
      ]);
    });
};
