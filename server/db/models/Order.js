const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('CART', 'ORDER'),
    defaultValue: 'CART',
    allowNull: false
  },

  // // Changed STRING type to ENUM
  // status: {
  //   type: Sequelize.STRING,
  //   defaultValue: 'pending',
  //   validate: {
  //     isIn: [['pending', 'processing', 'shipped', 'cancelled', 'complete']],
  //   },
  // },

  //TODO: Maybe add date and time of the order?
  creditCard: {
    type: Sequelize.INTEGER,
    validate: {
      isCreditCard: true,
    },
  },
})

module.exports = Order
