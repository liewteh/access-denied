const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "LT",
  password: "wIsE_888",
  database: "cyf",
});

const students = `
    SELECT user_name 
    FROM users 
    WHERE user_name
    LIKE 'Stud%'`;

app.get("/students", (req, res) =>
    pool.query(students)
    .then(result => res.send(result.rows))
    .catch(error => res.status(500).send(error))
);

app.listen(5000, () => console.log("Listening on port 5000."));