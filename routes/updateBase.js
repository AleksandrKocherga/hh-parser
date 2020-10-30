const router = require("express").Router();
const Vacancy = require("../models/Vacancy.js");
const { parse } = require("../logic/parsePage");
// const findSkills = require('../logic/uniqueSkills');
// const {sumSalary, findSalary} = require('../logic/averageSalary');

// запись в базу по слову из строки поиска
router.post("/", async (req, res) => {
  const searchToAdd = req.body.text;
  const response = await parse(
    `https://spb.hh.ru/search/vacancy?clusters=true&area=2&specialization=1.221&enable_snippets=true&salary=&st=searchVacancy&text=${searchToAdd}`
  );
  console.log(response);
  for (let i = 0; i < response.length; i++) {
    Vacancy.create({
      tag: searchToAdd,
      vacancyTitle: response[i].vacancyTitle,
      vacancyLink: response[i].vacancyLink,
      companyName: response[i].companyName,
      companyLogo: response[i].companyLogo,
      skills: response[i].skills,
      aboutVacancy: response[i].aboutVacancy,
      salary: response[i].salary,
    });
  }
  res.json({ massage: "OK" });
});

module.exports = router;
