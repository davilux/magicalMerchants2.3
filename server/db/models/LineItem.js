const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {
  price: {
    type: Sequelize.DECIMAL(20, 2),
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
})

module.exports = LineItem
