module.exports = function (app) {
  const express = require("express");
  const session = require("express-session");
  const FileStore = require("session-file-store")(session);
  const cookieParser = require("cookie-parser");
  const morgan = require("morgan");
  const mongoose = require("mongoose");
  const path = require("path");
  const searchRoute = require("../routes/search.js");
  const updateBaseRoute = require("../routes/updateBase");
  const registrationRoute = require("../routes/auth.js");
  const hbs = require("hbs")


  mongoose.connect(
    "mongodb+srv://hhparser:q123456@hh-parser.expfj.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  hbs.registerPartials(path.join(__dirname, "..", "views/partials"));
  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "..", "views"));
  app.use(express.static(path.join(__dirname, "..", "public")));

  app.use(express.json()); //  Экспреcc научится работать с JSON
  app.use(express.urlencoded({ extended: true })); // Экспресс научится читать req.body
  app.use(morgan("dev")); // Подключил морган для логов на каджую ручку

  app.use(cookieParser()); // Вызов парсера

  app.use(
    session({
      name: "user_sid", // имя куки
      resave: false, // перезапись сессии
      saveUninitialized: false, // сохранять прохожих
      secret: "parol",
      store: new FileStore(),
      // Настройка кук
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      },
    })
  );

  app.use("/", registrationRoute);
  app.use("/search", searchRoute);
  app.use("/updateBase", updateBaseRoute);
};
