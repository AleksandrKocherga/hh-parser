const User = require("../models/User.js");
const router = require("express").Router();

router.post("/login", async (req, res) => {
  const { loginName, loginPassword } = req.body;
  const user = await User.findOne({ name: loginName });

  if (user && user.password === loginPassword) {
    req.session.user = user;
    res.redirect("/main");
  } else {
    res.redirect("/");
  }
});

router.get("/main", (req, res) => {
  if (req.session.user) res.render("main", { title: "Парсер" });
  else res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
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
  req.session.user = user;
  // res.redirect("/main");
  res.json({ status: "Успешно!" });
});

router.use((req, res, next) => {
  next({
    status: 404,
    message: "Not Found",
  });
});

router.use((err, req, res, next) => {
  if (err.status === 404) {
    return res.status(400).render("404");
  }


  next();
});

module.exports = router;
