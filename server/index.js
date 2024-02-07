const express = require("express");
const cors = require("cors");
const connection = require("./config/config");
const contentController = require("./routes/contentRoute");

require("dotenv").config();
const app = express();
app.use("/api", express.static("public/uploads"));
app.use(express.json());
app.use(cors());

app.use("/content", contentController);

app.get("/", (req, res) => {
  return res.status(200).send("HomePage");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
  console.log(`db connect at ${process.env.PORT}`);
});
