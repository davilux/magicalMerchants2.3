module.exports = (User, db) => {
  User.prototype.getCart = async function () {
    const where = {   //TODO: maybe change this const name to cartProperties ?
      userId: this.id,
      status: 'CART' 
    };
    const Order = db.models.order;      //should order line item and product be capitalized?
    const LineItem = db.models.lineItem;
    const Product = db.models.product;
    let cart = await Order.findOne({
      where 
    });
    if(!cart) {
      cart = await Order.create(where); 
    }
    //find an order by its id, include all lineItems that contain matching orderId then include all product info for the productId
    return Order.findByPk(cart.id,  
      { include: [
        { model: LineItem, include: [Product] }
      ]}
    );
  };
  
    // return Order.findByPk(cart.id,
    // { include: [
    //     { include: [
    //       { model: LineItem, include: [Product] }
    //     ]}]}
    // );
  
  User.prototype.removeFromCart = async function(product) {
    const cart = await this.getCart();
    const lineItem = cart.lineItems.find(lineItem => lineItem.productId === product.id);
    lineItem.quantity--;
    if (lineItem.quantity) {
      await lineItem.save();
    }
    else {
      await lineItem.destroy();
    }
    return this.getCart();
  }
  
  User.prototype.addToCart = async function(product) {
    const cart = await this.getCart();
    let lineItem = cart.lineItems.find(lineItem => lineItem.productId === product.id);
    if (lineItem) {
      lineItem.quantity++;
      await lineItem.save();
    }
    else {
      await db.models.lineItem.create({
        productId: product.id, orderId: cart.id, quantity: 1, price: product.price
      });
    }
    return this.getCart();
  } 
    
    
}