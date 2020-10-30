const mongoose = require('mongoose');
const Vacancy = require('./bdSchima');


mongoose.connect('mongodb://localhost/hui', {useNewUrlParser: true});


const allSkills = [];

async function findSkills(tag) {
	const temp = await Vacancy.find({tag});
	temp.forEach(el => {
		el.skills.forEach(el => allSkills.push(el));

	});

	const uniqueSkills = allSkills.filter((item, pos) => {
		return allSkills.indexOf(item) == pos;
	});

	return uniqueSkills
}

module.exports = findSkills;
