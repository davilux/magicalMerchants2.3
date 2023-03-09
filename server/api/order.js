const router = require('express').Router()
const Order = require('../db/models/Order')
const {requireToken, isAdmin} = require('./gatekeepingMiddleware')

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderid', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderid)
    res.send(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderid', requireToken, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderid)
    await order.update(req.body)
    res.sendStatus(204)
  } catch(err) {
    next(err)
  }
})

module.exports = router
