import axios from 'axios'
const TOKEN = 'token'

// initalState:
const initalState = {users: []}
// action type:
const GOT_USERS = 'GOT_USERS'
const PROMOTED_USER = 'PROMOTED_USER'

// action creators:
const gotAllUsers = (users) => ({type: GOT_USERS, users})
const promotedUser = (user) => ({type: PROMOTED_USER, user})

// thunk creators:
export const getUsers = () => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/users/', {
        headers: {
          authorization: token,
        },
      })
      dispatch(gotAllUsers(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const promoteUser = (user) => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      await axios.put(`/api/users/${user.id}`, user, {
        headers: {
          authorization: token,
        }});
      dispatch(promotedUser(user));
    }
    catch (error) {
      console.log(error);
    }
  };
};

// reducer:
export default function usersReducer(state = initalState, action) {
  switch (action.type) {
    case GOT_USERS:
      return {...state, users: action.users}
    case PROMOTED_USER:
      return {...state, users: state.users.map(user => user.id === action.user.id ? action.user : user)}
    default:
      return state
  }
}