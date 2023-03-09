import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUsers, promoteUser} from '../store/users'

class AllUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  // handlePromote(user) {
  //   console.log('button clicked')
  //   this.props.promoteUser({...user, isAdmin: true})
  // }
  // onClick={() => this.handlePromote(user)}

  render() {
    const users = this.props.users
    
    return (
      <div>
        <h2>Users</h2>
        {users.map(user => {
        
        
          console.log("user", user)
          
          
          return (
          <div key={user.id}>
          <p> {user.id}: {user.username} </p>
          <p>Account type: {user.isAdmin === true ? 'Admin' : 'Regular user'} {!user.isAdmin && <button onClick={() => this.props.promoteUser({...user, isAdmin: true})}>Promote to Admin</button>} </p>
          </div>
          )
        })}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.users.users,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getUsers: () => {
      dispatch(getUsers())
    },
    promoteUser: (user) => {
      dispatch(promoteUser(user))
    }
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
