import express from "express";
import bodyparser from "body-parser";

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", function (req, res) {
  res.send({
    message: "Hello world from stat api",
  });
});

export default app;
