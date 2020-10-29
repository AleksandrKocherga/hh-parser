const express = require("express");
const config = require("./middleware");


const app = express();
config(app);

module.exports = app;
