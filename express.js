// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// app.post('/users', (req, res) => {
//   res.send('User created successfully!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const app = express();
const port = 3000;

const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
  res.send('Hello, world!');
});

const usersRouter = express.Router();

usersRouter.post('/', (req, res) => {
  res.send('User created successfully!');
});

app.use('/', rootRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});