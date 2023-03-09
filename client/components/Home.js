import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AllProducts from './AllProducts'

/**
 * COMPONENT
 */
export const Home = (props) => {
  const firstName = props.firstName ? props.firstName : 'guest'
  const lastName = props.lastName ? props.lastName : ''

  return (
    <div>
      <h3 className="pageheader">Greetings, {`${firstName} ${lastName}`}</h3>
      {(!props.firstName && !props.lastName) && <Link to='/login'>Sign in to access your account. </Link>}
      <AllProducts/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
    lastName: state.auth.lastName,
  }
}

export default connect(mapState)(Home)
