const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
});

const users = [
  { name: "ali", age: 20 },
  { name: "ama", age: 21 },
  { name: "abu", age: 22 },
];

const posts = [{ title: "my foods" }];

app.get("/", (req, res) => {
  res.send({
    msg: "Hello World!",
    user: {},
  });
});

app.post("/", (req, res) => {
  const user = req.body;
  users.push(user);
  res.status(201).send("Created User");
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:name", (req, res) => {
  const { name } = req.params;
  const user = users.find((user) => user.name === name);
  if (user) res.status(200).send(user);
  else res.status(404).send("Not Found");
});

app.get("/posts", (req, res) => {
  console.log(req.query);
  const { title } = req.query;
  if (title) {
    const post = posts.find((post) => post.title === title);
    if (post) res.status(200).send(post);
    else res.status(404).send("Not Found");
  }
  res.status(200).send(posts);
});

function validateAuthToken(req, res, next) {
  console.log("Inside validate Auth Token");
  const { authorization } = req.headers;
  if (authorization && authorization === "123") {
    next();
  } else {
    res.status(403).send({ msg: "Forbidden. Incorrect Credentials" });
  }
}

app.post("/posts", validateAuthToken, (req, res) => {
  const post = req.body;
  posts.push(post);
  res.status(201).send(post);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
