import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'
const RESET_CART = 'RESET_CART'
/**
 * INITIAL STATE
 */
const defaultCart = []


/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })
const resetCart = () => ({ type: RESET_CART })
/**
 * THUNK CREATORS
 */
export const cart = () =>
  dispatch =>
    axios.get('/api/cart')
      .then(res =>
        dispatch(getCart(res.data || defaultCart)))
      .catch(err => console.log(err))

export const updateCart = (updatedItem) =>
dispatch =>
axios.put('/api/cart/update', updatedItem)
  .then(res =>
    axios.get('/api/cart')
    )
    .then(res => dispatch(getCart(res.data)))
  .catch(err => console.log(err))

export const submitCart = (orderInfo) =>
  (dispatch, getState) =>
    axios.post('/api/orders', {...orderInfo, cart: getState().cart} )
      .then(res =>
        axios.delete('/api/cart')
      )
      .then(dispatch(resetCart()))
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case RESET_CART:
      return []
    default:
      return state
  }
}
