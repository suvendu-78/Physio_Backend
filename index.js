import express from "express";

const App = express();
const PORT = 8000;

App.get("/hello", (req, res) => {
  res.send("hello world");
});
App.listen(PORT, () => {
  console.log("server connected at Port :", PORT);
});
