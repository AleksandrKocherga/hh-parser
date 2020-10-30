const router = require('express').Router();
const Vacancy = require('../models/Vacancy.js');
// const {parse} = require('../logic/parsePage');
const findSkills = require('../logic/uniqueSkills');
const {sumSalary, findSalary} = require('../logic/averageSalary');


// получение скилов, среднюю ЗП и данные из базы

// router.get('/', async (req, res) => {
// 	const search = 'react';
// 	// уникальные скилы
// 	const uniqueSkills = await findSkills(search);
//
// 	// средняя ЗП
// 	const preSum = await findSalary(search);
// 	const sumSal = await sumSalary(preSum);
//
// 	// вакансии по поиску
// 	const vacancy = await Vacancy.find({tag: search});
//
// 	// res.json({uniqueSkills, sumSal, vacancy});
//
// 	console.log(uniqueSkills);
//
// });
