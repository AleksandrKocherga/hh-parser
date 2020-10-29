const User = require("../models/User.js");
const router = require("express").Router();

router.get("/login", (req, res) => {
  res.render("login", { title: "Логин" });
});

router.get("/main", (req, res) => {
  res.render("main", { title: "Парсер" });
});

router.get("/", (req, res) => {
  res.render("registration", { title: "Регистрация" });
});

// при отправке
router.post("/registration", async (req, res) => {
  const user = await new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    status: req.body.admin,
  });
  await user.save();
  // res.redirect("/main");
  res.json({ status: "Успешно!" });
});

router.post("/login", async (req, res) => {});
module.exports = router;
