const cheerio = require('cheerio');
const request = require('request');
const mongoose = require('mongoose');
const Vacancy = require('../models/Vacancy');

const links = [];
const array = [];

function parse(url) {
 return new Promise((resolve, reject) => {
  request(url, function (error, response, body) {
   if (!error) {
    const $workLink = cheerio.load(body);
    $workLink('.HH-LinkModifier').each(function (i) {
     links[i] = $workLink(this).attr('href');
     resolve(links);
    });
   } else {
    console.log('Произошла ошибка: ' + error);
   }
  });
 }).then(async (links) => {
  let newArray = [];
  for (let i = 0; i < links.length; i++) {
   // парсинг страницы
   newArray = await req(i, links, newArray);
  }
  return newArray;
 }).then(data => data);
}
function req(i, links, newArray) {
 return new Promise((resolve => {
  request(links[i], function (error, response, body) {
   if (!error) {
    // парсинг скилов
    const skills = [];
    const $workSkill = cheerio.load(body);
    $workSkill('.bloko-tag__section').each(function (i) {
     skills[i] = $workSkill(this).text();
    });
    // создание объекта с данными
    const $page = cheerio.load(body);
    $page('.row-content').each(function (i, element) {
     array.push({
      vacancyTitle: $page(element).find('.bloko-header-1').text(),
      vacancyLink: links[i],
      companyName: $page(element).find('.bloko-section-header-2').text(),
      companyLogo: $page(element).find('.vacancy-company-logo__image').attr('src'),
      skills: skills,
      aboutVacancy: $page(element).find('.vacancy-description').text().replace(/\s+/g, ' ').trim(),
      salary: $page(element).find('.bloko-header-2_lite').text(),
     });
    });
    newArray = array.filter(item => item.vacancyTitle !== '');
    resolve(newArray);
   } else {
    console.log('Произошла ошибка: ' + error);
   }
  });
 }));
}

module.exports = {parse};
