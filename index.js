const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb+srv://hedaumithanshu:mithanshu@cluster0.om5rn.mongodb.net/whatsapp"
  );
}

// Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("index.ejs", { chats });
});

// Form Rendering
app.get("/chats/new", (req, res) => {
  res.render("form.ejs");
});

// insert new chat
app.post("/chats", (req, res) => {
  const { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("Chat saved successfully");
    })
    .catch((err) => {
      console.log("Error saving chat", err);
    });
  res.redirect("/chats");
});

// Edit chat
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

// Update chat
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: msg },
    { runValidators: true },
    { new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

app.get("/chats/delete/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findById(id);
  res.render("delete.ejs", { id, deletedChat });
});

app.get("/delete/:id", (req, res) => {
  let { id } = req.params;
  Chat.findByIdAndDelete(id)
    .then(() => {
      console.log("Chat deleted successfully");
      res.redirect("/chats");
    })
    .catch((err) => {
      console.log("Error deleting chat", err);
    });
});

app.get("/", (req, res) => {
  res.redirect("/chats");
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
