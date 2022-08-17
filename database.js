const express = require("express");
const app = express();
require("dotenv").config();

const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'accounting_db'
})

db.connect()

db.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  let sql = 'SELECT * FROM users';
  db.query(sql, (err, results) => {
    if(err) {
      throw err;
    }
    res.send(results);
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});