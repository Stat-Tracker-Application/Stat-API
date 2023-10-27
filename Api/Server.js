import https from "https";
import fs from "fs";
import app from "./API.js";

const port = process.env.PORT || 6000;

const options = {
  ca: fs.readFileSync("../Certificates/ca.crt"),
  key: fs.readFileSync("./Certs/localhost.key"),
  cert: fs.readFileSync("./Certs/localhost.crt"),
};
const server = https.createServer(options, app);

server.listen(port, function (req, res) {
  console.log(`Server is listening at port ${port}`);
});
