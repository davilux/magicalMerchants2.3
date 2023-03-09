const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
const express = require('express')
// const router = require('express').Router()
const app = express()
app.use(express.static('public'))

const YOUR_DOMAIN = 'http://localhost:8080'

app.post('/create-checkout-session', async (req, res) => {
  const order = await Order.findById(req.body.orderId, {
    include: {model: LineItem},
  })
  const session = await stripe.checkout.sessions.create({
    line_items: order.lineItems.map((lineItem) => {
      return {
        price: lineItem.price,
        quantity: lineItem.quantity,
      }
    }),
    // line_items: [
    //   {
    //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
    //     price: '{{PRICE_ID}}',
    //     quantity: 1,
    //   },
    // ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  })
  res.redirect(303, session.url)
})

//   app.listen(8080, () => console.log('Running on port 8080'));
