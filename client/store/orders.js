//cart
//order history
//rmb to add this to our reducer

import axios from 'axios'
const TOKEN = 'token'

// initalState:
const initalState = {allOrders: [], singleOrder: {}}
// action type:
const GOT_ORDERS = 'GOT_ORDERS'
const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
const CHANGE_CART_STATUS = 'CHANGE_CART_STATUS'

// action creators:
const gotAllOrders = (orders) => ({type: GOT_ORDERS, orders})
const gotSingleOrder = (order) => ({type: GOT_SINGLE_ORDER, order})
const changedCartStatus = (orders) => ({type: CHANGE_CART_STATUS, orders})

// thunk creators:
export const getOrders = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/orders/')
      dispatch(gotAllOrders(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getSingleOrder = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/orders/${id}`)
      dispatch(gotSingleOrder(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const changeCartStatus = (order) => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/order/${order.id}`, order, {
        headers: {
          authorization: token,
        }})
      dispatch(changedCartStatus(data))
    } catch (error) {
      console.error(error)
    }
  }
}

// reducer:
export default function ordersReducer(state = initalState, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return {...state, allOrders: action.orders}
    case GOT_SINGLE_ORDER:
      return {...state, singleOrder: action.order}
    case CHANGE_CART_STATUS:
      return {...state, allOrders: state.allOrders.map(order => order.id === action.order.id ? action.order : order)}
    default:
      return state
  }
}
