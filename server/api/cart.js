const router = require("express").Router();
const { models: { User }} = require("../db");
const {requireToken} = require('./gatekeepingMiddleware')

module.exports = router

//see user's cart
router.get("/", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (err) {
    next(err);
  }
});

// router.post("/createOrder", async (req, res, next) => {
//   try {
//     const user = await User.findByToken(req.headers.authorization);
//     res.send(await User.createOrder());
//   } catch (err) {
//     next(err);
//   }
// })

router.post("/addToCart", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    //TODO: when console logging, it's clear that the req.headers here doesn't have an authorization property, which is strange since it seems like we're setting one in the addToCart thunk.
    res.send(await user.addToCart(req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/removeFromCart", requireToken, async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  } catch (err) {
    next(err);
  }
});