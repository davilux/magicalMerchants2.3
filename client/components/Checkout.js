import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCart} from '../store/cart'
import {changeCartStatus} from '../store/orders'

class Checkout extends React.Component {
  componentDidMount() {
    this.props.fetchCart()
  }

  render() {
    const lineItems = this.props.cart.lineItems || []

    return (
      <div>
        <ul>
          {lineItems.map((lineItem) => {
            return (
              <li key={lineItem.id}>
                {lineItem.product.title}
                <img src={lineItem.product.photoUrl} />${lineItem.price}
                Quantity: {lineItem.quantity}
              </li>
            )
          })}
        </ul>
        <div>
          Total Cost: $
          {lineItems.reduce(
            (accum, lineItem) => accum + lineItem.price * lineItem.quantity,
            0
          )}
        </div>
        <div>Shipping Information:</div>
        <div>Credit Card Information:</div>
        <div>
          <button
            type="button"
            onClick={() => this.props.changeCartStatus({...this.props.cart, status: 'ORDER'})}
            >
            Confirmation
          </button>
        </div>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    allOrders: state.allOrders
  }
}

const mapDispatch = (dispatch) => {
  return {
    fetchCart: () => {
      dispatch(fetchCart())
    },
    changeCartStatus: (order) => {
      dispatch(changeCartStatus(order))
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
