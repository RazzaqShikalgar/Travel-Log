
const Gallery = require('../models/gallery');
// const express = require('express');
// const app = express();

// exports.list = async(req, res) => {
//     res.render('list');
// }

 const gallery = async function insertdynamicdata(){
    try {
        await Gallery.insertMany([
                {
                "name":"Kolkata",
                "description":"White Concrete Castle Near Water Body",
                "image":"kolkata.jpg"
                },
                {
                    "name":"Boat's City",
                    "description":"White Concrete Castle Near Water Body",
                    "image":"cityboat.jpg"
                },
                {
                    "name":"Ayodhya",
                    "description":"Boats on body of ayodhya",
                    "image":"ayodhya.jpg"
                },
                {
                    "name":"Statue Of Liberty",
                    "description":"Statue Of Liberty is one of the oldest and highest monuments !",
                    "image":"statueofliberty.jpg"
                },
                {
                    "name":"Taj Hotel",
                    "description":"Love and affection towards birds",
                    "image":"pigeon.jpg"
                },
                {
                    "name":"Himalayan Mountains",
                    "description":"Himalayan Mountains Looking Preety",
                    "image":"himalaya.jpg"
                },
                {
                    "name":"Indian Express Train",
                    "description":"Moving train between ",
                    "image":"train.jpg"
                },
                {
                    "name":"Buddha",
                    "description":"Keep Worshiping God",
                    "image":"buddha.jpg"
                },
                {
                    "name":"Best Click",
                    "description":"panning Photo of water boat's",
                    "image":"boat.jpg"
                },
                {
                    "name":"Agra Temple",
                    "description":"Group of people sitting near pillar",
                    "image":"agra_temple.jpg"
                },
                {
                    "name":"Chandminar",
                    "description":"brown concrete tower under sky",
                    "image":"chandminar.jpg"
                },
                {
                    "name":"Ganpati Bappa",
                    "description":"Mumbaikar's ❤ Bappa",
                    "image":"bappa.jpg"
                }

        ]);
    } catch (error) {
        console.log('err');
    }
}
// Gallery.save();

module.exports = gallery;



