import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart, addToCart, removeFromCart} from '../store/cart'
import {createCheckoutSession} from '../store/checkout'
import CheckoutButton from './CheckoutButton'

// export const Cart = ( { cart }) => {

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const lineItems = this.props.cart.lineItems || []

    return (
      <div className="cart-wrapper-container">
        {lineItems.map((lineItem) => {
          return (
            <div className="cart-single-item-container" key={lineItem.id}>
              <img src={lineItem.product.photoUrl} />
              <h3 className="cart-product-title">{lineItem.product.title}</h3>
              <p>${lineItem.product.price}</p>
              <p>Quantity: {lineItem.quantity}</p>
              <button
                type="button"
                onClick={() => this.props.addToCart(lineItem.product)}
              >
                Add 1
              </button>
              <button
                type="button"
                onClick={() => this.props.removeFromCart(lineItem.product)}
              >
                Remove 1
              </button>
            </div>
          )
        })}
        <Link to={'/checkout'}>
          <button type="button">Checkout</button>
        </Link>
        {/* //checkout button, list of orders, total price */}
        {/* <CheckoutButton/> */}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => {
      dispatch(fetchCart())
    },
    addToCart: (product) => {
      dispatch(addToCart(product))
    },
    removeFromCart: (product) => {
      dispatch(removeFromCart(product))
    },
  }
}

export default connect(mapState, mapDispatch)(Cart)
