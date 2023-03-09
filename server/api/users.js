const router = require('express').Router()
const {
  models: {User},
} = require('../db')
const {requireToken, isAdmin} = require('./gatekeepingMiddleware')
module.exports = router

// TODO: check that req.params.userId === req.user.id
// 403 - forbidden

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username', 'isAdmin'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.sendStatus(204);
  }
  catch (error) {
    next(error);
  }
});