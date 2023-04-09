const Place = require("../models/place");
const express = require("express");
const app = express();

// exports.list = async(req, res) => {
//     res.render('list');
// }

const placess = async function insertdynamicdata() {
  try {
    await Place.insertMany([
      {
        "name": "Banaras Ghats",
        "category": "Varanasi",
        "image":
          "http://res.cloudinary.com/dsswjmlin/image/upload/v1679770458/qf0grj8fr7daithtl2xu.jpg",
      },
      {
        "name": "Assi Ghats",
        "category": "Varanasi",
        "image":
          "http://res.cloudinary.com/dsswjmlin/image/upload/v1679770458/qf0grj8fr7daithtl2xu.jpg",
      },
      {
        "name": "Mozambique Pushkar",
        "category": "Mozambique",
        "image":
          "http://res.cloudinary.com/dsswjmlin/image/upload/v1679770381/mgjtlxzkw6kesrjqamim.jpg",
      },
      {
       " name": "Lonavla Ghats",
        "category": "Lonavla",
        "image":
          "http://res.cloudinary.com/dsswjmlin/image/upload/v1679770458/qf0grj8fr7daithtl2xu.jpg",
      },
      {
       " name": "Jaisalmer Ghats",
        "category": "Jaisalmer",
       " image":
          "http://res.cloudinary.com/dsswjmlin/image/upload/v1679770458/qf0grj8fr7daithtl2xu.jpg",
      },
    ]);
  } catch (error) {
    console.log("err");
  }
};
    // Place.save();

module.exports = placess;
