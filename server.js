const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const URI = process.env.MONGODB_URI || "mongodb://localhost/workout"

mongoose.connect(URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api"));
app.use(require("./routes/views"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});