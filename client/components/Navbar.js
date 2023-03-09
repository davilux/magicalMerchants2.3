import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => {
  return (
    <div id="navbar" className="navbar-wrapper-container">
      <nav className="navbar-links-container">
        <Link to="/cart">
          <img src="/white-cart.svg" className="cartIcon" alt="Cart"></img>
        </Link>

        {/* These links will display if there is NOT a user logged in. */}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/signup">Sign Up</Link>}
        {!isLoggedIn && <Link to="/products">Products</Link>}

        {/* These links will display if there IS a user logged in.*/}
        {isLoggedIn && <Link to="/home">Home</Link>}
        {isLoggedIn && <Link to="/products">Products</Link>}
        {/* The Admin Tools link will only display for administrators. */}
        {isLoggedIn && isAdmin && <Link to="/admin-tools">Admin Tools</Link>}
        {isLoggedIn && (
          <a href="#" onClick={handleClick}>
            {' '}
            Logout{' '}
          </a>
        )}
      </nav>
      <div className="navbar-links-container">
        <h1>Magical Merchants</h1>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)
