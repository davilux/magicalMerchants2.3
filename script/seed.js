'use strict'

const {
  db,
  models: {User, Category, Product, Order, LineItem},
} = require('../server/db')
const LoremIpsum = require('lorem-ipsum').LoremIpsum

//using an api to generate descriptions
const lorem = new LoremIpsum({
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({force: true}) // clears db and matches models to tables
  console.log('db synced!')

  const categories = await Promise.all([Category.create({name: 'All'})])

  // Creating Users
  const users = await Promise.all([
    User.create({
      password: 'admin_password',
      firstName: `Trustworthy`,
      lastName: `Administrator`,
      email: `admin@magicalmerchants.com`,
      username: `admin`,
      isAdmin: true,
    }),

    User.create({
      password: 'whereTheWindTakesMe',
      firstName: `Wayward`,
      lastName: `Traveller`,
      email: `wayward_traveller@gmail.com`,
      username: `wayward_traveller`,
      isAdmin: false,
    }),

    User.create({
      password: 'lovelace22',
      firstName: `Ada`,
      lastName: `Love`,
      email: `ada_love@gmail.com`,
      username: `ada_love`,
      isAdmin: false,
    }),
  ])

  //Creating Products
  const products = await Promise.all([
    Product.create({
      title: 'magical water',
      description: lorem.generateSentences(10),
      inventoryQty: 0,
      photoUrl:
        './images/magical-water.jpg',
      price: 4.99,
      category: 'potions',
    }),
    Product.create({
      title: 'magical hat',
      description: lorem.generateSentences(10),
      inventoryQty: 6,
      photoUrl: './images/magical-hat.jpg',
      price: 8.99,
      category: 'fashion',
    }),
    Product.create({
      title: 'magical sword',
      description: lorem.generateSentences(10),
      inventoryQty: 3,
      photoUrl:
      './images/magical-sword.jpg',
      price: 1.99,
      category: 'weapons',
    }),
    Product.create({
      title: 'crystal wand',
      description:
        'A beautiful wand, perfect for casting powerful spells like "Lorem ipsum dolor sit amet."',
      inventoryQty: 9,
      photoUrl: './images/crystal-wand.jpg',
      price: 11.99,
      category: 'weapons',
    }),
    Product.create({
      title: 'pinkifying potion',
      description: 'Drinking this potion will turn you pink for 15 minutes.',
      inventoryQty: 9,
      photoUrl:'./images/pink-potion.jpg',
      price: 11.99,
      category: 'potions',
    }),
    Product.create({
      title: 'purple elixir',
      description: 'It tastes purple.',
      inventoryQty: 9,
      photoUrl:
        './images/purple-potion.jpg',
      price: 11.99,
      category: 'potions',
    }),
    Product.create({
      title: 'storm potion',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:'./images/storm-potion.jpg',
      price: 11.99,
      category: 'potions',
    }),
    Product.create({
      title: 'Extra-pink potion',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
      './images/extra-pink-potion.jpg',
      price: 11.99,
      category: 'potions',
    }),
    Product.create({
      title: 'magic crystal',
      description: lorem.generateSentences(10),
      inventoryQty: 0,
      photoUrl:
      './images/magic-crystal.png',
      price: 11.99,
      category: 'crystals',
    }),
    Product.create({
      title: 'pixellated love potion',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        './images/pixellated-love-potion.png',
      price: 11.99,
      category: 'potions',
    }),
    Product.create({
      title: 'moon wand',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl: './images/moon-wand.jpg',
      price: 11.99,
      category: 'weapons',
    }),
    Product.create({
      title: 'health potion',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        './images/health-potion.jpg',
      price: 11.99,
      category: 'potions',
    }),
    Product.create({
      title: 'rainbow crystal',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        './images/rainbow-crystal.jpg',
      price: 11.99,
      category: 'crystals',
    }),
    Product.create({
      title: 'magic book',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        './images/magic-book.jpg',
      price: 11.99,
      category: 'books',
    }),
    Product.create({
      title: 'spell book',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        './images/spell-book.jpg',
      price: 11.99,
      category: 'books',
    }),
    Product.create({
      title: 'book of magic pigs',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        './images/book-of-magic-pigs.jpg',
      price: 11.99,
      category: 'books',
    }),
    Product.create({
      title: 'book of ice magic',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        './images/book-of-ice-magic.jpg',
      price: 11.99,
      category: 'books',
    }),
    Product.create({
      title: 'phoenix ring',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        './images/phoenix-ring.jpg',
      price: 11.99,
      category: 'fashion',
    }),
    Product.create({
      title: 'amethyst ring',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        './images/amethyst-ring.jpg',
      price: 11.99,
      category: 'fashion',
    }),
    Product.create({
      title: 'bow',
      description: lorem.generateSentences(10),
      inventoryQty: 9,
      photoUrl:
        './images/standard-bow.png',
      price: 101.99,
      category: 'weapons',
    })
  ])

  const orders = await Promise.all([
    Order.create({
      userId: 1,
    }),
  ])

  const lineItems = await Promise.all([
    LineItem.create({
      orderId: 1,
      price: 4.99, //what happens if the price is more than 2 decimal places?
      quantity: 1,
      productId: 1,
    }),
    LineItem.create({
      orderId: 1,
      price: 11.99,
      quantity: 2,
      productId: 4,
    }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
