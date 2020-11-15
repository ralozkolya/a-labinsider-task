const createError = require("http-errors");
const express = require("express");
const cors = require("cors");

const retrieveFacilities = require("./db/facilities");

const app = express();

app.use(cors());

app.get("/facilities", async (req, res, next) => {
  try {
    res.send(await retrieveFacilities());
  } catch (e) {
    next(e);
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
