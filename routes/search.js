const router = require("express").Router();
const Vacancy = require("../models/Vacancy.js");

router.get("/", (req, res) => {
  console.log(req.query.searchText);
  res.send("123");
});
module.exports = router;
