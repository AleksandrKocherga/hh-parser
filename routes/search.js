const router = require("express").Router();
const Vacancy = require("../models/Vacancy.js");

router.get("/", (req, res) => {
  console.log("1233333");
  res.send("123");
});
module.exports = router;
