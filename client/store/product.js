import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
/**
 * INITIAL STATE
 */
const defaultProducts = []

/**
 * ACTION CREATORS
 */
export const getProducts = products => ({ type: GET_PRODUCTS, products })
export const removeProduct = productId => ({ type: REMOVE_PRODUCT, productId })
export const addProduct = product => ({ type: ADD_PRODUCT, product })
export const updateProduct = product => ({ type: UPDATE_PRODUCT, product })

/**
 * THUNK CREATORS
 */
export const products = () => dispatch =>
  axios
    .get('/api/products')
    .then(res => {
      dispatch(getProducts(res.data))
    })
    .catch(err => console.log(err))

export const addOrEditProductThunk = (product, productId) => dispatch => {
  if (!productId) {
    axios
      .post('/api/products', product)
      .then(res => dispatch(addProduct(res.data)))
      .catch(err => console.log(err))
  } else {
    axios
      .put(`/api/products/${productId}`, product)
      .then(res => dispatch(updateProduct(res.data)))
      .catch(err => console.log(err))
  }
}

export const deleteProductThunk = (productId, history) => dispatch =>
  axios
    .delete(`/api/products/${productId}`)
    .then(res => {
      dispatch(removeProduct(productId))
      history.push('/products')
    })
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function(state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...products, ...action.products]

    case ADD_PRODUCT:
      return [...products, ...action.product]

    case REMOVE_PRODUCT:
      return state.filter(product => {
        return product.id !== +action.productId
      })

    case UPDATE_PRODUCT:
      return state.filter(product => {
        return product.id !== +action.productId
      }).concat([action.product])

    default:
      return state
  }
}
