import express from "express";
import bodyparser from "body-parser";

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", function (req, res) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //dirty fix as discussed
  res.send({
    message: "Hello world from stat api",
  });
});

export default app;
