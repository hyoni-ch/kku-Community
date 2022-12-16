const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const config = require("./config/key.js");

//mongodb+srv://admin:1234@cluster0.9cokxxa.mongodb.net/?retryWrites=true&w=majority

app.use(express.static(path.join(__dirname, "../client/build")));
app.use("/image", express.static("./image"));
app.use("/cafeImage", express.static("./cafeImage"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/post", require("./Router/post.js"));
app.use("/api/ask", require("./Router/ask.js"));
app.use("/api/pic", require("./Router/pic.js"));
app.use("/api/user", require("./Router/user.js"));
app.use("/api/reple", require("./Router/reple.js"));
app.use("/api/cafe", require("./Router/cafe.js"));
app.use("/api/comment", require("./Router/comment.js"));
app.use("/api/favorite", require("./Router/favorite.js"));

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log(`Example app listening at http://localhost:${port}`);
      console.log("Connecting MongoDB...");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/", (요청, 응답) => {
  응답.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (요청, 응답) => {
  응답.sendFile(path.join(__dirname, "../client/build/index.html"));
});

