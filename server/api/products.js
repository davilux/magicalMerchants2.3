const router = require('express').Router()
const Product = require('../db/models/Product')
const {requireToken, isAdmin} = require('./gatekeepingMiddleware')

//  ALL Products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.send(products)
  } catch (err) {
    next(err)
  }
})

// get single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.send(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    const updatedProduct = product.update({
      ...req.body,
    })
    res.send(updatedProduct)
  } catch (err) {
    next(err)
  }
})

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const productCreated = await Product.create(req.body)
    res.status(201).send(productCreated)
  } catch (err) {
    next(err)
  }
})

module.exports = router
