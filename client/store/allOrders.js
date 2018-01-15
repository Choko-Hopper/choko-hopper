import axios from 'axios'
import history from '../history'

const allOrders = []

const GET_ORDERS = 'GET_ORDERS'


export const getOrders = orders => ({ type: GET_ORDERS, orders })


export const fetchAllOrders = () => dispatch => {
  axios
    .get('/api/orders')
    .then(res => dispatch(getOrders(res.data || allOrders)))
    .catch(err => console.log(err))
}

export default function(state = allOrders, action) {
  switch (action.type) {
    case GET_ORDERS:
      return [...allOrders, ...action.orders]
    default:
      return state
  }
}
