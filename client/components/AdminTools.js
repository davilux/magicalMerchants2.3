import React from 'react'
import {connect} from 'react-redux'
import AllUsers from './AllUsers'

export const AdminTools = (props) => {

  return (
    <div>
      <h2>Admin Tools</h2>
      <AllUsers />
    </div>
  )
}

export default AdminTools
