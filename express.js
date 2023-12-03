const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.post('/users', (req, res) => {
  res.send('User created successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});