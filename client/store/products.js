import axios from 'axios'

const TOKEN = 'token'

// initalState:
const initalState = {allProducts: [], singleProduct: {}}
// action type:
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'
const ADDED_PRODUCT = 'ADDED_PRODUCT'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'

// action creators:
const gotAllProducts = (products) => ({type: GOT_PRODUCTS, products})
const gotSingleProduct = (product) => ({type: GOT_SINGLE_PRODUCT, product})
const addedProduct = (newProduct) => ({type: ADDED_PRODUCT, newProduct})
const updatedProduct = (productToUpdate) => ({
  type: UPDATED_PRODUCT,
  productToUpdate,
})

// thunk creators:
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get('/api/products/')
      dispatch(gotAllProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(gotSingleProduct(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addProduct = (newProduct) => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data: productAdded} = await axios.post(
        '/api/products',
        newProduct,
        {
          headers: {
            authorization: token,
          },
        }
      )
      dispatch(addedProduct(productAdded))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updateProduct = (productToUpdate, id) => {
  const token = window.localStorage.getItem(TOKEN)
  return async (dispatch) => {
    try {
      const {data: productUpdated} = await axios.put(
        `/api/products/${id}`,
        productToUpdate,
        {
          headers: {
            authorization: token,
          },
        }
      )
      dispatch(updatedProduct(productUpdated))
    } catch (e) {
      console.error(e)
    }
  }
}

// reducer:
export default function productsReducer(state = initalState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return {...state, allProducts: action.products}
    case GOT_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    case ADDED_PRODUCT:
      return {...state, newProduct: action.newProduct}
    case UPDATED_PRODUCT:
      return {...state, updatedProduct: action.updatedProduct}
    default:
      return state
  }
}
