import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import client from "prom-client";

const app = express();

const username = process.env.STATDB_USER;
const password = process.env.STATDB_PASSWORD;

const register = new client.Registry();
register.setDefaultLabels({
  app: "stat-api",
});
client.collectDefaultMetrics({ register });

const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
});

// Register the histogram with the Prometheus client
httpRequestDurationMicroseconds.register();

const CONNECTION_STRING = `mongodb://${username}:${password}@statdb-service:5150/admin?authSource=admin&authMechanism=SCRAM-SHA-256`;

console.log(CONNECTION_STRING);

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB connection
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const statSchema = new mongoose.Schema({
  Testname: String,
  TestStat: String,
  TimeOfCreation: { type: Date, default: Date.now },
});

// Create a model based on the schema
const StatModel = mongoose.model("Stat", statSchema);

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Runs before each requests
app.use((req, res, next) => {
  res.locals.startEpoch = Date.now();
  next();
});

// Create
app.post("/createstat", async (req, res, next) => {
  try {
    const { Testname, TestStat } = req.body;
    const newStat = new StatModel({ Testname, TestStat });
    await newStat.save();

    // Send only the relevant data in the response
    res.json({
      Testname: newStat.Testname,
      TestStat: newStat.TestStat,
      TimeOfCreation: newStat.TimeOfCreation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read
app.get("/getallstats", async (req, res, next) => {
  try {
    const stats = await StatModel.find();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific stat by ID
app.get("/getstatbyid/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const stat = await StatModel.findById(id);

    if (!stat) {
      return res.status(404).json({ message: "Stat not found" });
    }

    res.json(stat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
app.put("/updatestat/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { Testname, TestStat } = req.body;
    const updatedStat = await StatModel.findByIdAndUpdate(
      id,
      { Testname, TestStat },
      { new: true }
    );
    res.json(updatedStat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
app.delete("/deletestat/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await StatModel.findByIdAndDelete(id);
    res.json({ message: "Stat deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", function (req, res, next) {
  res.json({
    message: "Hello world from stat api",
  });
});

app.get("/metrics", function (req, res) {
  res.setHeader("Content-Type", register.contentType);
  register
    .metrics()
    .then((metrics) => res.end(metrics))
    .catch((err) => {
      console.error("Error generating metrics:", err);
      res.status(500).send("Internal Server Error");
    });
});

// Error handler
app.use((err, req, res, next) => {
  res.statusCode = 500;
  // Do not expose your error in production
  res.json({ error: err.message });
  next();
});

// Runs after each requests
app.use((req, res, next) => {
  const responseTimeInMs = Date.now() - res.locals.startEpoch;

  httpRequestDurationMicroseconds
    .labels(req.method, req.route.path, res.statusCode)
    .observe(responseTimeInMs);

  next();
});
export default app;
