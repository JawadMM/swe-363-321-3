const express = require("express");
const app = express();
const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// app.post('/users', (req, res) => {
//   res.send('User created successfully!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const rootRouter = express.Router();

rootRouter.get("/", (req, res) => {
  res.send("Hello, world!");
});

const usersRouter = express.Router();

usersRouter.post("/", (req, res) => {
  res.send("User created successfully!");
});

app.use("/", rootRouter);
app.use("/users", usersRouter);

app.use(express.urlencoded({ extended: false }));

rootRouter.get("/", (req, res) => {
  res.send(`
    <form method="POST" action="/submit">
      <input type="text" name="username" placeholder="Username" />
      <button type="submit">Submit</button>
    </form>
  `);
});

const submitRouter = express.Router();

submitRouter.post("/", (req, res) => {
  const username = req.body.username;
  res.send(`Form submitted successfully! Username: ${username}`);
});

app.use("/", rootRouter);
app.use("/submit", submitRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
