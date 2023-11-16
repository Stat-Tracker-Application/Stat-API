import https from "https";
import http from "http";
import fs from "fs";
import app from "./API.js";

const port = process.env.PORT || 6000;

const options = {
  requestCert: true,
  rejectUnauthorized: false,
  ca: fs.readFileSync("./Certs/ca.crt"),
  key: fs.readFileSync("./Certs/localhost.key"),
  cert: fs.readFileSync("./Certs/localhost.crt"),
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; //dirty fix as discussed
const server = http.createServer(options, app);

server.listen(port, function (req, res) {
  console.log(`Server is listening at port ${port}`);
});
