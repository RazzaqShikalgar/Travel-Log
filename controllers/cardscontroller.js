
const Cards = require('../models/cards');
// const express = require('express');
// const app = express();

// exports.list = async(req, res) => {
    // res.render('list');
// }

 const cards = async function insertdynamicdata(){
    try {
        await Cards.insertMany([
                {
                "name":"Punjab",
                "description":"What is the other name of Punjab?Punjab was called Aratta and its people Balhika. “Where these five rivers, Shatadru, Vipasha, the third Iravati, Chandrabhaga and Vitasta flow and where there are Pilu-forests", 
                "image":"punjab_card.jpg"
                },
                {
                    "name":"Delhi",
                    "description":"The town was known as Indraprastha, where Pandavas used to live. In due course eight more cities came alive adjacent to Indraprastha:",
                    "image":"delhi_card.jpg"
                },
                {
                    "name":"Maharashtra",
                    "description":"Maharashtra is one of India's largest commercial and industrial centres, which has led to its being called the gateway of India. Maharashtra is also famous for its culture and beauty",
                    "image":"maharashtra_card.jpg"
                },
                {
                    "name":"Himalaya",
                    "description":"The Himalayas consist of three parallel ranges -the Shivalik hills, which comprise the foothills, the Lesser Himalayas called the Himachal, the Greater Himalayas known as the Himadri",
                    "image":"himalaya_card.jpg"
                },
                {
                    "name":"Swizterland",
                    "description":"Helvetia, how the country was called in ancient times, but even today, the name is still in use. The country's official Latin name is Confoederatio Helvetica (CH).",
                    "image":"switerzland_card.jpg"
                }

        ]);
    } catch (error) {
        console.log('err');
    }
}
// Cards.save();

module.exports = cards;



