import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const RESET_CART = 'RESET_CART'
const GET_CART_ORDER = 'GET_CART_ORDER'
/**
 * INITIAL STATE
 */
const defaultCart = {
  cart: [],
  shippingAddress: '',
  userEmail: '',
  lastOrder: null
}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })
const resetCart = () => ({ type: RESET_CART })
const getCartOrder = lastOrder => ({ type: GET_CART_ORDER, lastOrder })

/**
 * THUNK CREATORS
 */
export const fetchCart = () => dispatch =>
  axios
    .get('/api/cart')
    .then(res => dispatch(getCart(res.data || defaultCart)))
    .catch(err => console.log(err))

export const updateCart = updatedItem => dispatch =>
  axios
    .put('/api/cart/update', updatedItem)
    .then(res => axios.get('/api/cart'))
    .then(res => dispatch(getCart(res.data)))
    .catch(err => console.log(err))

export const deleteLineItem = productId => dispatch =>
  axios
    .put('/api/cart/delete', { productId })
    .then(() => axios.get('/api/cart'))
    .then(res => dispatch(getCart(res.data)))
    .catch(err => console.log(err))

export const submitCart = orderInfo => (dispatch, getState) =>
  axios
    .post('/api/orders', { ...orderInfo, cart: getState().cart.cart })
    .then(res => {
      dispatch(getCartOrder(res.data))
      return res.data
    })
    .then(order => history.push(`/checkout-confirm/${order.id}`))
    .then(axios.delete('/api/cart'))
    .then(dispatch(resetCart()))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return { cart: action.cart, orderId: null }
    case RESET_CART:
      return Object.assign({}, defaultCart, { cart: [] })
    case GET_CART_ORDER:
      return Object.assign({}, defaultCart, { lastOrder: action.lastOrder })

    default:
      return state
  }
}
