const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vacancyShema = Schema({
	tag: {type: String},
	vacancyTitle: {type: String},
	vacancyLink: {type: String},
	companyName: {type: String},
	companyLogo: {type: String},
	skills: [],
	aboutVacancy: [],
	salary: {type: String},
});

module.exports = mongoose.model("Vacancy", vacancyShema);
