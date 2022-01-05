const express = require("express");
const students = require("./students");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ msg: "Api calling successfully" });
});

app.get("/api/students", (req, res) => {
  res.json(students);
});

app.get("/api/students/:id", (req, res) => {
  const id = req.params.id;
  const index = students.findIndex((student) => {
    return student.id == id;
  });

  console.log(index);
  res.json(students[index]);
});

app.post("/api/students", (req, res) => {
  console.log(req.body);
  if (!req.body.first_name || !req.body.last_name || !req.body.email) {
    res.status(400);
    res.json({ message: "Bad Request" });
  }

  const user = {
    id: students.length + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
  };
  students.push(user);
  res.json(req.body);
});

app.put("/api/students/:id", (req, res) => {
  const id = req.params.id;

  const index = students.findIndex((student) => {
    return student.id === parseInt(id);
  });
  if (index >= 0) {
    let user_obj = students[index];
    user_obj.first_name = req.body.first_name;
    user_obj.last_name = req.body.last_name;
    user_obj.email = req.body.email;
    res.json(user_obj);
  } else {
    res.status(400);
    res.json({ message: "Bad Request" });
  }
});

app.delete("/api/students/:id", (req, res) => {
  let id = req.params.id;
  const index = students.findIndex((student) => {
    return student.id === Number.parseInt(id);
  });
  if (index >= 0) {
    let user_obj = students[index];
    students.splice(index, 1);
    res.json(user_obj);
  } else {
    res.status(400);
    res.json({ message: "Bad Request" });
  }
});

app.listen(3000);
