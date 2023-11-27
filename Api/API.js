import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";

const app = express();

const CONNECTION_STRING = "mongodb://User1:Adminpw@Stat-Db:27017/Stat-Db"; //This can't remain here for obvious reasons

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

// Create
app.post("/createstat", async (req, res) => {
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
app.get("/getallstats", async (req, res) => {
  try {
    const stats = await StatModel.find();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a specific stat by ID
app.get("/getstatbyid/:id", async (req, res) => {
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
app.put("/updatestat/:id", async (req, res) => {
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
app.delete("/deletestat/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await StatModel.findByIdAndDelete(id);
    res.json({ message: "Stat deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/", function (req, res) {
  res.json({
    message: "Hello world from stat api",
  });
});

export default app;
