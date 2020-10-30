const mongoose = require('mongoose');
const Vacancy = require('../models/Vacancy');

mongoose.connect('mongodb://localhost/hui', {useNewUrlParser: true});


// курс валют
const usd = 79;
const eur = 92;


let salaryArr = [];

// поиск ЗП по тегу поиска
async function findSalary(tag) {
	const salary = await Vacancy.find({tag});
	salary.forEach(el => {
		if (el.salary !== 'з/п не указана') {
			salaryArr.push(el.salary);
		}
	});
	return salaryArr;
}

// преобразование строки в число
function ourNumber(str) {
	str = str.replace(/[^0-9\s]/g, '').trim().replace(/\s{2}/g, ',');
	str = str.split(',')[0].replace(/\s/g, '');
	return +str;
}

function sumSalary(array) {
	const sumArr = [];

	array.forEach(el => {

		// если рубли и тире
		if (!(el.indexOf('руб') === -1)) {
			if (!(el.indexOf('до') === -1)) {
				sumArr.push(ourNumber(el));
			}
		}

// если рубли и без тире
		if (!(el.indexOf('руб') === -1)) {
			if ((el.indexOf('до') === -1)) {
				sumArr.push(ourNumber(el));
			}
		}

		//если доллары и тире
		if (!(el.indexOf('USD') === -1)) {
			if (!(el.indexOf('до') === -1)) {
				sumArr.push(ourNumber(el) * usd);
			}
		}

		// если доллары и без тире
		if (!(el.indexOf('USD') === -1)) {
			if ((el.indexOf('до') === -1)) {
				sumArr.push(ourNumber(el) * usd);
			}
		}

		// если евро и тире
		if (!(el.indexOf('EUR') === -1)) {
			if (!(el.indexOf('до') === -1)) {
				sumArr.push(ourNumber(el) * eur);
			}
		}

// если евро и без тире
		if (!(el.indexOf('EUR') === -1)) {
			if ((el.indexOf('до') === -1)) {
				sumArr.push(ourNumber(el) * eur);
			}
		}
	});

// расчет средней зарплаты
	const sum = Math.floor(sumArr.reduce((previousValue, currentValue) => previousValue + currentValue, 0) / sumArr.length);
	// console.log(sum);
	return sum;
}

module.exports = {sumSalary, findSalary};


