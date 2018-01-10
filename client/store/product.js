import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
/**
 * INITIAL STATE
 */
const defaultProducts = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GET_PRODUCTS, products })
const removeProduct = () => ({ type: REMOVE_PRODUCT })
const addProduct = product => ({ type: ADD_PRODUCT, product })

/**
 * THUNK CREATORS
 */
export const products = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res =>
        dispatch(getProducts(res.data)))
      .catch(err => console.log(err))

export const addProductThunk = (newProduct) =>
  dispatch =>
    axios.POST('/api/products')
      .then(res =>
        dispatch(addProduct(res.data)))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...products, ...action.products]

    case ADD_PRODUCT:
      return [...products, ...action.product]


      default:
        return state
  }
  }
