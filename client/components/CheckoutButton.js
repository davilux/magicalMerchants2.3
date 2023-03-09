import React from 'react'
import {connect} from 'react-redux'
import {createCheckoutSession} from '../store/checkout'
// import {Routes, Route, useNavigate} from 'react-router-dom'

export class CheckoutButton extends React.Component {
  render() {
    // const navigateToCheckout = useNavigate('/checkout')
    return (
      <div>
        {/* <button
          type="button"
          onClick={() => this.props.createCheckoutSession()}
        >
          Checkout
        </button> */}
        <form action="/create-checkout-session" method="POST">
          {/* <button onClick={navigateToCheckout}>Checkout</button> */}
          {/* evt.preventDefault() */}
          <button type='submit'>checkout</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    checkout: state.checkout,
  }
}

const mapDispatch = (dispatch) => {
  return {
    createCheckoutSession: () => {
      dispatch(createCheckoutSession())
    },
  }
}

export default connect(mapState, mapDispatch)(CheckoutButton)
