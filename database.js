const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const mysql = require('mysql')
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app'
})

db.connect()

app.use(cors({
  credentials: true,
  origin: true,
  exposedHeaders: 'Content-Disposition'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  let sql = `SELECT * FROM admins WHERE email = '${email}' and password = '${password}'`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }

    if (!results[0]) {
      return res.status(500).json({ message: 'EMAIL OR PASSWORD FAILED' });
    }

    return res.status(200).json({ message: 'LOGIN SUCCESSFULLY', results: results[0] });
  });
});

// admins
app.get("/api/admins", (req, res) => {
  let sql = `SELECT * FROM admins`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }
    return res.status(200).json({ results });
  });
});

app.post("/api/admins/create", (req, res) => {
  const { email, name, password } = req.body
  let sql = `INSERT INTO admins (name, email, password, role) VALUES ('${name}','${email}','${password}', ${2})`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }
    return res.status(200).json({ message: 'ADMIN CREATED' });
  });
});

app.get("/api/admins/:id", (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM admins WHERE id = ${id}`;
  console.log(sql);
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }
    if (!results[0]) {
      return res.status(500).json({ message: 'Something wrong!' });
    }

    return res.status(200).json({ results: results[0] });
  });
});

app.put("/api/admins/:id", (req, res) => {
  const { id } = req.params;
  const { email, name, password } = req.body
  let sql = `UPDATE admins SET email = '${email}', name = '${name}'${password !== '' ? `, password = \'${password}\'` : ''} WHERE id = ${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }
    return res.status(200).json({ message: 'ADMIN UPDATED' });
  });
});

app.delete("/api/admins/:id", (req, res) => {
  const { id } = req.params;
  let sql = `DELETE FROM admins WHERE id = ${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }

    return res.status(200).json({ message: 'ADMIN DELETED' });
  });
});

// users
app.get("/api/users", (req, res) => {
  let sql = `SELECT * FROM users`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }
    return res.status(200).json({ results });
  });
});

app.post("/api/users/create", (req, res) => {
  const { email, name, password, contactNo } = req.body
  let sql = `INSERT INTO users (name, email, password, contactNo) VALUES ('${name}','${email}','${password}', '${contactNo}')`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }
    return res.status(200).json({ message: 'USER CREATED' });
  });
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM users WHERE id = ${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }
    if (!results[0]) {
      return res.status(500).json({ message: 'Something wrong!' });
    }

    return res.status(200).json({ results: results[0] });
  });
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { email, name, password, contactNo } = req.body
  let sql = `UPDATE users SET email = '${email}', name = '${name}'${password !== '' ? `, password = \'${password}\'` : ''}, contactNo = '${contactNo}' WHERE id = ${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }
    return res.status(200).json({ message: 'USER UPDATED' });
  });
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  let sql = `DELETE FROM users WHERE id = ${id}`;
  console.log(sql);
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }

    return res.status(200).json({ message: 'USER DELETED' });
  });
});

// products
app.get("/api/products", (req, res) => {
  let sql = `SELECT * FROM products`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }
    return res.status(200).json({ results });
  });
});

app.post("/api/users/products", (req, res) => {
  const { description, name, category, price } = req.body
  let sql = `INSERT INTO products (name, description, category, price) VALUES ('${name}','${description}','${category}', ${price})`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }
    return res.status(200).json({ message: 'PRODUCT CREATED' });
  });
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  let sql = `SELECT * FROM products WHERE id = ${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }
    if (!results[0]) {
      return res.status(500).json({ message: 'Something wrong!' });
    }

    return res.status(200).json({ results: results[0] });
  });
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { description, name, category, price } = req.body
  let sql = `UPDATE products SET description = '${description}', name = '${name}', category = '${category}', price = ${price} WHERE id = ${id}`;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }
    return res.status(200).json({ message: 'PRODUCT UPDATED' });
  });
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  let sql = `DELETE FROM products WHERE id = ${id}`;
  console.log(sql);
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.sqlMessage });
    }

    return res.status(200).json({ message: 'PRODUCT DELETED' });
  });
});

app.post("/api/mobile/login", (req, res) => {
  const { email, password } = req.body;
  let sql = `SELECT * FROM users WHERE email = '${email}' and password = '${password}'`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.get("/api/mobile/product", (req, res) => {
  let sql = 'SELECT * FROM products';
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

const port = process.env.DEV_PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});