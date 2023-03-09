import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Login, Signup} from './components/AuthForm'
import Home from './components/Home'
import AdminTools from './components/AdminTools'
import AllProducts from './components/AllProducts'
import SingleProduct from './components/SingleProduct'
import Cart from './components/Cart'
import OrderHistory from './components/OrderHistory'
import UpdateProduct from './components/UpdateProduct'
import NotFound from './components/NotFound'
import Checkout from './components/Checkout'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
      <div>
        <Switch>
          {isAdmin && <Route path="/admin-tools" component={AdminTools} />}
          {!isLoggedIn && <Route path="/login" component={Login} />}
          {!isLoggedIn && <Route path="/signup" component={Signup} />}
          {isLoggedIn && (<Route path="/order-history" component={OrderHistory} />)}
          <Route path="/home" component={Home} />
          <Route exact path="/products" component={AllProducts} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route exact path="/products/:id/update" component={UpdateProduct} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />

          <Route component={Home} />
          {/* <Route component={NotFound} /> */}
        </Switch>

        {/* TODO: Route to 404 when pages don't exist */}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
