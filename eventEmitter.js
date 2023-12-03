const EventEmitter = require("events");

class CustomEventEmitter extends EventEmitter {}

const customEmitter = new CustomEventEmitter();

customEmitter.on("userLoggedIn", (user) => {
  const timestamp = new Date().toLocaleString();
  console.log(`${timestamp}: ${user} logged in`);
});

customEmitter.on("userLoggedOut", (user) => {
  const timestamp = new Date().toLocaleString();
  console.log(`${timestamp}: ${user} logged out`);
});

module.exports = customEmitter;
