import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const RESET_CART = 'RESET_CART'
const GET_CART_ORDER = 'GET_CART_ORDER'
const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
const GOT_ORDER_TOTALS = 'GOT_ORDER_TOTALS'
/**
 * INITIAL STATE
 */
const defaultCart = {
  cart: [],
  shippingAddress: '',
  userEmail: '',
  lastOrder: null,
  orderSubTotal: 0,
  discount: 0,
  orderTotal: 0
}

/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })
const resetCart = () => ({ type: RESET_CART })
const getCartOrder = lastOrder => ({ type: GET_CART_ORDER, lastOrder })
export const updateUserInfo = userInfo => ({ type: UPDATE_USER_INFO, userInfo })
export const gotOrderTotals = orderTotals => ({
  type: GOT_ORDER_TOTALS,
  orderTotals
})

/**
 * THUNK CREATORS
 */
export const fetchCart = () => dispatch =>
  axios
    .get('/api/cart')
    .then(res => dispatch(getCart(res.data || defaultCart)))
    .catch(err => console.log(err))

export const fetchTotals = () => dispatch =>
  axios
    .get('api/cart/totals')
    .then(res => dispatch(gotOrderTotals(res.data)))
    .catch(err => console.error(err))

export const updateCart = updatedItem => dispatch =>
  axios
    .put('/api/cart/update', updatedItem)
    .then(() => dispatch(fetchCart()))
    .then(() => dispatch(fetchTotals()))
    .catch(err => console.log(err))

export const deleteLineItem = productId => dispatch =>
  axios
    .put('/api/cart/delete', { productId })
    .then(() => axios.get('/api/cart'))
    .then(res => dispatch(getCart(res.data)))
    .catch(err => console.log(err))

export const submitCart = orderInfo => (dispatch, getState) =>
  axios
    .post('/api/orders', orderInfo)
    .then(res => {
      dispatch(getCartOrder(res.data))
      return res.data
    })
    .then(order => history.push(`/checkout-confirm/${order.id}`))
    .then(axios.delete('/api/cart'))
    .then(dispatch(resetCart()))
    .catch(err => console.log(err))

export const validatePromoCode = promoCode => dispatch =>
  axios
    .get(`/api/promo/${promoCode}`)
    .then(() => dispatch(fetchTotals()))
    .catch(err => {
      dispatch(fetchTotals())
      console.error(err)
    })

/**
 * REDUCER
 */
export default function(state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return Object.assign({}, state, { cart: action.cart })
    case RESET_CART:
      return Object.assign({}, defaultCart)
    case GET_CART_ORDER:
      return Object.assign({}, defaultCart, { lastOrder: action.lastOrder })
    case UPDATE_USER_INFO:
      return Object.assign({}, state, action.userInfo)
    case GOT_ORDER_TOTALS:
      return Object.assign({}, state, action.orderTotals)
    default:
      return state
  }
}
