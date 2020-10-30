const router = require("express").Router();
const Vacancy = require("../models/Vacancy.js");
// const {parse} = require('../logic/parsePage');
const findSkills = require("../logic/uniqueSkills");
const { sumSalary, findSalary } = require("../logic/averageSalary");

// получение скилов, среднюю ЗП и данные из базы

router.post("/", async (req, res) => {
  const search = req.body.text;

  // уникальные скилы
  const uniqueSkills = await findSkills(search);

  // средняя ЗП
  const preSum = await findSalary(search);
  const sumSal = await sumSalary(preSum);

  // вакансии по поиску
  const vacancy = await Vacancy.find({ tag: search });
  console.log(sumSal);

  // res.render("404", {
  //   layout: false,
  //   // arrStack: [{ skill: "CSS" }, { skill: "JS" }, { skill: "Node.js" }],
  //   zp: sumSal,
  //   // uniqueSkills,
  //   // sumSal,
  //   // vacancy,
  // });

  res.json({ sumSal, uniqueSkills });
});

module.exports = router;
