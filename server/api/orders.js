const router = require('express').Router()
const Order = require('../db/models/Order')
const {requireToken, isAdmin} = require('./gatekeepingMiddleware')

//if any issues try without the auth middleware first. 

//these routes are for admins to look at orders, not for regular users.? 

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

//davi said this route wasnt working - id was coming back undefined even when value was 1
//which should exist in seed data
router.get('/:orderid', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderid)
    res.send(order)
  } catch (err) {
    next(err)
  }
})

module.exports = router
