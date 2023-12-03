const customEmitter = require("./eventEmitter");

function simulateUserLogin() {
  const users = ["User1", "User2", "User3"];
  const randomUserIndex = Math.floor(Math.random() * users.length);
  const randomDelay = Math.random() * (2 - 0.1) + 0.1;

  const user = users[randomUserIndex];
  customEmitter.emit("userLoggedIn", user);

  setTimeout(simulateUserLogout, randomDelay * 1000, user);
}

function simulateUserLogout(user) {
  customEmitter.emit("userLoggedOut", user);
}

setInterval(simulateUserLogin, Math.random() * (2000 - 100) + 100);
