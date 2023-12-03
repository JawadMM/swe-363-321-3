const readline = require("readline");

const chatbotResponses = {
  "What is your name?": "My name is Chatbot. Nice to meet you!",
  "How are you?": "I am doing well, thank you!",
  "What is the weather like today?":
    "I am sorry, I am just a chatbot and do not have that information.",
  "exit": "Goodbye! Have a great day!",
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function chatbot() {
  rl.question("User: ", (input) => {
    if (input.toLowerCase() === "exit" || input.toLowerCase() === "quit") {
      console.log(chatbotResponses["Exit"]);
      rl.close();
      return;
    }

    const matchingQuestion = Object.keys(chatbotResponses).find((question) =>
      input.toLowerCase().includes(question.toLowerCase())
    );

    if (matchingQuestion) {
      console.log("Chatbot:", chatbotResponses[matchingQuestion]);
    } else {
      console.log(
        "Chatbot: I'm sorry, I don't understand. Can you please rephrase your question?"
      );
    }

    chatbot();
  });
}

console.log("Chatbot: Hello! How can I assist you today?");
chatbot();
