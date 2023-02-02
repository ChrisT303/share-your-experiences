const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/placesRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500).json({message: error.message || 'Unknown Error'});
});

app.listen(3000);
