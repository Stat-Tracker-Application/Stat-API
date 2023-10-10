import https from "https";
import fs from "fs";
import app from "./API.js";

const port = process.env.PORT || 5000;

const options = {
  key: fs.readFileSync("./Certificates/server.key"),
  cert: fs.readFileSync("./Certificates/server.cert"),
};
const server = https.createServer(options, app);

server.listen(port, function (req, res) {
  console.log(`Server is listening at port ${port}`);
});
