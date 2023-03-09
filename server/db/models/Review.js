const Sequelize = require("sequelize");
const db = require("../db");

//will list the reviewer's name that we get via associations
//review has a userId field. 
//can we convert the createdAt field to a readable date? 

const Review = db.define("review", {
  reviewText: {
    type: Sequelize.TEXT,
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      max: 5,
      min: 0
    }
  }
});

module.exports = Review;
