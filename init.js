const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const allChats = [
  {
    from: "mike",
    to: "john",
    msg: "Are you there ?",
    created_at: new Date(),
  },
  {
    from: "ryan",
    to: "joe",
    msg: "Good morning",
    created_at: new Date(),
  },
  {
    from: "emma",
    to: "liam",
    msg: "I'll call you later.",
    created_at: new Date(),
  },
  {
    from: "ava",
    to: "noah",
    msg: "Let's meet at the cafe.",
    created_at: new Date(),
  },
  {
    from: "sophia",
    to: "oliver",
    msg: "Did you finish the report?",
    created_at: new Date(),
  },
  {
    from: "isabella",
    to: "elijah",
    msg: "Happy birthday!",
    created_at: new Date(),
  },
];
Chat.insertMany(allChats);
