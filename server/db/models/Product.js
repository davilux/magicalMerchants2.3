const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  inventoryQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  photoUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://cdn.dribbble.com/users/914722/screenshots/16011493/media/f954614891518bc891a8afab13d552b2.png?compress=1&resize=400x300",
  },
  category: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
