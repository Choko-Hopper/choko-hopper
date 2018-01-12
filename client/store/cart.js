import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CART = 'GET_CART'

/**
 * INITIAL STATE
 */
const defaultCart = []


/**
 * ACTION CREATORS
 */
const getCart = cart => ({ type: GET_CART, cart })

/**
 * THUNK CREATORS
 */
export const cart = () =>
  dispatch =>
    axios.get('/api/cart')
      .then(res =>
        dispatch(getCart(res.data || defaultCart)))
      .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart

    default:
      return state
  }
}
