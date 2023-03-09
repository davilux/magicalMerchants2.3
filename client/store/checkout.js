import axios from 'axios'

const TOKEN = 'token'

const initalState = {}

// action type:
const CREATE_CHECKOUT_SESSION = 'CREATE_CHECKOUT_SESSION'

// action creators:
const createdCheckoutSession = (session) => ({
  type: CREATE_CHECKOUT_SESSION,
  session,
})

// thunk creators:
export const createCheckoutSession = (order) => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data} = await axios.post('/api/create-checkout-session', order, {
        headers: {
          authorization: token,
        },
      })
      dispatch(createdCheckoutSession(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer:
export default function checkoutReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_CHECKOUT_SESSION:
      return action.session
    default:
      return state
  }
}
