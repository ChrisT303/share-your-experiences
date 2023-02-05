const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/placesRoutes");
const userRoutes = require("./routes/userRoutes");
const ErrorHandler = require("../server/models/error.js");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

app.use((req, res) => {
  const error = new ErrorHandler("Route not found", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Unknown Error" });
});

mongoose
  .connect('mongodb+srv://deftonechris:share@cluster0.dvr7gkn.mongodb.net/places?retryWrites=true&w=majority')
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

