import axios from 'axios'
import history from '../history'

const allOrders = []

const GET_ORDERS = 'GET_ORDERS'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'


export const getOrders = orders => ({ type: GET_ORDERS, orders })
export const updateOrderStatus = order => ({ type: UPDATE_ORDER_STATUS, order})


export const fetchAllOrders = () => dispatch => {
  axios
    .get('/api/orders')
    .then(res => dispatch(getOrders(res.data || allOrders)))
    .catch(err => console.log(err))
}

export const updateOrderStatusThunk = (orderId, status) => dispatch => {
  console.log(orderId, "ORDERID")
  console.log(status, "STATUS!!!!")
  axios
    .put(`/api/orders/update-status/${orderId}`, {status})
    .then(res => dispatch(updateOrderStatus(res.data)))
    .catch(err => console.log(err))
}

export default function(state = allOrders, action) {
  console.log(action, "THIS IS THE ACTION")
  switch (action.type) {
    case GET_ORDERS:
      return [...allOrders, ...action.orders]
    case UPDATE_ORDER_STATUS:
    return state.filter(order => {
      return order.id !== +action.order.id
    }).concat([action.order])
    default:
      return state
  }
}
