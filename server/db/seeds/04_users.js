
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users").del()
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
          user_name: "Sloane Tettersell",
          account_verified: false,
          password: "rnSEhM",
        },
        {
          id: 5,
          user_name: "Audra Causnett",
          account_verified: true,
          password: "I4sEYycBhX",
        },
        {
          id: 6,
          user_name: "Arnuad Exon",
          account_verified: true,
          password: "qt4zymtnh0O",
        },
        {
          id: 7,
          user_name: "Cosetta Pagram",
          account_verified: false,
          password: "rZYVzFH",
        },
        {
          id: 8,
          user_name: "Oralle Lorens",
          account_verified: true,
          password: "18uFhsnR",
        },
        {
          id: 9,
          user_name: "Gabrielle Twelve",
          account_verified: false,
          password: "8Qk8hxT3",
        },
        {
          id: 10,
          user_name: "Torr Mayne",
          account_verified: false,
          password: "zdAVAyl",
        },
        {
          id: 11,
          user_name: "Ed Shotter",
          account_verified: false,
          password: "6s8TyK",
        },
        {
          id: 12,
          user_name: "Hakim Stalman",
          account_verified: false,
          password: "F0dtg0dhhQ",
        },
        {
          id: 13,
          user_name: "Mikael Nigh",
          account_verified: false,
          password: "2Xj9Xis",
        },
        {
          id: 14,
          user_name: "Gene Ringe",
          account_verified: true,
          password: "6Bt5EUUg",
        },
        {
          id: 15,
          user_name: "Laurence January",
          account_verified: true,
          password: "HDsxcA3i",
        },
        {
          id: 16,
          user_name: "Tiffany Lumox",
          account_verified: true,
          password: "e0XLdE",
        },
        {
          id: 17,
          user_name: "Rodrick Trevascus",
          account_verified: true,
          password: "GZsFRt9cis",
        },
        {
          id: 18,
          user_name: "Berne Stack",
          account_verified: true,
          password: "N8Lz2MBuLnMd",
        },
        {
          id: 19,
          user_name: "Zebedee Betton",
          account_verified: true,
          password: "oLYKtV",
        },
        {
          id: 20,
          user_name: "Stormie Finding",
          account_verified: true,
          password: "gKwiCpVi",
        },
      ]);
    });
};
